const express = require("express");

const router = express.Router();

const { checkToken, validate, rbac } = require("../middlewares");

const { measuringUnitController } = require("../controllers");

const {
  create,
  update,
  remove,
} = require("../zod-validators/measuring-unit.validator");

router.get("/", measuringUnitController.findAll);

router.get("/:id", measuringUnitController.findById);

router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "measuring_units" },
    { action: "CREATE", resource: "measuring_units" },
  ]),
  measuringUnitController.create
);

router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "measuring_units" },
    { action: "UPDATE", resource: "measuring_units" },
  ]),
  measuringUnitController.update
);

router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "measuring_units" },
    { action: "DELETE", resource: "measuring_units" },
  ]),
  measuringUnitController.remove
);

module.exports = router;
