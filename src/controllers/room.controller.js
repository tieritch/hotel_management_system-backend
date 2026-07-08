const { roomStatus } = require("../../prismaClient");
const { roomRepository } = require("../repositories");
const { handleDBError, mapZodToDb } = require("../utilities");
const { update } = require("../zod-validators/role.validator");
const { create } = require("../zod-validators/user.validator");

const roomController = {
  async findAll(req, res) {
    try {
      console.log(req.query);
      const { include, ...filters } = req.query;
      const rooms = await roomRepository.findAll(filters, include);
      return res.status(200).json(rooms);
    } catch (err) {
      handleDBError(err, res, "Room");
    }
  },

  async findById(req, res) {
    try {
      const { include } = req.query;
      const { id } = req.params;
      console.log(" in find by ID of rooms");
      const room = await roomRepository.findById(id, include);
      return res.status(200).json(room);
    } catch (err) {
      handleDBError(err, res, "Room");
    }
  },

  async create(req, res) {
    const {
      roomNumber: room_number,
      // roomName: room_name,
      roomTypeId: room_type_id,
      roomStatusID: room_status_id,
    } = req.validatedData.body;
    try {
      const room = await roomRepository.create({
        room_number,
        room_type_id,
        room_name: `room-${room_number}`,
        room_status_id,
      });
      return res.status(201).json({ success: "true", data: room });
    } catch (err) {
      handleDBError(err, res, "Room");
    }
  },

  async update(req, res) {
    const fieldMapping = {
      roomNumber: "room_number",
      roomName: "room_name",
      roomTypeId: "room_type_id",
      roomStatusId: "room_status_id",
    };

    try {
      const { id } = req.validatedData.params;
      const bodyData = req.validatedData.body;
      bodyData.roomName = `room-${bodyData.roomNumber}`;
      const updateData = mapZodToDb(bodyData, fieldMapping);
      const updated = await roomRepository.updateById(updateData, id);
      return res.status(201).json({ success: "true", data: updated });
    } catch (err) {
      handleDBError(err, res, "Room");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const deleted = await roomRepository.removeById(id);
      return res.status(201).json({ success: "deleted", data: deleted });
    } catch (err) {
      handleDBError(err, res, "Room");
    }
  },
};

module.exports = { roomController };
