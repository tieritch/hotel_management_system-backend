const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/room-type");

const roomTypeRepository = {
  ...baseModelRepository(prisma.RoomType, buildInclude),
};

module.exports = { roomTypeRepository };
