///const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");
const { userRepository } = require("../repositories");
const userController = {
  async findAll(req, res) {
    try {
      const users = await userRepository.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async findBy(req, res) {
    try {
      const user = await userRepository.findBy(req.query);
      res.status(200).json(user);
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
      const user = await userRepository.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async findByUsername(req, res) {
    try {
      const user = await userRepository.findByUsername(req.body.username);
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
    }
  },

  async create(req, res) {
    try {
      const { username, password } = req.validatedData;

      const existingUser = await userRepository.findByUsername(
        username.trim().toLowerCase()
      );

      if (existingUser) {
        return res.status(409).json({
          category: "Conflict",
          message: "Username already exists",
        });
      }

      const password_hash = await bcrypt.hash(password, 10);

      const user = await userRepository.create({
        username: username.trim().toLowerCase(),
        password_hash,
      });

      return res.status(201).json(user);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },
};
module.exports = userController;
