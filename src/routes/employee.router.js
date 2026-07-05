const express = require("express");
const { employeeController } = require("../controllers");

const {
  validate,
  checkToken,

  requireAdmin,
  requireActiveUser,

  rbac,
} = require("../middlewares");

const {
  create,
  remove,
  update,
} = require("../zod-validators/employee.validator");

const router = express.Router();

router.get("/", employeeController.findAll);
router.get("/:id", employeeController.findById);

router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "employees" },
    { action: "CREATE", resource: "employees" },
  ]),
  employeeController.create
);

router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "employees" },
    { action: "UPDATE", resource: "employees" },
  ]),
  employeeController.update
);

router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "employees" },
    { action: "DELETE", resource: "employees" },
  ]),
  employeeController.remove
);

module.exports = router;
