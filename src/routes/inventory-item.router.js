const express = require("express");

const { inventoryItemController } = require("../controllers");
const { checkToken, rbac, validate } = require("../middlewares");
const {
  create,
  update,
  remove,
} = require("../zod-validators/inventory-item.validator");

/*const {
  inventoryItemController,
} = require("../controllers/inventory.controller");*/

const router = express.Router();

router.get("/", inventoryItemController.findAll);

router.get("/:id", inventoryItemController.findById);

router.post(
  "/",
  checkToken,
  validate(create),
  rbac([
    { action: "READ", resource: "inventory_items" },
    { action: "CREATE", resource: "inventory_items" },
  ]),
  inventoryItemController.create
);

router.patch(
  "/:id",
  checkToken,
  validate(update),
  rbac([
    { action: "READ", resource: "inventory_items" },
    { action: "UPDATE", resource: "inventory_items" },
  ]),
  inventoryItemController.update
);

router.delete(
  "/:id",
  checkToken,
  validate(remove),
  rbac([
    { action: "READ", resource: "inventory_items" },
    { action: "DELETE", resource: "inventory_items" },
  ]),
  inventoryItemController.remove
);

module.exports = router;
