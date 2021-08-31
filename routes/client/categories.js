//take from https://www.youtube.com/watch?v=0Hu27PoloYw
const express = require("express");
var keys = require('../../shared/serverKeys.js');
const router = express.Router();

router.get("/", function (req, res) {
    res.render("./pages/categories/categories", {
        keys: keys
    });
});

module.exports = router;