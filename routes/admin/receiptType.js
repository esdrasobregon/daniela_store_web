const express = require("express");
const receiptType = require('../../js/models/receiptType.js');
const cokieParser = require("cookie-parser");
const {
    Result
} = require("express-validator");
const router = express.Router();
router.use(cokieParser());
router.use(express.json());
router.use(express.urlencoded({
    extended: false
}));

//#region get
router.get('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("get receipt type method function called");
    getDecition(request, response);
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
        case "allReceiptType":
            getAll(response);
            break;
        default:
            result.success = false;
            response.json(result);
            break;
    }
}

/**
 * this function returns the category list from
 * firebase and then returns it to the client
 * @param {*} response a server response object
 */
async function getAll(response) {
    console.log("all receipt types loading...");
    await receiptType.getAll()
        .then(receiptType => {
            response.json(receiptType)
        });
}
//#endregion get

//#region post

router.post('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("post category method function called");
    postDecition(request, response);
});

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
function postDecition(request, response) {
    console.log("deciding which function call");
    var result = {
        success: false
    }
    //this delete method will be change
    if (request.body.case == "delete") {
        delete(request, response);
    } else {
        try {
            console.log(request.body);
        } catch (error) {
            console.log("error adding or updating receipt Type: " + error);
            result.success = false;
            response.json(result);
        }
    }

}
/**
 * this function controls the receipt type add request
 * @param {*} request a server response object
 * @param {*} response a server response object
 */
async function add(request, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method add receipt type called");
    var result = {
        success: false,
        category: null,
        error: null
    }
    try {
        //your code

    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}

/**
 * this function controls the product update request
 * @param {*} request a server response object
 * @param {*} response a server response object
 */
async function update(request, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method receipt type called");
    var result = {
        success: false,
        category: null,
        error: null
    }
    try {
        //your code
    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}
/**
 * this function controls the product delete request
 * @param {*} request a server request object
 * @param {*} response a server response object
 */
async function deleteR(request, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method delete receipt type called");
    var cat = request.body.categoryToDelete;
    var result = {
        success: false,
        error: null,
        categoryToDelete: cat
    };
    try {
        await receiptType
            .delete(cat.idCategory);
        result.success = true;
        response.json(result);
    } catch (error) {
        console.log("error: " + error);
        result.error = error;
        result.success = false;
        response.json(result);
    }
};
//#endregion post
module.exports = router;