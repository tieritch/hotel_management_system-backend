const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/position.query-builder");

const positionRepository = {
  ...baseModelRepository(prisma.Position, buildInclude),
};

module.exports = { positionRepository };
