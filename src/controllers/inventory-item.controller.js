const { inventoryItemRepository } = require("../repositories");

const { handleDBError } = require("../utilities");

const prisma = require("../../prismaClient");

const { MovementType } = require("@prisma/client");

const inventoryItemController = {
  async findAll(req, res) {
    console.log(" in findAll controller");
    try {
      const { include, ...fillters } = req.query;
      const inventories = await inventoryItemRepository.findAll(
        fillters,
        include
      );
      return res.status(200).json(inventories);
    } catch (err) {
      handleDBError(err, res, "InventoryItem");
    }
  },

  async findById(req, res) {
    console.log(" in findById controller");
    try {
      const { id } = req.params;
      const { include } = req.query;

      const inventory = await inventoryItemRepository.findById(id, include);
      return res.status(200).json(inventory);
    } catch (err) {
      handleDBError(err, res, "InventoryItem");
    }
  },

  async create(req, res) {
    console.log(" in create controller");
    try {
      const bodyData = req.validatedData.body;

      const inventoryItem = await prisma.$transaction(async (tx) => {
        const inventItem = await tx.InventoryItem.create({ data: bodyData });
        const qty = bodyData.currentStock;

        await tx.stockMovement.create({
          data: {
            quantity: qty,
            inventoryItemId: inventItem.id,
            reason: "New Created Product",
            type: MovementType["IN"],
          },
        });
        return inventItem;
      });
      return res.status(201).json(inventoryItem);
    } catch (err) {
      handleDBError(err, res, "InventoryItem");
    }
  },

  async update(req, res) {
    try {
      const { id } = req.validatedData.params;
      const bodyData = req.validatedData.body;

      const updated = await prisma.$transaction(async (tx) => {
        let prevQty, newQty, movType;
        if (bodyData.currentStock) {
          const item = await tx.inventoryItem.findUnique({ where: { id } });
          prevQty = item?.currentStock;
        }

        const upd = await tx.inventoryItem.update({
          data: bodyData,
          where: { id },
        });

        newQty = upd?.currentStock;

        if (newQty.toNumber() > prevQty.toNumber())
          movType = MovementType["IN"];
        else if (newQty.toNumber() < prevQty.toNumber())
          movType = MovementType["OUT"];

        if (prevQty && !newQty?.equals(prevQty)) {
          await tx.stockMovement.create({
            data: {
              inventoryItemId: upd.id,
              quantity: newQty.sub(prevQty).abs(),
              type: movType,
              reason: "Adjustment",
            },
          });
        }
        return upd;
      });
      return res.status(201).json(updated);
    } catch (err) {
      handleDBError(err, res, "InventoryItem");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const deleted = await inventoryItemRepository.removeById(id);
      return res.status(201).json(deleted);
    } catch (err) {
      handleDBError(err, res, "InventoryItem");
    }
  },
};

module.exports = { inventoryItemController };
