//const { findBy, findByUsername } = require("../controllers/user.controller");
const prisma = require("../prismaClient");

const baseModelRepository = require("./base.repository");

const userRepository = {
  ...baseModelRepository(prisma.USERS),

  async findByUsername(username) {
    return prisma.USERS.findUnique({ username });
  },
};

module.exports = { userRepository };
