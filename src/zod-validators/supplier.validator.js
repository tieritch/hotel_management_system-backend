const { z } = require("zod");

const { refineValidator, refineErrorMsg } = require("../utilities");
/**id               String      @id @default(uuid())
  firstname        String
  lastname         String?
  address          String?
  phoneNumber      String      @unique @map("phone_number")
  email            String?     @unique */

const idSch = z.union([
  z.literal("").transform(() => undefined),
  z
    .string({ error: "supplier ID must be a string" })
    .min(1, " supplier ID can't be empty"),
]);

const firstnameSch = z
  .string({ error: "First name must be a string" })
  .trim()
  .min(1, { error: "First name can't be empty" });

const lastnameSch = z
  .union([
    z.literal("").transform(() => undefined),
    z.string({ error: "Last name must be a string" }).trim(),
  ])
  .optional();

const addressSch = z
  .union([
    z.literal("").transform(() => undefined),
    z.string({ error: "address must be a string" }).trim(),
  ])
  .optional();

const phoneNumberSch = z
  .string({
    error: " phone number must be a valid string",
  })
  .min(1, "Phone number can't be empty");

const emailSch = z
  .union([
    z.literal("").transform(() => undefined),
    z.email({ error: "Invalid email" }).trim().toLowerCase(),
  ])
  .optional();

const create = {
  body: z.object({
    firstname: firstnameSch,
    lastname: lastnameSch,
    address: addressSch,
    phoneNumber: phoneNumberSch,
    email: emailSch,
  }),
};

const update = {
  params: z.object({
    id: idSch,
  }),
  body: z
    .object({
      firstname: z
        .union([z.literal("").transform(() => undefined), firstnameSch])
        .optional(),
      lastname: lastnameSch,
      address: addressSch,
      phoneNumber: z
        .union([z.literal("").transform(() => undefined), phoneNumberSch])
        .optional(),
      email: emailSch,
    })
    .refine(refineValidator(), refineErrorMsg),
};

const remove = {
  params: z.object({ id: idSch }),
};

module.exports = { create, update, remove };
