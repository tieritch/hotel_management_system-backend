const { supplierController } = require("../controllers");
const { validate, rbac, checkToken } = require("../middlewares");
const {
  create,
  update,
  remove,
} = require("../zod-validators/supplier.validator");

const express = require("express");
const router = express.Router();

router.get("/", supplierController.findAll);
router.get("/:id", supplierController.findById);
router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "suppliers" },
    { action: "CREATE", resource: "suppliers" },
  ]),
  supplierController.create
);
router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "suppliers" },
    { action: "UPDATE", resource: "suppliers" },
  ]),
  supplierController.update
);
router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "suppliers" },
    { action: "DELETE", resource: "suppliers" },
  ]),
  supplierController.remove
);

module.exports = router;
