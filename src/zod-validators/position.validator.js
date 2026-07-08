const { z } = require("zod");

/**
 * 
 * 
model Position {
  id            String      @id @default(uuid())
  name String      @unique
  created_at    DateTime    @default(now())
  updated_at    DateTime    @updatedAt
  employees     Employee[]
  @@map("positions")
}
 */
const idSchema = z.coerce
  .number({ error: "Position Id must be a valid number" })
  .int({ error: "Position id must be a valid integer" })
  .positive({ error: "Position ID must be a positive integer" });

const create = {
  body: z.object({
    name: z
      .string({ error: "position name must be a string" })
      .min(1, " position name can't be empty"),
  }),
};

const update = {
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    name: z
      .string({ error: "Position name must be a valid string" })
      .min(1, "Position name can't be empty"),
  }),
};

const remove = {
  params: z.object({
    id: idSchema,
  }),
};
module.exports = {
  create,
  update,
  remove,
};
