const { z } = require("zod");

const readActionSchema = z.object({
  actionId: z.string({ message: "action id must be a string" }),
});

module.exports = {
  readActionSchema,
};

module.exports = { readActionSchema };
