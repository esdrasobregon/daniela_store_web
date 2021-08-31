const express = require("express");
const user = require('../../js/user.js');
const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const commonFunction = require('../../serverFunctions/commonFunctions.js');
var keys = require('../../shared/serverKeys.js');
const router = express.Router();
router.use(express.json());

router.use(express.urlencoded({
    extended: false
}));

router.get('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("get product method called");
    getDecition(request, response);
});
router.post('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("post user method called");
    postDecition(request, response);
});

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
function getDecition(request, response) {
    console.log("deciding which function call");
    const req = request.url.substring(2, request.url.length);
    var result = {
        success: true,
        products: []
    }
    switch (req) {
        case "allProducts":
            getCurrentUser(response);
            break;
        case "admProductPage":
            response.render("./admin/pages/products/product", {
                keys: keys
            });
            break;
        default:
            result.success = false;
            response.json(result);
            break;
    }
}
/**
 * this function decide which post request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
function postDecition(request, response) {
    console.log("deciding which function call");
    const req = request.body.case;
    console.log(req);
    var result = {
        success: false
    }
    switch (req) {
        case "getUser":
            getCurrentUser(request, response);
            break;
        case "admProductPage":
            response.render("./admin/pages/products/product", {
                keys: keys
            });
            break;
        default:
            result.success = false;
            response.json(result);
            break;
    }
}
/**
 * this function returns the product list from
 * firebase and then returns it to the client
 * @param {*} response a server response object
 */
async function getCurrentUser(request, response) {
    var userCredentials = {
        userEmail: request.body.hasOwnProperty('userEmail') ?
            request.body.userEmail : null,
        userPassword: request.body.hasOwnProperty('userPassword') ?
            request.body.userPassword : null
    };
    var result = {
        success: true,
        error: null,
        user: null
    };
    if (userCredentials.userEmail != null || userCredentials.userPassword != null) {
        if (commonFunction.isNotValid(userCredentials.userEmail) ||
            commonFunction.isNotValid(userCredentials.userPassword) ||
            !commonFunction.isEmail(userCredentials.userEmail)) {
            console.log("Warning");
            userCredentials.error = "the call failed";
            response.json(userCredentials);
        } else {
            user.getUser(firebaseAdmin.db, userCredentials).then(us => {
                result.user = us;
                us == null ?
                    result.success = false :
                    console.log(us);
                response.json(result);
            });
        }
    } else {
        console.log('warning');
    }

}

module.exports = router;