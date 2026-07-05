const express = require("express");
const { userController } = require("../controllers");
//const validate = require("../middlewares/validate");

const {
  validate,
  checkToken,
  checkIsAdmin,
  checkIActive,
  requireAdmin,
  requireActiveUser,

  rbac,
} = require("../middlewares");

const {
  create,
  remove,
  login,
  assignRole,
  modifyRole,
  toggleStatus,
} = require("../zod-validators/user.validator");

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.patch(
  "/:id/status",
  validate(toggleStatus),
  requireAdmin,
  userController.toggleStatus
);
router.post("/login", validate(login), userController.login);
router.post("/logout", userController.logout);
router.post(
  "/",
  checkToken,
  checkIsAdmin,
  validate(create),
  rbac([
    { action: "READ", resource: "users" },
    { action: "CREATE", resource: "users" },
  ]),
  userController.create
);

router.post(
  "/:id/roles",
  checkToken,
  checkIsAdmin,
  validate(assignRole),
  /* rbac([
    { action: "READ", resource: "user_roles" },
    { action: "CREATE", resource: "user_roles" },
  ]),*/
  userController.assignRole
);

router.patch(
  "/:id/roles",
  checkToken,
  checkIsAdmin,
  validate(modifyRole),
  /* rbac([
    { action: "READ", resource: "user_roles" },
    { action: "CREATE", resource: "user_roles" },
    { action: "DELETE", resource: "user_roles" },
  ]),*/
  userController.updateRole
);

router.patch(
  "/:id/isActive",
  requireAdmin,
  validate(toggleStatus),
  userController.toggleStatus
);

router.delete(
  "/:id",
  checkToken,
  checkIsAdmin,
  validate(remove),
  /*rbac([
    { action: "READ", resource: "user_roles" },
    { action: "DELETE", resource: "user_roles" },
  ]),*/
  userController.remove
);

module.exports = router;
