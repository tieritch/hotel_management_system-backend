///const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../prismaClient");

const { userRepository, userRoleRepository } = require("../repositories");
const { errorMsg, handleDBError } = require("../utilities");
//const { toggleStatus } = require("../zod-validators/user.validator");

const userController = {
  async findAll(req, res) {
    try {
      const { include, ...filters } = req.query;

      let users = await userRepository.findAll(filters, include);
      //  const { passwordHash, ...otherUserKeys } = filters;
      users = users
        .filter((user) => user.username.toLowerCase().trim() !== "admin")
        .map(({ passwordHash, ...otherUserKeys }) => ({ ...otherUserKeys }));

      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      handleDBError(err, res, "User");
    }
  },

  async findById(req, res) {
    try {
      const { include } = req.query;
      const { id } = req.params;
      console.log("req query:", req.query);
      let user = await userRepository.findById(id, include);
      /*if (user) {
        const { id, username, isActive, created_at, updated_at } = user;
        user = { id, username, isActive, created_at, updated_at };
      }*/
      const { passwordHash, ...otherUserKeys } = user;
      user = otherUserKeys;
      res.status(200).json(user);
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
      let { username, password } = req.validatedData.body;

      password = await bcrypt.hash(password, 10);

      let user = await userRepository.create({
        username: username.trim().toLowerCase(),
        passwordHash: password,
      });

      const { passwordHash, ...otherUserKeys } = user;
      user = otherUserKeys;
      return res.status(201).json(user);
    } catch (err) {
      console.error(err);

      handleDBError(err, res, "User");
    }
  },

  async assignRole(req, res) {
    try {
      const { id } = req.validatedData.params;
      const { roleIds } = req.validatedData.body;
      const data = roleIds.map((role) => ({
        userId: id,
        roleId: role, //.roleId,
      }));

      const count = await userRoleRepository.createMany(data);

      return res.status(201).json({
        success: true,
        message: "Role assigned successfully.",
        data: count,
      });
    } catch (err) {
      console.error(err);
      handleDBError(err, res, "UserRole");
    }
  },

  async updateRole(req, res) {
    try {
      const { id } = req.validatedData.params;
      const { roleIds } = req.validatedData.body;
      const data = roleIds.map((role) => ({
        userId: id,
        roleId: role, //.roleId,
      }));

      const count = await prisma.$transaction(async (tx) => {
        await tx.UserRole.deleteMany({ where: { userId: id } });
        return tx.UserRole.createMany({ data });
      });

      return res.status(201).json({
        success: true,
        message: "user roles updated successfully.",
        data: count,
      });
    } catch (err) {
      handleDBError(err, res, "UserRole");
    }
  },

  async remove(req, res) {
    try {
      //  const user = req.user;
      const { id } = req.validatedData.params;
      const deleted = await userRepository.removeById(req.params.id);
      return res.status(201).json({
        success: true,
        message: "user deleted successfully",
        data: deleted,
      });
    } catch (err) {
      console.log(err);
      handleDBError(err, res, "User");
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.validatedData.body;
      //await bcrypt.compareSync()
      let user = await userRepository.findByUsername(username);
      if (user) {
        const comp = await bcrypt.compare(password, user.passwordHash);
        //bcrypt.compare()
        if (!comp) {
          res.status(404).json({
            success: "false",
            category: " Not Found",
            message: " wrong password ",
          });
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "2h",
        });
        //const refreshExpires = input.rememberMe ? "7d" : "1d";
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "1d",
        });

        const isProduction = process.env.NODE_ENV == "production";
        res
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "Strict" : "Lax",
          })
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "Strict" : "Lax",
          });

        const { id, isActive, created_at, updated_at } = user;
        user = { id, username, isActive, created_at, updated_at };

        res.status(200).json(user);
      } else {
        res.status(404).json({
          success: "false",
          category: " Not Found",
          message: " wrong username",
        });
      }
    } catch (err) {
      console.log(err);
      handleDBError(err, res, "User");
    }
  },

  async logout(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
      succes: true,
      message: "logged out",
      data: req.user,
    });
  },

  async toggleStatus(req, res) {
    try {
      const { id } = req.validatedData.params;
      const { isActive } = req.validatedData.body;
      const user = await userRepository.findById(req.params.id);
      if (user) {
        const updated = await userRepository.updateById({ isActive }, id);
        return res.status(201).json({
          success: true,
          message: "user updated successfully",
          data: updated,
        });
      }
    } catch (err) {
      handleDBError(err, res, "User");
    }
  },
};

module.exports = { userController };
