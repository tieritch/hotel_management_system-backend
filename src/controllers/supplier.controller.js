const { supplierRepository } = require("../repositories");
const { handleDBError } = require("../utilities");

const supplierController = {
  async findAll(req, res) {
    const { include, ...filters } = req.query;
    try {
      const suppliers = await supplierRepository.findAll(filters, include);
      return res.status(200).json(suppliers);
    } catch (err) {
      handleDBError(err, res, "Supplier");
    }
  },

  async findById(req, res) {
    const { include } = req.query;
    const { id } = req.params;
    try {
      const supplier = await supplierRepository.findById(id, include);
      return res.status(200).json(supplier);
    } catch (err) {
      handleDBError(err);
    }
  },

  async create(req, res) {
    try {
      const bodyData = req.validatedData.body;
      const suppliers = await supplierRepository.create(bodyData);
      return res.status(201).json({ success: "true", data: suppliers });
    } catch (err) {
      handleDBError(err, res, "Supplier");
    }
  },

  async update(req, res) {
    try {
      const { id } = req.validatedData.params;
      const bodyData = req.validatedData.body;
      const updated = await supplierRepository.updateById(bodyData, id);
      return res.status(201).json({ success: "true", data: updated });
    } catch (err) {
      handleDBError(err, res, "Supplier");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const deleted = await supplierRepository.removeById(id);
      return res.status(201).json({ success: "true", data: deleted });
    } catch (err) {
      handleDBError(err, res, "Supplier");
    }
  },
};

module.exports = {
  supplierController,
};
