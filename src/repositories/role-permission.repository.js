const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");

const rolePermissionRepository = {
  ...baseModelRepository(prisma.RolePermission, "RolePermission"),
  // async createWithTx(data) {},
};

module.exports = { rolePermissionRepository };
