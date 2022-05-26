var express = require("express");
const authorize = require("../middleware/authorize");
var router = express.Router();

/* GET home page. */
router.get("/", authorize, function (req, res, next) {
	res.json({ data: "Hello World!" });
});

module.exports = router;
