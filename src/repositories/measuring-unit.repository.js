const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const { buildInclude } = require("./query-builders/measuring-unit");

const measuringUnitRepository = {
  ...baseModelRepository(prisma.measuringUnit, buildInclude),
};

module.exports = { measuringUnitRepository };
