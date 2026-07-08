const { roomTypeRepository } = require("../repositories");
const { handleDBError, mapZodToDb } = require("../utilities");

const roomTypeController = {
  async findAll(req, res) {
    try {
      //  const { include, ...filters } = req.query;
      // const { include, ...filters } = req.query;
      const { include, ...filters } = req.query;
      const rTypes = await roomTypeRepository.findAll(filters, include);
      return res.status(200).json(rTypes);
    } catch (err) {
      console.log(err);
      handleDBError(err, res, "RoomType");
    }
  },

  async findById(req, res) {
    const { include } = req.query;
    const { id } = req.validatedData.params;
    try {
      const rType = await roomTypeRepository.findById(id, include);
      // await employeeRepository.findById(id, include);
      return res.status(200).json(rType);
    } catch (err) {
      handleDBError(err, res, "RoomType");
    }
  },

  async create(req, res) {
    //console.log("req body:", req.body);
    //console.log("req valid data:", req.validateData);
    try {
      const { name, description, basePrice } = req.validatedData.body;

      const rType = await roomTypeRepository.create({
        name,
        description,
        base_price: basePrice,
      });
      return res.status(201).json({ success: "true", data: rType });
    } catch (err) {
      console.log(err);
      handleDBError(err, res, "RoomType");
    }
  },

  async update(req, res) {
    try {
      const { id } = req.validatedData.params;

      const bodyData = req.validatedData.body;

      //console.log(" In update romType controller:", req.validatedData.body);
      const fieldMapping = {
        name: "name",
        description: "description",
        basePrice: "base_price",
      };

      const updateData = mapZodToDb(bodyData, fieldMapping);
      const updated = await roomTypeRepository.updateById(updateData, id);

      return res.status(201).json({ success: "true", data: updated });
    } catch (err) {
      handleDBError(err, res, "RoomType");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const deleted = await roomTypeRepository.removeById(id);
      return res.status(201).json({ success: "true", data: deleted });
    } catch (err) {
      handleDBError(err, res, "RoomType");
    }
  },
};

module.exports = { roomTypeController };
