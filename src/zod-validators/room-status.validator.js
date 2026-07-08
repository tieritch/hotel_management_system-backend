const { z } = require("zod");

const idSch = z.coerce
  .number({ error: "Room status ID must be a valid number" })
  .int({ error: "Room status ID must be a valid integer" })
  .positive({ error: "Room  status ID must be a valid positive integer" });

const nameSch = z
  .string({ error: "Room status name must be a string" })
  .trim()
  .min(1, { error: "Room status name can't be empty" });

const descSch = z
  .string({ error: "Room status name must be a string" })
  .trim()
  .min(1, { error: "Room status name can't be empty" });

const create = {
  body: z.object({
    name: nameSch.trim().toLowerCase(),
    description: z
      .union([z.literal("").transform(() => undefined), descSch])
      .optional(),
  }),
};

const update = {
  params: z.object({
    id: idSch,
  }),

  body: z.object({
    name: z.union([z.literal(""), nameSch.trim().toLowerCase()]).optional(),
    description: z
      .union([z.literal("").transform(() => undefined), descSch])
      .optional(),
  }),
};

const remove = {
  params: z.object({ id: idSch }),
};

module.exports = {
  create,
  update,
  remove,
};
