//const { findBy, findByUsername } = require("../controllers/user.controller");
const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
//const baseModelRepository = require("D:/utchenie/portfolio_site/tieritch_portfolio/projet_deployees/hotel/backend/repositories/base.repository.js");
//console.log(`baseModelRepository: ${baseModelRepository}`);
const userRepository = {
  ...baseModelRepository(prisma.USERS),

  async findByUsername(username) {
    return prisma.USERS.findUnique({
      where: {
        username,
      },
    });
  },
};

module.exports = { userRepository };
