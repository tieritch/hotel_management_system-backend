const { z } = require("zod");
const { refineValidator, refineErrorMsg } = require("../utilities");
// 1. Schéma réutilisable pour les IDs
const idSch = z.coerce
  .number({ error: "Room type ID must be a valid number" })
  .int({ error: "Room type ID must be a valid integer" })
  .positive({ error: "Room type ID must be a valid positive integer" });

// 2. Schémas de base pour la création (Champs stricts et obligatoires)
const nameSch = z
  .string({ error: "Room type name must be a string" })
  .trim()
  .min(1, { error: "Room type name required" });

const descSch = z
  .string({ error: "Room type description must be a string" })
  .trim()
  .min(1, { error: "Room type description required" });

const priceSch = z.coerce
  .number({ error: "Room price must be a valid number" })
  .int({ error: "Room price must be a valid integer" })
  .positive({ error: "Room price must be a valid positive integer" });

// 3. Configurations des Schémas d'Endpoints
const idInt = {
  params: z.object({
    id: idSch,
  }),
};

const create = {
  body: z.object({
    name: nameSch,
    description: descSch,
    basePrice: priceSch,
  }),
};

const update = {
  params: z.object({
    id: idSch,
  }),

  body: z
    .object({
      // ✅ LOGIQUE HARMONISÉE : Tout "" devient undefined pour le texte ET le numérique
      name: z
        .union([z.literal("").transform(() => undefined), nameSch])
        .optional(),
      description: z
        .union([z.literal("").transform(() => undefined), descSch])
        .optional(),
      basePrice: z
        .union([z.literal("").transform(() => undefined), priceSch])
        .optional(),
    })
    .refine(refineValidator(), refineErrorMsg),
};

const remove = {
  params: z.object({
    id: idSch,
  }),
};

module.exports = { idInt, create, update, remove };
