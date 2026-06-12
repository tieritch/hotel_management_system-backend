const { z } = require("zod");

const createUserSchema = z.object({
  username: z.string().min(4),
  password: z
    .string()
    .min(6)
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one digit"),
  // email: z.string().email().optional(),
});

module.exports = {
  createUserSchema,
};
