const { actionRepository } = require("../repositories");

const actionController = {
  async findAll(req, res) {
    try {
      const roles = await actionRepository.findAll();
      res.status(200).json(roles);
    } catch (err) {
      console.error(err);

      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },
};

module.exports = { actionController };
