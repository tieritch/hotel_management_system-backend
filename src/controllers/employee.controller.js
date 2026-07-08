/** model Employee {
  id             String               @id @default(uuid())
  first_name     String
  last_name      String
  email          String               @unique
  created_at     DateTime             @default(now())
  hire_date      DateTime?
  phone_num      String?
  position_id    Int
  updated_at     DateTime             @updatedAt
  user_id        String?              @unique
  position       Position            @relation(fields: [position_id], references: [id])
  user           User?               @relation(fields: [user_id], references: [id])
  schedules      EmployeeSchedule[]
  roomCleanings RoomCleaning[]

  @@index([position_id])
  @@map("employees")
} */

const { employeeRepository } = require("../repositories");

const { handleDBError, mapZodToDb } = require("../utilities");
const { update } = require("../zod-validators/role.validator");

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
        firstname: first_name,
        lastname: last_name,
        phoneNumber: phone_number,
        positionId: position_id,
        hiredDate: hired_date,
        ...body
      } = req.validatedData.body;
      const emp = await employeeRepository.create({
        first_name,
        last_name,
        phone_number,
        position_id,
        hired_date,
        email: body.email || null,
        user_id: body.userId || null,
      });
      res.status(201).json({ success: "true", data: emp });
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },

  async update(req, res) {
    try {
      // 1. On récupère l'ID depuis les paramètres de l'URL
      //console.log("________IN update controller___________");

      const { id } = req.validatedData.params;

      // 2. On récupère l'objet complet des données validées du body
      const bodyData = req.validatedData.body;

      // 3. On prépare l'objet final que Prisma va recevoir
      //const updateData = {};

      // 4. On mappe dynamiquement les noms de champs (CamelCase -> SnakeCase)
      // uniquement pour les clés qui ont été VRAIMENT fournies (différentes de undefined)
      const fieldMapping = {
        firstname: "first_name",
        lastname: "last_name",
        phoneNumber: "phone_number",
        positionId: "position_id",
        hireDate: "hire_date",
        userId: "user_id",
        email: "email",
      };

      /*for (const [zodKey, dbKey] of Object.entries(fieldMapping)) {
        if (bodyData[zodKey] !== undefined) {
          updateData[dbKey] = bodyData[zodKey] === "" ? null : bodyData[zodKey];
        }
      }*/
      const updateData = mapZodToDb(bodyData, fieldMapping);
      // 5. On envoie l'ID et l'objet dynamique nettoyé au repository

      const updated = await employeeRepository.updateById(updateData, id);

      // Status 200 car c'vest une modification, pas une création
      res.status(200).json({ success: "true", data: updated });
    } catch (err) {
      //console.log(err);
      handleDBError(err, res, "Employee");
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.validatedData.params;
      const deleted = await employeeRepository.removeById(id);
      res.status(201).json({ success: "true", data: deleted });
    } catch (err) {
      handleDBError(err, res, "Employee");
    }
  },
};

module.exports = { employeeController };
