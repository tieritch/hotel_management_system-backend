const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/user.query-builder");

const { create, createMany, removeById } = baseModelRepository(prisma.UserRole);
const userRoleRepository = {
  //...baseModelRepository(prisma.UserRole, buildInclude),

  /* findByUsername(username) {
    return prisma.User.findUnique({
      where: {
        username,
      },
    });
  },*/
  create,
  createMany,
  removeById,
};

module.exports = { userRoleRepository };
