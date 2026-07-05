const {
  roleRepository,
  rolePermissionRepository,
  actionRepository,
  resourceRepository,
  permissionRepository,
} = require("../repositories");

const { errorMsg, handleDBError } = require("../utilities");

const prisma = require("../../prismaClient");

const roleController = {
  async findAll(req, res) {
    try {
      const { include, ...filters } = req.query;
      const roles = await roleRepository.findAll(filters, include);
      res.status(200).json(roles);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async findById(req, res) {
    try {
      //  const role = await roleRepository.findById(req.params.id);
      const { include } = req.query;
      const { id } = req.params;
      const role = await roleRepository.findById(id, include);
      res.status(200).json(role);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const { name, permissions } = req.validatedData.body;

      const formattedName = name.trim().toLowerCase();

      const { existingPermissions, invalidPermissions } =
        await permissionRepository.resolvePermissions(permissions);

      // Business rule validation
      if (invalidPermissions.length > 0) {
        return res.status(422).json({
          success: false,
          category: "Business Rule",
          message: "Some permissions do not exist",
          invalidPermissions,
        });
      }

      const newRole = await prisma.$transaction(async (tx) => {
        const role = await tx.Role.create({
          data: {
            name: formattedName,
          },
        });

        const rolePermissions = existingPermissions.map((permission) => ({
          role_id: role.id,
          permission_id: permission.id,
        }));

        await tx.RolePermission.createMany({
          data: rolePermissions,
        });

        return role;
      });

      return res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: newRole,
      });
    } catch (err) {
      console.error(err);
      handleDBError(err, res, "Role");
    }
  },

  async remove(req, res) {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.RolePermission.deleteMany({
          where: { role_id: req.params.id },
        });
        const { id } = req.validatedData.params;
        const deleted = await tx.Role.delete({ where: { id } });
        res.status(201).send(deleted);
      });
    } catch (err) {
      console.log(err);
      handleDBError(err, res, "Role");
    }
  },

  async updateById(req, res) {
    try {
      const roleId = req.validatedData.params.id;
      const { name, permissions } = req.validatedData.body;

      const formattedName = name?.trim().toLowerCase();

      const updatedRole = await prisma.$transaction(async (tx) => {
        // Validate permissions before any modification
        if (permissions) {
          const { existingPermissions, invalidPermissions } =
            await permissionRepository.resolvePermissions(permissions);

          if (invalidPermissions.length > 0) {
            /*const error = new Error("INVALID_PERMISSIONS");
            error.invalidPe*/
            return res.status(422).json({
              success: false,
              category: "Business Rule",
              message: "Some permissions do not exist",
              invalidPermissions: invalidPermissions,
            });
          }

          // Replace role permissions
          await tx.RolePermission.deleteMany({
            where: { role_id: roleId },
          });

          const rolePermissions = existingPermissions.map((permission) => ({
            role_id: roleId,
            permission_id: permission.id,
          }));

          if (rolePermissions.length > 0) {
            await tx.RolePermission.createMany({
              data: rolePermissions,
            });
          }
        }

        // Update role name if provided
        const role = await tx.Role.update({
          where: { id: roleId },
          data: {
            ...(formattedName && { name: formattedName }),
          },
        });

        return role;
      });

      return res.status(200).json({
        success: true,
        message: "Role updated successfully",
        data: updatedRole,
      });
    } catch (err) {
      console.error(err);

      handleDBError(err, res, "Role");
    }
  },
};

module.exports = { roleController };
