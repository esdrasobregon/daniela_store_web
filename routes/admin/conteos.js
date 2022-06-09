//#region variables
const express = require("express");
const receipt = require('../../js/models/conteos');
const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const serverFiles = require("../../serverFunctions/serverFiles.js");
const firestoreFiles = require("../../firebaseFunctions/firestoreFiles.js");
const commonFunction = require('../../serverFunctions/commonFunctions.js');
var keys = require('../../shared/serverKeys.js');
var formidable = require('formidable');
const router = express.Router();
router.use(express.json());

router.use(express.urlencoded({
    extended: false
}));
//#endregion variables

//#region get
router.get('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("get conteos method called");
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
        case "allConteos":
            getAllConteos(response);
            break;
        case "admConteosPage":
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
async function getAllConteos(response) {
    console.log("all conteos loading...");
    await receipt.getAllConteos().then(prods => {
        response.json(prods);
    });
}
//#endregion get

//#region post
router.post('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("post receipt method called");
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
                    addReceiptList(response, fields, files);
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
async function addReceiptList(response, fields, files) {
    console.log("method add receipt called");
    var result = {
        success: true,
        receipt: null
    }
    try {

        console.log(fields);
        //validate the text info
        result.success = true;
        if (result.success) {
            if (files.inputFile != undefined) {
                if (serverFiles.checkImageFileType(files.inputFile)) {
                    var fileType = files.inputFile.type;
                    await receipt.addReceipt(fields);
                    console.log("adding file to firebase");
                    await firestoreFiles
                        .uploadFile(files.inputFile.path,
                            firebaseAdmin,
                            fields.idReceipt,
                            fileType);
                    console.log("preparing product result");
                    //result.receipt = products.product(fields);
                    result.receipt = fields;

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
        response.json({
            conection: "not internet conection",
            error: error,
            success: false
        });
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
        result.success = !receipt.receipt.validateProduc(fields, commonFunction);
        if (result.success) {
            await receipt.updateProduct(firebaseAdmin.db, fields);
            result.product = receipt.product(fields);
            if (files.inputfile != undefined) {
                if (serverFiles.checkImageFileType(files.inputfile)) {
                    var fileType = files.inputfile.type;
                    console.log("adding file to firebase");
                    firestoreFiles.uploadFile(files.inputfile.path, firebaseAdmin, fields.idProduct, fileType);

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
            .deleteFile(request.body.idProduct, firebaseAdmin);
        await receipt
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