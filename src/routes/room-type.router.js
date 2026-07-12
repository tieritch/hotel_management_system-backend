const express = require("express");
const { roomTypeController } = require("../controllers");
const {
  idInt,
  create,
  remove,
  update,
} = require("../zod-validators/room-type.validator");

const { checkToken, validate, rbac } = require("../middlewares");

const router = express.Router();

router.get("/", roomTypeController.findAll);
router.get("/:id", validate(idInt), roomTypeController.findById);
router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "room_types" },
    { action: "CREATE", resource: "room_types" },
  ]),
  roomTypeController.create
);

router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "room_types" },
    { action: "UPDATE", resource: "room_types" },
  ]),
  roomTypeController.update
);

router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "room_types" },
    { action: "DELETE", resource: "room_types" },
  ]),
  roomTypeController.remove
);
module.exports = router;
