const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/room");

const roomRepository = {
  ...baseModelRepository(prisma.Room, buildInclude),
  // ...baseModelRepository(prisma.Employee, buildInclude),
};

module.exports = {
  roomRepository,
};
