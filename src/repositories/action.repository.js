const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const { buildInclude } = require("./query-builders/user.query-builder");

//...baseModelRepository(prisma.User, buildInclude),
const { findBy, findById, findAll } = baseModelRepository(
  prisma.Action,
  buildInclude
);

const actionRepository = {
  //...baseModelRepository(prisma.ACTIONS),

  /*async findByUsername(username) {
    return prisma.USERS.findUnique({
      where: {
        username,
      },
    });
  },*/
  // async find
  // baseModelRepository(prisma.ACTIONS).findBy,
  // baseModelRepository(prisma.ACTIONS).findById,
  findAll,
  findBy,
  findById,
};

module.exports = { actionRepository };
