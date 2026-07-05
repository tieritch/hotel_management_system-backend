const { resourceRepository } = require("../repositories");

const resourceController = {
  async findAll(req, res) {
    try {
      const roles = await resourceRepository.findAll();
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

module.exports = { resourceController };
