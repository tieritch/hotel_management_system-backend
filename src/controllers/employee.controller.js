const { employeeRepository } = require("../repositories");
const { handleDBError } = require("../utilities");

const employeeController = {
  async findAll(req, res) {
    const { include, ...filters } = req.query;
    try {
      const emps = await employeeRepository.findAll(filters, include);
      res.status(200).json(emps);
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },

  async findById(req, res) {
    const { include } = req.query;
    const { id } = req.params;
    try {
      const emp = await employeeRepository.findById(id, include);
      res.status(200).json(emp);
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },

  async create(req, res) {
    try {
      const {
        firstname,
        lastname,
        phoneNumber,
        positionId,
        hiredDate,
        email,
        userId,
      } = req.validatedData.body;

      // Envoi de l'objet au repository avec les clés camelCase requises par le nouveau schéma
      const emp = await employeeRepository.create({
        firstname,
        lastname,
        phoneNumber: phoneNumber || null,
        positionId: positionId,
        hireDate: hiredDate || null,
        email: email || null,
        userId: userId || null,
      });

      return res.status(201).json({ success: true, data: emp });
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },

  async update(req, res) {
    try {
      const { id } = req.validatedData.params;
      const bodyData = req.validatedData.body;

      // Plus aucun dictionnaire ! On nettoie juste les chaînes vides
      const updateData = {};
      for (const [key, value] of Object.entries(bodyData)) {
        if (value !== undefined) {
          updateData[key] = value === "" ? null : value;
        }
      }

      const updated = await employeeRepository.updateById(updateData, id);
      return res.status(200).json({ success: true, data: updated });
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const deleted = await employeeRepository.removeById(id);
      return res.status(200).json({ success: true, data: deleted });
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },
};

module.exports = { employeeController };
