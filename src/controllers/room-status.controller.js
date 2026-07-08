const { roomStatusRepository } = require("../repositories");
const { handleDBError } = require("../utilities");

const roomStatusController = {
  async findAll(req, res) {
    try {
      const { include, ...filters } = req.query;
      const rooms = await roomStatusRepository.findAll(filters, include);
      return res.status(200).json(rooms);
    } catch (err) {
      handleDBError(err, res, "RoomStatus");
    }
  },

  async findById(req, res) {
    try {
      const { include } = req.query;
      const { id } = req.params;
      const room = await roomStatusRepository.findById(Number(id), include);
      return res.status(200).json(room);
    } catch (err) {
      handleDBError(err, res, "RoomStatus");
    }
  },
};

module.exports = { roomStatusController };
