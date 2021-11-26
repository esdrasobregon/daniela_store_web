//#region variables
const express = require("express");
const products = require('../../js/models/products');
const firestoreFiles = require("../../firebaseFunctions/firestoreFiles.js");
const serverFiles = require("../../serverFunctions/serverFiles.js");
const cokieParser = require("cookie-parser");
const cookiesFunction = require('../../serverFunctions/serverCookies');
var keys = require('../../shared/serverKeys.js');
var formidable = require('formidable');
const router = express.Router();
router.use(cokieParser());
router.use(express.json());

router.use(express.urlencoded({
    extended: false
}));
//#endregion variables

//#region get
router.get('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("get product method called");
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
        case "allProducts":
            getAllProducts(response);
            break;
        case "admProductPage":
            console.log("req cookies: " + request.cookies.currentUser);
            if (cookiesFunction.userCookieExist(request.cookies)) {
                cookiesFunction.getUserCookie(request.cookies, keys);
                console.log(__dirname);
                response.set('Cache-control', `no-cache, no-store, must-revalidate`, );
                response.render("./admin/pages/products/product", {
                    keys: keys
                });
            } else {
                //this doesn't work

                response.redirect("/");
            }

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
async function getAllProducts(response) {
    console.log("all products loading...");
    var prods =
        await products.allProducts();
    response.json(prods);
}
//#endregion get

//#region post
router.post('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("post product method called");
    postDecition(request, response);
});

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
async function postDecition(request, response) {
    console.log("deciding which function call");
    var result = {
        success: false,
        products: [],
        error: null
    }
    try {
        var formData = new formidable.IncomingForm();
        formData.parse(request, async function (error, fields, files) {
            const req = fields.case;

            switch (req) {
                case "add":
                    addProduct(response, fields, files);
                    break;
                default:
                    response.json(result);
                    break;
            }
        });
    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}
/**
 * this fuction add a product object to firebase
 * @param {*} response response server object
 * @param {*} fields incoming form fields
 * @param {*} files incoming form files
 */
async function addProduct(response, fields, files) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method add product called");
    var result = {
        success: true,
        product: null
    }
    try {
        console.log("image to firebse: " + fields.imageToFirebase);

        //it needs to be reviewd
        //result.success = !products.validateProduc(fields);

        if (result.success) {
            if (files.inputfile != undefined) {
                if (serverFiles.checkImageFileType(files.inputfile)) {
                    var fileType = files.inputfile.type;
                    await products.addProduct(fields);
                    console.log("adding file to firebase");
                    await firestoreFiles
                        .uploadFile(files.inputfile.path, fields.idProduct, fileType);
                    console.log("preparing product result");
                    result.product = products.getCostummProduct(fields);

                } else {
                    console.log("no available file, process aborted!");
                }
            } else {
                result.success = false;
            }
        }
        response.json(result);
    } catch (error) {
        console.log("error adding product: " + error);
        result.success = false;
        result.error = error;
        response.json(result);
    }
}

//#endregion post

//#region put
router.put('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("put product method called");
    putDecition(request, response);
});
/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
function putDecition(request, response) {
    console.log("deciding which function call");
    try {
        var formData = new formidable.IncomingForm();
        formData.parse(request, async function (error, fields, files) {
            const req = fields.case;
            var result = {
                success: false,
                products: [],
                error: null
            }
            switch (req) {
                case "update":
                    updateProduct(response, fields, files);
                    break;
                default:
                    response.json(result);
                    break;
            }
        });
    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}
/**
 * this fuction update a product object to firebase
 * @param {*} response response server object
 * @param {*} fields incoming form fields
 * @param {*} files incoming form files
 */

async function updateProduct(response, fields, files) {
    console.log("method update product called");
    var result = {
        success: true,
        product: null
    }
    try {
        console.log("is updating: " + fields.isUpdating);
        console.log("image to firebse: " + fields.imageToFirebase);
        result.success = !products
            .validateProduc(fields);
        if (result.success) {
            await products.updateProduct(fields);
            result.product = products.getCostummProduct(fields);
            if (files.inputfile != undefined) {
                if (serverFiles.checkImageFileType(files.inputfile)) {
                    var fileType = files.inputfile.type;
                    console.log("adding file to firebase");
                    firestoreFiles.uploadFile(files.inputfile.path, fields.idProduct, fileType);

                } else {
                    console.log("no available file, process aborted!");
                }
            }
        } else {
            result.success = false;
        }

        response.json(result);
    } catch (error) {
        console.log("error adding product: " + error);
        result.success = false;
        result.error = error;
        response.json(result);
    }
}

//#endregion put

//#region delete

router.delete('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method delete product called");
    try {
        await firestoreFiles
            .deleteFile(request.body.idProduct);
        await products
            .deleteProduct(request.body.idProduct);
        var result = {
            success: true,
            productToDelete: request.body
        };
        response.json(result);
    } catch (error) {
        console.log("error: " + error);
        var result = {
            success: false,
            error: error,
            productToDelete: request.body
        };
        response.json(flag);
    }
});

//#endregion delete

module.exports = router;