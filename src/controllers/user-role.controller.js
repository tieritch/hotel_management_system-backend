const { userRepository, roleRepository } = require("../repositories");
const prisma = require("../../prismaClient");

const userRoleController = {
  /*async findByUsername(req, res) {
    const user = await prisma.user.findFirst({
      where: { username: req.params.username },
    });
    return res.status(200).json(user);
  },*/

  async findAll(req, res) {
    const users = await userRepository.findAll();
    return res.status(200).json(users);
  },

  /* async findBy(req, res) {
    try {
      let user = await userRepository.findBy(req.query);
      user = user.map(
        ({ id, username, is_active, created_at, updated_at }) => ({
          id,
          username,
          is_active,
          created_at,
          updated_at,
        })
      );
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },*/

  async findBy(req, res) {
    try {
      //console.log("req query_______________________:", req.query);
      //const key = [Object.keys(req.query)];
      const user = await prisma.user.findFirst({
        where: req.query,
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },
};

module.exports = { userRoleController };
