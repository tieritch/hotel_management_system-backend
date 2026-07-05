/*const { firstname, lastname, hiredDate, phoneNumber, positionId } =
req.validatedData;
// const {email, userId}
*/

const { z } = require("zod");
const { position } = require("../../prismaClient");

const create = {
  body: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.union([z.literal(""), z.email({ error: "Invalid email" })]))
      .optional(),

    firstname: z
      .string()
      .trim()
      .pipe(
        z
          .string({ error: "first name must be a string" })
          .min(1, "first name required")
      ),
    lastname: z
      .string()
      .trim()
      .pipe(
        z
          .string({ error: "last name must be a string" })
          .min(1, "last name required")
      ),

    hireDate: z
      .union([z.literal(""), z.coerce.date({ error: "invalid date format" })])
      .optional(),

    phoneNumber: z
      .string({ error: "Phone number must be a string" })
      .min(1, "Phone number required"),

    positionId: z.coerce
      .number({ error: "Position Id must be a valid number" })
      .int({ error: "Position id must be a valid integer" })
      .positive({ error: "Position ID must be a positive integer" }),

    userId: z
      .union([
        z.literal(""),
        z
          .string({ error: "user ID must be a string" })
          .min(1, "user ID required"),
      ])
      .optional(),
  }),
};

let update = {
  params: z.object({
    id: z
      .string({ error: "Employee ID must be a string" })
      .min(1, { message: "Employee Id required" }),
  }),

  body: z
    .object({
      email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.union([z.literal(""), z.email({ error: "Invalid email" })]))
        .optional(),

      // Ajout de .optional() car on ne modifie pas forcément le prénom à chaque update
      firstname: z
        .string()
        .trim()
        .pipe(z.string().min(1, { message: "first name required" }))
        .optional(),

      lastname: z
        .string()
        .trim()
        .pipe(z.string().min(1, { message: "last name required" }))
        .optional(),

      hireDate: z.coerce.date({ error: "invalid date format" }),

      phoneNumber: z
        .string({ error: "Phone number must be a string" })
        .min(1, { message: "Phone number required" })
        .optional(),

      positionId: z.coerce
        .number({ error: "Position Id must be a valid number" })
        .int({ error: "Position id must be a valid integer" })
        .positive({ error: "Position ID must be a positive integer" })
        .optional(),

      userId: z
        .union([
          z.literal(""),
          z
            .string({ error: "user ID must be a string" })
            .min(1, { message: "user ID required" }),
        ])
        .optional(),
    })
    .refine(
      (data) => {
        //const { updateFields } = data;
        //console.log("____________data:", updateFields);
        return Object.values(data).some((field) => field !== undefined);
      },
      { error: "At least one field must be provided", path: ["body"] }
    ),
};

const remove = {
  params: z.object({
    id: z
      .string({ error: "Employee ID must be a string" })
      .min(1, " Employee ID required "),
  }),
};

module.exports = { create, update, remove };
