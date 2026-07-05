const express = require("express");
const { resourceController } = require("../controllers");

const router = express.Router();

router.get("/", resourceController.findAll);

module.exports = router;
