const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const { buildInclude } = require("./query-builders/supplier");

const supplierRepository = {
  ...baseModelRepository(prisma.supplier, buildInclude),
};

module.exports = { supplierRepository };
