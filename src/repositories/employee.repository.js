const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const { buildInclude } = require("./query-builders/employee");

const employeeRepository = {
  ...baseModelRepository(prisma.Employee, buildInclude),
};

module.exports = { employeeRepository };
