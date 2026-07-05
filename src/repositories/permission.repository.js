const prisma = require("../../prismaClient");

const baseModelRepository = require("./base.repository");
const permissionRepository = {
  ...baseModelRepository(prisma.Permission, "Permission"),

  /*async findByUsername(username) {
    return prisma.USERS.findUnique({
      where: {
        username,
      },
    });
  },*/
  // async find
  async resolvePermissions(permissions) {
    const existingPermissions = await prisma.Permission.findMany({
      where: {
        OR: permissions.map((permission) => ({
          action_id: permission.actionId,
          resource_id: permission.resourceId,
        })),
      },
    });

    const invalidPermissions = permissions.filter(
      (permission) =>
        !existingPermissions.some(
          (existingPermission) =>
            existingPermission.action_id === permission.actionId &&
            existingPermission.resource_id === permission.resourceId
        )
    );

    return {
      existingPermissions,
      invalidPermissions,
    };
  },
};

module.exports = { permissionRepository };
