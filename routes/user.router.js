const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findById);

module.exports = router;
