const express = require("express");
const categories = require('../../js/categories.js');
const firebaseAdmin = require("../../firebaseFunctions/firebaseSettings");
const serverFiles = require("../../serverFunctions/serverFiles.js");
const firestoreFiles = require("../../firebaseFunctions/firestoreFiles.js");
const cokieParser = require("cookie-parser");
const cookiesFunction = require('../../serverFunctions/serverCookies');
var keys = require('../../shared/serverKeys.js');
var formidable = require('formidable');
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
    console.log("get category method function called");
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
        case "allCategories":
            getAllCategories(response);
            break;
        case "admCategoryPage":

            if (cookiesFunction.userCookieExist(request)) {
                cookiesFunction.getUserCookie(request, keys);
                console.log(__dirname);
                response.set('Cache-control', `no-cache, no-store, must-revalidate`, );
                response.render("./admin/pages/categories/categories", {
                    keys: keys
                });
            } else {
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
 * this function returns the category list from
 * firebase and then returns it to the client
 * @param {*} response a server response object
 */
async function getAllCategories(response) {
    console.log("all categories loading...");
    await categories.allCategories(firebaseAdmin.db).then(categories => {
        response.json(categories)
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
        deleteCategory(request, response);
    } else {
        try {
            var formData = new formidable.IncomingForm();
            formData.parse(request, async function (error, fields, files) {
                const req = fields.case;
                console.log(req);
                switch (req) {
                    case "add":
                        addCategories(fields, files, response);
                        break;
                    case "update":
                        updateCategories(fields, files, response);
                        break;
                    default:
                        response.json(result);
                        break;
                }
            });
        } catch (error) {
            console.log("error adding or updating product: " + error);
            result.success = false;
            response.json(result);
        }
    }

}

/**
 * this function returns the category list from
 * firebase and then returns it to the client
 * @param {*} response a server response object
 */
async function addCategories(fields, files, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method add category called");
    var result = {
        success: false,
        category: null,
        error: null
    }
    try {
        console.log("is updating: " + fields.isUpdating);
        console.log("image to firebse: " + fields.imageToFirebase);
        console.log("activ " + fields.status);
        if (files.inputFile != undefined) {
            if (serverFiles.checkImageFileType(files.inputFile)) {
                var fileType = files.inputFile.type;
                await categories.addCategory(firebaseAdmin.db, fields);
                console.log("adding file to firebase");
                fields.idCategory == "" ?
                    console.log("idCategory undefined or null") :
                    await firestoreFiles
                    .uploadFile(files.inputFile.path, firebaseAdmin, fields.idCategory, fileType);
                result.success = true;
            } else {
                console.log("no available file, process aborted!");
            }
        } else {
            console.log("not file and not id...");
        }
        result.category = fields;
        response.json(result);
    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}
async function updateCategories(fields, files, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method update category called");
    var result = {
        success: false,
        category: null,
        error: null
    }
    try {
        console.log("is updating: " + fields.isUpdating);
        console.log("image to firebse: " + fields.imageToFirebase);
        console.log("activ " + fields.status);
        if (files.inputFile != undefined) {
            if (serverFiles.checkImageFileType(files.inputFile)) {

                var fileType = files.inputFile.type;
                await categories.updateCategory(firebaseAdmin.db, fields);
                console.log("adding file to firebase");
                fields.idCategory == "" ?
                    console.log("idCategory undefined or null") :
                    await firestoreFiles
                    .uploadFile(files.inputFile.path, firebaseAdmin, fields.idCategory, fileType);
                result.success = true;
            } else {
                console.log("no available file, process aborted!");
            }
        } else {
            await categories.updateCategory(firebaseAdmin.db, fields);
            result.success = true;
        }
        result.category = fields;
        response.json(result);
    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}
/**
 * 
 */
async function deleteCategory(request, response) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method delete category called");
    var cat = request.body.categoryToDelete;
    var result = {
        success: false,
        error: null,
        categoryToDelete: cat
    };
    try {
        await firestoreFiles
            .deleteFile(cat.idCategory, firebaseAdmin);
        await categories
            .deleteCategory(firebaseAdmin.db, cat.idCategory);
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