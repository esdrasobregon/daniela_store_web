const express = require("express");
const serverFiles = require("../../serverFunctions/serverFiles.js");
const cokieParser = require("cookie-parser");
const cookiesFunction = require('../../serverFunctions/serverCookies');
const formidable = require('formidable');
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
    console.log("get file method called");
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
    const req = request.url.substring(2, 10);
    console.log("request: " + req);
    var result = {
        success: true,
        profile: [],
        error: null
    }
    try {
        switch (req) {

            case "fileList":
                getFolderFileList(request, response);
                break;
            default:
                response.render("./admin/pages/settings/settings", {
                    keys: keys
                });
                break;
        }
    } catch (error) {
        console.log("Error: " + error);
        result.success = false;
        result.error = error;
        response.json(result);
    }
}

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
async function getFolderFileList(request, response) {
    const folder = request.url.substring(12, request.url.length);
    console.log("folder:" + folder);
    console.log("folder list called");
    var result = {
        success: false,
        list: [],
        error: null
    }
    try {
        result.list = await serverFiles.getFileList(folder);
        result.success = true;
        response.json(result);
    } catch (error) {
        console.log("Error getting list: " + error);
        response.json(result);
    }

}

//#endregion get

//#region post
router.post('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("post profile method called");
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
        fields: null,
        error: null
    }
    try {
        var formData = new formidable.IncomingForm();
        formData.parse(request, async function (error, fields, files) {
            const req = fields.case;
            console.log("request " + req);
            switch (req) {
                case "addSharedImage":
                    addImageToServer(response, fields, files);
                    break;
                case "addDownloadFile":
                    addImageToServer(response, fields, files);
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
 * this fuction add a product object to the server
 * @param {*} response response server object
 * @param {*} fields incoming form fields
 * @param {*} files incoming form files
 */
async function addImageToServer(response, fields, files) {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method add image called");
    var result = {
        success: true,
        fields: null,
        error: null
    }
    try {
        if (result.success) {
            if (files.inputfile != undefined) {
                if (serverFiles.checkImageFileType(files.inputfile)) {
                    console.log("file to the server: " + files.inputfile);
                    if (fields.case == "addSharedImage") {
                        await serverFiles.addSharedFile(fields, files);
                    } else {
                        await serverFiles.addDownloadFile(fields, files);
                    }

                    result.fields = fields;
                } else {
                    console.log("no available file, process aborted!");
                }
            } else {
                result.success = false;
            }
        }
        response.json(result);
    } catch (error) {
        console.log("error adding image: " + error);
        result.success = false;
        result.error = error;
        response.json(result);
    }
}
//#endregion post

//#region delete

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
router.delete('/', async (request, response) => {
    response.set('Cache-control', 'public, max-age =300, s-maxage=600');
    console.log("method delete file called");
    deleteDecition(request, response);
});

/**
 * this function decide which get request
 * is call
 * @param {*} request request call object
 * @param {*} response response object from the server
 */
async function deleteDecition(request, response) {
    console.log("deciding which function call");
    var result = {
        success: false,
        fileObject: request.body,
        error: null
    };
    try {
        console.log(request.body);
        const folderCase = request.body.case;
        switch (folderCase) {
            case "shared":
                result.success = await serverFiles
                    .deleteShareFile(folderCase + "/images/" + result.fileObject.fileName);
                break;
            case "downloads":
                result.success = await serverFiles
                    .deleteShareFile(folderCase + "/" + result.fileObject.fileName);
                break;
            default:
                response.json(result);
                break;
        }

        response.json(result);
    } catch (error) {
        console.log("error adding or updating product: " + error);
        result.error = error;
        response.json(result);
    }
}
//#endregion delete

module.exports = router;