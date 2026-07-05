const { z } = require("zod");

const create = {
  body: z.object({
    username: z.string().min(4),
    password: z
      .string()
      .min(6)
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one digit"),
    // email: z.string().email().optional(),
  }),
};

const login = {
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
};

const role = z.string(); //object({ roleId: z.string() });

const assignRole = {
  params: z.object({
    id: z.string().uuid({ error: "L'ID doit être un UUID valide" }),
  }),
  body: z.object({
    roleIds: z.array(role).min(1, "Au moins un rôle est requis"),
  }),
};

// 2. Faites pareil pour modifyRole et toggleStatus
const modifyRole = {
  params: z.object({
    id: z.string().uuid({ error: "L'ID doit être un UUID valide" }),
  }),
  body: z.object({
    roleIds: z.array(role),
  }),
};

const toggleStatus = {
  params: z.object({
    id: z.string().uuid({ error: "L'ID doit être un UUID valide" }),
  }),
  body: z.object({
    isActive: z.boolean({
      required_error: "Le champ isActive est obligatoire",
    }),
  }),
};

const remove = {
  params: z.object({
    id: z.string(),
  }),
};

module.exports = {
  create,
  remove,
  login,
  assignRole,
  modifyRole,
  toggleStatus,
};
