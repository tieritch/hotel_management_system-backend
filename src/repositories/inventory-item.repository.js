const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const { buildInclude } = require("./query-builders/inventory-item");

const inventoryItemRepository = {
  ...baseModelRepository(prisma.InventoryItem, buildInclude),
};

module.exports = { inventoryItemRepository };
