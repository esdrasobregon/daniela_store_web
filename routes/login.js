const express = require("express");
var keys = require('./../shared/serverKeys.js');
const router = express.Router();
const cokieParser = require("cookie-parser");
const cookiesFunction = require('./../serverFunctions/serverCookies');
router.use(cokieParser());

router.get("/", function (req, res) {
    res.set('Cache-control', `no-cache, no-store, must-revalidate`, );
    cookiesFunction.verifyToDeleteUserCookie(req, res, keys);
    res.render("./pages/login", {
        keys: keys
    });

});
module.exports = router;