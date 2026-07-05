const { success } = require("zod");
const { positionRepository } = require("../repositories");

const { handleDBError } = require("../utilities");

const positionController = {
  async findAll(req, res) {
    try {
      const { include, ...filters } = req.query;
      const positions = await positionRepository.findAll(filters, include);
      res.status(200).json(positions);
    } catch (err) {
      return res.status(500).json({
        category: "Internal server error",
        message: err.message,
      });
    }
  },

  async findById(req, res) {
    try {
      //console.log(" in findById of controller");
      const { include } = req.query;
      const { id } = req.params;
      const position = await positionRepository.findById(id, include);
      console.log(" after findById of controller");
      res.status(200).json(position);
    } catch (err) {
      handleDBError(err, res, "Position");
    }
  },

  async create(req, res) {
    try {
      let { name } = req.validatedData.body;
      const position = await positionRepository.create({ name });
      res.status(201).json({ success: true, data: position });
    } catch (err) {
      handleDBError(err, res, "Position");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const removed = await positionRepository.removeById(id);
      res.status(201).json({ succes: true, data: removed });
    } catch (err) {
      handleDBError(err, res, "Position");
    }
  },

  async update(req, res) {
    try {
      console.log(" req valid data");
      console.log(req.validatedData);
      const { id } = req.validatedData.params;
      const { name } = req.validatedData.body;
      const updated = await positionRepository.updateById({ name }, id);
      res.status(201).json({ success: "true", data: updated });
    } catch (err) {
      handleDBError(err, res, "Position");
    }
  },
};

module.exports = { positionController };
