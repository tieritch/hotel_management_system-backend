const express = require("express");

const router = express.Router();

const { roomStatusController } = require("../controllers");

const { checkToken, validate, rbac, requireAdmin } = require("../middlewares");

//const { create, remove, update } = require("../zod-validators/room.validator");
const { roomController } = require("../controllers/room.controller");

router.get("/", roomStatusController.findAll);

router.get("/:id", roomStatusController.findById);

/*router.post(
  "/",
  validate(create),
  requireAdmin,

  roomStatusController.findAll
);

router.patch(
  "/:id",
  validate(update),
  requireAdmin,
  roomStatusController.update
);

router.delete(
  "/:id",
  validate(remove),
  requireAdmin,
  roomStatusController.remove
);*/
module.exports = router;
