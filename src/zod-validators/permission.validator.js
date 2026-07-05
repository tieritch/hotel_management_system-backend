const { z } = require("zod");

const readPermissionchema = z
  .object({
    resourceId: z
      .string({ message: "resource ID must be a string" })
      .min(1, " resource ID can't be empty"),
    actionId: z
      .string({ message: " action ID must be a string" })
      .min(1, "action ID can't be empty"),
  })
  .strict();

const readPermissionsSchema = z.array(readPermissionchema);

module.exports = {
  readPermissionsSchema,
};
