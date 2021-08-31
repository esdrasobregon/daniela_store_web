const express = require("express");
var keys = require('../../shared/serverKeys.js');
const router = express.Router();

router.get("/", function (req, res) {
    res.render("./pages/about", {
        keys: keys
    });
});

module.exports = router;