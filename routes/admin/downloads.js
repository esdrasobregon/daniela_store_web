//#region variables
const express = require("express");
const profile = require('../../js/models/profile.js');
const firestoreFiles = require("../../firebaseFunctions/firestoreFiles.js");
const serverFiles = require("../../serverFunctions/serverFiles.js");
const cokieParser = require("cookie-parser");
const cookiesFunction = require('../../serverFunctions/serverCookies');
var keys = require('../../shared/serverKeys.js');
var formidable = require('formidable');
const {
    json
} = require("body-parser");
const router = express.Router();
router.use(cokieParser());
router.use(express.json());

router.use(express.urlencoded({
    extended: false
}));
//#endregion variables

//#region get

var path = require('path');
var mime = require('mime');
var fs = require('fs');
const {
    Console
} = require("console");

router.get('/', function (req, res) {
    console.log("method get downloads call");

    let img = "./public/downloads/image-example.bmp";

    fs.access(img, fs.constants.F_OK, err => {
        //check that we can access  the file
        console.log(`${img} ${err ? "does not exist" : "exists"}`);
    });

    var options = {
        root: path.join(__dirname)
    };
    var fileName = "../../downloads/image-example.bmp";
    res.sendFile(fileName, options, function (err) {
        if (err) {
            //next(err);
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
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
    console.log("profile: " + req);
    var result = {
        success: true,
        profile: [],
        error: null
    }
    try {
        switch (req) {
            case "profile":
                //this has to be change
                response.render("./admin/pages/settings/settings", {
                    keys: keys
                });
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

//#endregion get

module.exports = router;