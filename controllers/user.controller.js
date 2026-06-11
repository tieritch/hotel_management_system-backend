///const prisma = require("../prismaClient");
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
};
module.exports = userController;
