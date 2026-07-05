/*const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const { buildInclude } = require("./query-builders/role.query-builder");

const roleRepository = {
  ...baseModelRepository(prisma.Role, "Role"),
  // async createWithTx(data) {},
};

module.exports = { roleRepository };*/

const prisma = require("../../prismaClient");
//const { getModelFields } = require("./model-fields");
const baseModelRepository = require("./base.repository");

//const { buildInclude } = require("./query-builders/role.query-builder");

const { buildInclude } = require("./query-builders/role.query-builder");

const roleRepository = {
  ...baseModelRepository(prisma.Role, buildInclude),
};

module.exports = { roleRepository };
