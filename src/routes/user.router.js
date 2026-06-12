const express = require("express");
const { userController } = require("../controllers");
//const validate = require("../middlewares/validate");

const { validate, auth } = require("../middlewares");

const { createUserSchema } = require("../zod-validators/user.validator");

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.post("/", auth, validate(createUserSchema), userController.create);

module.exports = router;
