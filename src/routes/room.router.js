const express = require("express");
const router = express.Router();

const { roomController } = require("../controllers");

const { checkToken, validate, rbac } = require("../middlewares");

const {
  //idInt,
  create,
  remove,
  update,
} = require("../zod-validators/room.validator");

router.get("/", roomController.findAll);

router.get("/:id", roomController.findById);

router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "rooms" },
    { action: "CREATE", resource: "rooms" },
  ]),

  roomController.create
);

router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "rooms" },
    { action: "UPDATE", resource: "rooms" },
  ]),
  roomController.update
);

router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "rooms" },
    { action: "DELETE", resource: "rooms" },
  ]),
  roomController.remove
);

module.exports = router;
