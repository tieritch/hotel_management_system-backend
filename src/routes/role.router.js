const express = require("express");
const { roleController } = require("../controllers");

const { validate, checkToken, rbac } = require("../middlewares");

const { create, update, remove } = require("../zod-validators/role.validator");

const router = express.Router();

router.get(
  "/",

  //rbac([{ action: "READ", resource: "roles" }]),
  roleController.findAll
);

router.get(
  "/:id",
  // rbac([{ action: "READ", resource: "roles" }]),
  roleController.findById
);
router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "roles" },
    { action: "CREATE", resource: "roles" },
  ]),
  roleController.create
);

router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "roles" },
    { action: "DELETE", resource: "roles" },
  ]),
  roleController.remove
);

router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "roles" },
    { action: "UPDATE", resource: "roles" },
  ]),
  roleController.updateById
);

module.exports = router;
