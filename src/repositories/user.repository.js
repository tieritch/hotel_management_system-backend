const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const { buildInclude } = require("./query-builders/user.query-builder");

const userRepository = {
  ...baseModelRepository(prisma.User, buildInclude),

  findByUsername(username) {
    return prisma.User.findUnique({
      where: {
        username,
      },
    });
  },
};

module.exports = { userRepository };
