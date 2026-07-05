const { userRepositopy, permissionRepository } = require("../repositories");
const prisma = require("../../prismaClient");

function rbac(permissions) {
  // form of permissions: [{action, resource}, ]

  return async (req, res, next) => {
    let requiredPerms = await prisma.Permission.findMany({
      include: {
        action: true,
        resource: true,
      },
    });
    requiredPerms = requiredPerms
      .map(({ id, action, resource }) => ({ id, action, resource }))
      .filter((rp) =>
        permissions.some(
          (p) =>
            p.action.trim().toLowerCase() ==
              rp.action.name.trim().toLowerCase() &&
            p.resource.trim().toLowerCase() ==
              rp.resource.name.trim().toLowerCase()
        )
      );
    const requiredPermIds = requiredPerms.map((rq) => rq.id);

    let user = req.user;
    const username = req.user?.username;
    //console.log()
    let userFromDB = null;

    if (username)
      userFromDB = await prisma.user.findUnique({
        where: { username },
        include: {
          userRoles: {
            include: { role: { include: { rolePermissions: true } } },
          },
        },
      });

    // console.log("user from db:", userFromDB);
    const userPermIds = userFromDB.userRoles
      .map((val) => val.role)
      .map((val) => val.rolePermissions)[0]
      ?.map((val) => val.permission_id);

    let allowed = false;

    allowed =
      userPermIds &&
      requiredPermIds.every((rp) => userPermIds.some((up) => up == rp));
    if (!allowed && username.toLowerCase().trim() != "admin")
      return res.status(403).json({
        success: "false",
        category: "Not Allowed",
        message: "You don't have required permissions to this resource",
      });

    next();
  };
}

module.exports = { rbac };
