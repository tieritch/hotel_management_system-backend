const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/room-status");

const { findAll, findById } = baseModelRepository(
  prisma.roomStatus,
  buildInclude
);

const roomStatusRepository = {
  //findAll,
  //findById,
  ...baseModelRepository(prisma.roomStatus, buildInclude),
};

module.exports = { roomStatusRepository };
