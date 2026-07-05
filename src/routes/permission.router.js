const express = require("express");
const { permissionController } = require("../controllers");
//const validate = require("../middlewares/validate");

const { validate, auth } = require("../middlewares");

const {
  createPermissionsSchema,
} = require("../zod-validators/permission.validator");

const router = express.Router();

router.get("/", permissionController.findAll);
router.get("/:id", permissionController.findById);
router.post(
  "/",

  validate(createPermissionsSchema),
  permissionController.create
);

module.exports = router;
