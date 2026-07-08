/*const { firstname, lastname, hiredDate, phoneNumber, positionId } =
req.validatedData;
// const {email, userId}
*/

const { z } = require("zod");

// 1. Schémas de base nettoyés et sécurisés contre les chaînes vides du Front
const emailSch = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z.union([
      z.literal("").transform(() => undefined), // Transforme "" en undefined pour la DB et le refine
      z.email({ error: "Invalid email" }),
    ])
  );

const firstnameSch = z
  .string({ error: "first name must be a string" })
  .trim()
  .min(1, { error: "first name required" });

const lastnameSch = z
  .string({ error: "last name must be a string" })
  .trim()
  .min(1, { error: "last name required" });

const hireDateSch = z.union([
  z.literal("").transform(() => undefined), // Transforme "" en undefined pour éviter le crash Prisma
  z.coerce.date({ error: "invalid date format" }),
]);

const phoneNumberSch = z
  .string({ error: "Phone number must be a string" })
  .min(1, { error: "Phone number required" });

const positionIdSch = z.coerce
  .number({ error: "Position Id must be a valid number" })
  .int({ error: "Position id must be a valid integer" })
  .positive({ error: "Position ID must be a positive integer" });

const userIdSch = z.union([
  z.literal("").transform(() => undefined), // Sécurise l'ID utilisateur optionnel
  z
    .string({ error: "user ID must be a string" })
    .min(1, { error: "user ID required" }),
]);

// 2. Configurations des Schémas d'Endpoints
const create = {
  body: z.object({
    email: emailSch.optional(),
    firstname: firstnameSch,
    lastname: lastnameSch,
    hireDate: hireDateSch.optional(),
    phoneNumber: phoneNumberSch,
    positionId: positionIdSch,
    userId: userIdSch.optional(),
  }),
};

const update = {
  params: z.object({
    id: z
      .string({ error: "Employee ID must be a string" })
      .min(1, { error: "Employee Id required" }),
  }),

  body: z
    .object({
      // 1. Ces schémas gèrent déjà le transform(() => undefined) en haut du fichier
      email: emailSch.optional(),
      hireDate: hireDateSch.optional(),
      userId: userIdSch.optional(),

      // 2. ✅ CORRECTION : On applique l'union ici pour intercepter le "" avant d'appeler le schéma de base
      firstname: z
        .union([z.literal("").transform(() => undefined), firstnameSch])
        .optional(),
      lastname: z
        .union([z.literal("").transform(() => undefined), lastnameSch])
        .optional(),
      phoneNumber: z
        .union([z.literal("").transform(() => undefined), phoneNumberSch])
        .optional(),

      // Fonctionne aussi pour le nombre car le transform s'exécute AVANT le coerce.number
      positionId: z
        .union([z.literal("").transform(() => undefined), positionIdSch])
        .optional(),
    })
    .refine(
      (data) => {
        // Désormais, absolument TOUTES les chaînes vides "" de TOUS les champs
        // sont converties en undefined. Le .refine est 100% fiable !
        return Object.values(data).some((field) => field !== undefined);
      },
      { error: "At least one field must be provided", path: ["body"] }
    ),
};

const remove = {
  params: z.object({
    id: z
      .string({ error: "Employee ID must be a string" })
      .min(1, { error: "Employee ID required" }),
  }),
};

module.exports = { create, update, remove };
