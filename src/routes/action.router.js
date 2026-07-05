const express = require("express");
const { actionController } = require("../controllers");

const { validate, auth } = require("../middlewares");

const router = express.Router();

router.get("/", actionController.findAll);

module.exports = router;
