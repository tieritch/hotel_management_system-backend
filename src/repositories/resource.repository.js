const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/role.query-builder");
//...baseModelRepository(prisma.User, buildInclude),
const { findBy, findById, findAll } = baseModelRepository(
  prisma.Resource,
  buildInclude
);
const resourceRepository = {
  //...baseModelRepository(prisma.RESOURCES),
  /*async findByUsername(username) {
    return prisma.USERS.findUnique({
      where: {
        username,
      },
    });
  },*/
  // async find
  findAll,
  findBy,
  findById,
};

module.exports = { resourceRepository };
