const { success } = require("zod");
const { measuringUnitRepository } = require("../repositories");
const { handleDBError } = require("../utilities");

const measuringUnitController = {
  async findAll(req, res) {
    try {
      const { include, ...filters } = req.query;
      const units = await measuringUnitRepository.findAll(filters, include);
      return res.status(200).json(units);
    } catch (err) {
      handleDBError(err, res, "MeasuringUnit");
    }
  },

  async findById(req, res) {
    try {
      console.log(" in meauser controller in findById");
      const { include } = req.query;
      const { id } = req.params;
      const unit = await measuringUnitRepository.findById(Number(id), include);
      return res.status(200).json(unit);
    } catch (err) {
      handleDBError(err, res, "MeasuringUnit");
    }
  },

  async create(req, res) {
    try {
      let bodyData = req.validatedData.body;
      /*name = name.toLowerCase().trim();
      description = description.toLowerCase().trim();
      const convertTo = req.validatedData.body.convertTo;
      const conversionFactor = req.validatedData.body.conversionFactor;*/
      const unit = await measuringUnitRepository.create(bodyData);
      res.status(201).json({ success: "true", data: unit });
    } catch (err) {
      handleDBError(err, res, "MeasuringUnit");
    }
  },

  async update(req, res) {
    try {
      const { id } = req.validatedData.params;
      let bodyData = req.validatedData.body;
      // name = name.toLowerCase().trim();
      // description = description.toLowerCase().trim();
      //const bodyData = req.validatedData.body;
      //const updateData = mapZodToDb({ name, de);
      const updated = await measuringUnitRepository.updateById(bodyData, id);
      return res.status(201).json({ success: "true", data: updated });
    } catch (err) {
      handleDBError(err, res, "MeasuringUnit");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const deleted = await measuringUnitRepository.removeById(id);
      return res.status(201).json({ success: true, data: deleted });
    } catch (err) {
      handleDBError(err, res, "MeasuringUnit");
    }
  },
};

module.exports = { measuringUnitController };
