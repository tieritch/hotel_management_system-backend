const express = require("express");
const { positionController } = require("../controllers");

const {
  validate,

  requireAdmin,
} = require("../middlewares");

const {
  create,
  update,
  remove,
} = require("../zod-validators/position.validator");

const router = express.Router();

router.get("/", positionController.findAll);
router.get("/:id", positionController.findById);

router.post("/", requireAdmin, validate(create), positionController.create);

router.patch("/:id", requireAdmin, validate(update), positionController.update);

router.delete(
  "/:id",
  requireAdmin,
  validate(remove),
  positionController.remove
);

module.exports = router;
