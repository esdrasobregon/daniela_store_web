const express = require("express");
const router = express.Router();
const cokieParser = require("cookie-parser");
router.use(cokieParser());


//#region cookies

/**
 * this function deletes the current user
 * cookie
 * @param {*} res response server object
 */
const deleteCookies = function (res) {
    try {
        res.cookie("currentUser", '', {
            expires: new Date(0)
        });
        console.log('Cookie has been deleted successfully');
    } catch (error) {
        console.log("error" + error);
    }

}

/**
 * this function sets the current user cookie
 * @param {*} res a response server object
 * @param {*} user a user object
 */
const setUserCookie = function (res, user) {
    res.cookie(`currentUser`, JSON.stringify(user), {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        // expires works the same as the maxAge
        expires: new Date('01 12 2021'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    console.log(res.cookie);
}

/**
 * this function verify the current user
 * to be deleted
 * @param {*} req server request object
 * @param {*} res server response object
 * @param {*} keys server own variables
 */
const verifyToDeleteUserCookie = function (req, res, keys) {

    try {
        if (req.cookies.hasOwnProperty("currentUser")) {
            deleteCookies(res);
            keys.currentUser = null;
        }
    } catch (error) {
        keys.currentUser = null;
        console.log("error: " + error);
    }
}

/**
 * this function checks if the current user cookie
 * @param {*} req a request server object
 * @returns a confirmation bool
 */
const userCookieExist = function (req) {
    var result = true;
    try {
        if (req.cookies.hasOwnProperty("currentUser")) {}else{
            result = false;
        }
    } catch (error) {
        console.log("error: " + error);
        result = false;
    }
    return result;
}

/**
 * this function gets the current user cookie
 * @param {*} req server request object
 * @param {*} keys server own variables
 */
const getUserCookie = function (req, keys) {
    console.log(req.cookies);
    try {
        keys.currentUser = JSON.parse(req.cookies.currentUser);
    } catch (error) {
        keys.currentUser = null;
        console.log("error: " + error);
    }
}

//#endregion cookies

module.exports = {
    deleteCookies: deleteCookies,
    setUserCookie: setUserCookie,
    verifyToDeleteUserCookie: verifyToDeleteUserCookie,
    getUserCookie: getUserCookie,
    userCookieExist: userCookieExist
}