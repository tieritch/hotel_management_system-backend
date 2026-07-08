const { z } = require("zod");

const idSch = z.union([
  z.literal("").transform(() => undefined),
  z
    .string({ error: "room ID must be a string" })
    .min(1, " room ID can't be empty"),
]);

const roomTypeIdSch = z.coerce
  .number({ error: "room type ID must be a valid number" })
  .int({ error: "room type ID must be a valid integer" })
  .positive({ error: " room type ID must be a potive number" });

const roomNumberSch = z.coerce
  .number({ error: "room number must be a valid number" })
  .int({ error: "room number must be a valid integer" })
  .positive({ error: " room number must be a potive number" });

/*const roomNameSch = z
  .string({ error: "room name must be a valid string" })
  .trim()
  .min(1, "room name is required");*/

const roomStatusIdSch = z.union([
  z.literal("").transform(() => undefined),
  z.coerce
    .number({ error: "room status ID must be a valid number" })
    .int({ error: "room status ID must be a valid integer" })
    .positive({ error: " room status ID must be a potive number" }),
]);

const create = {
  body: z.object({
    roomTypeId: roomTypeIdSch,
    roomNumber: roomNumberSch,

    //roomName: roomNameSch,
  }),
};

const update = {
  params: z.object({
    id: idSch,
  }),

  body: z
    .object({
      roomTypeId: z
        .union([z.literal("").transform(() => undefined), roomTypeIdSch])
        .optional(),
      roomNumber: z
        .union([z.literal("").transform(() => undefined), roomNumberSch])
        .optional(),
      roomStatusId: roomStatusIdSch.optional(),
    })
    .refine(
      (data) => {
        return Object.values(data).some((field) => field != undefined);
      },
      { error: "At least one field must be provided", path: ["body"] }
    ),
};

const remove = {
  params: z.object({ id: idSch }),
};

module.exports = {
  create,
  update,
  remove,
};
