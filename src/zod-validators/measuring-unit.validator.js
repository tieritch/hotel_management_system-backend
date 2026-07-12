const { z } = require("zod");
const { refineValidator, refineErrorMsg } = require("../utilities");

const idSch = z.coerce
  .number({ error: "Measuring ID must be a valid number" })
  .int({ error: "Measuring ID must be a valid integer" })
  .positive({ error: "Measuring ID must be a valid positive integer" });

const nameSch = z
  .string({ error: "Measuring name must be a string" })
  .trim()
  .min(1, { error: "Measuring name can't be empty" });

const descSch = z
  .string({ error: "Measuring description must be a string" })
  .trim()
  .min(1, { error: "Measuring description can't be empty" });

const create = {
  body: z.object({
    name: nameSch,
    description: descSch,
  }),
};

const update = {
  params: z.object({ id: idSch }),
  body: z
    .object({
      name: z
        .union([z.literal("").transform(() => undefined), nameSch])
        .optional(),
      description: z
        .union([z.literal("").transform(() => undefined), descSch])
        .optional(),
    })
    .refine(refineValidator(), refineErrorMsg),
};

const remove = {
  params: z.object({
    id: idSch,
  }),
};

module.exports = { create, update, remove };
