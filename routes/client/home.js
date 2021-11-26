//take from https://www.youtube.com/watch?v=0Hu27PoloYw
const express = require("express");
const session = require('express-session');
var keys = require('../../shared/serverKeys.js');
var pageSettings = require('../../shared/settings/page.js');
const cokieParser = require("cookie-parser");
const cookiesFunction = require('../../serverFunctions/serverCookies');
const {
    pagesNames
} = require("../../shared/serverKeys.js");
const router = express.Router();
router.use(session({
    secret: "key that will sign cokie",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    }
}));
router.use(cokieParser());

router.get("/", function (req, res) {
    keys.settings = pageSettings;
    cookiesFunction.getUserCookie(req.cookies, keys);
    res.render('index', {
        keys: keys
    });
});

module.exports = router;