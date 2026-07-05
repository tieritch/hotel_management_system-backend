const { z } = require("zod");

const readPermission = z
  .object({
    resourceId: z
      .string({ error: "resource ID must be a string" })
      .min(1, " resource ID required"),
    actionId: z
      .string({ error: " action ID must be a string" })
      .min(1, "action ID required"),
  })
  .strict();

const create = {
  body: z.object({
    //...readActionSchema.shape,
    //...readResourceSchema.shape,
    name: z.string().min(4),
    // ...readPermissionsSchema.shape,
    permissions: z.array(readPermission),
  }),
};

const update = {
  body: z
    .object({
      name: z.union([z.literal(""), z.string().min(4)]).optional(),
      permissions: z.union([z.literal(""), z.array(readPermission)]).optional(),
    })
    .refine(
      (data) =>
        (data.name && data.name.trim() !== "") ||
        (data.permissions && data.permissions.length > 0),
      {
        error: "Empty update is not allowed",
      }
    ),
};

const remove = {
  params: z.object({
    id: z.string(),
  }),
};
module.exports = {
  create,
  update,
  remove,
};
