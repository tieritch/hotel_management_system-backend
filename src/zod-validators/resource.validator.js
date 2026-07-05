const { z } = require("zod");

const readResourceSchema = z.object({
  resourceId: z.string({ message: "resource name must be a string" }),
});

module.exports = {
  readResourceSchema,
};

module.exports = { readResourceSchema };
