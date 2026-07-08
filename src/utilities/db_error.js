// handleDBError.js

function handleDBError(err, res, modelName) {
  let conflictMessage = `Unique constraint violation in ${modelName}s data`;

  if (err.code === "P2002") {
    let targetFields = [];

    // 1. Capture spécifique pour Prisma 7 + PostgreSQL en français
    const originalMessage =
      err.meta?.driverAdapterError?.cause?.originalMessage;

    if (originalMessage) {
      // Cette regex capture tout ce qui est écrit entre les guillemets « et »
      const match =
        originalMessage.match(/« (.*?) »/) || originalMessage.match(/«(.*?)»/);

      if (match && match[1]) {
        targetFields = [match[1]]; // Exemple: ["rooms_room_number_key"]
      }
    }

    // 2. Fallbacks de secours (au cas où l'environnement change un jour)
    if (targetFields.length === 0) {
      if (err.meta && err.meta.target) {
        targetFields = Array.isArray(err.meta.target)
          ? err.meta.target
          : [err.meta.target];
      } else if (err.meta?.driverAdapterError?.cause?.constraint?.fields) {
        const fields = err.meta.driverAdapterError.cause.constraint.fields;
        targetFields = Array.isArray(fields) ? fields : [fields];
      }
    }

    // 3. Extraction et conversion automatique en camelCase (Ex: "rooms_room_number_key" -> "roomNumber")
    const reqBody = res.req?.body || {};
    const fieldsInPayload = Object.keys(reqBody); // Les vrais champs reçus de l'API (ex: ["roomNumber"])

    targetFields = targetFields.map((field) => {
      const cleanField = String(field).replace(/"/g, "").trim();

      // Enlève le suffixe '_key'
      const withoutKey = cleanField.replace(/_key$/, "");

      // On découpe la contrainte par les underscores
      const parts = withoutKey.split("_");

      // SOLUTION SÛRE : On teste les combinaisons de droite à gauche pour trouver le champ du body
      // Exemple pour "rooms_room_number" :
      // Test 1: "number" ? Non.
      // Test 2: "room_number" -> converti en "roomNumber" ? Oui ! correspond à l'API.
      let currentFieldSnake = "";
      for (let i = parts.length - 1; i >= 0; i--) {
        currentFieldSnake = currentFieldSnake
          ? `${parts[i]}_${currentFieldSnake}`
          : parts[i];

        // Convertit la combinaison actuelle en camelCase
        const currentFieldCamel = currentFieldSnake.replace(/_([a-z])/g, (g) =>
          g[1].toUpperCase()
        );

        // Si cette combinaison existe dans le Body envoyé par l'utilisateur, on a trouvé la colonne !
        const matchInBody = fieldsInPayload.find(
          (p) => p.toLowerCase() === currentFieldCamel.toLowerCase()
        );
        if (matchInBody) {
          return matchInBody; // On retourne directement le nom exact du champ (ex: "roomNumber")
        }
      }

      // Si le champ n'est pas dans le body, on se rabat sur une conversion camelCase du dernier mot par sécurité
      const lastWord = parts[parts.length - 1];
      return lastWord.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    });

    // 4. Construction dynamique du message basé sur le body
    if (targetFields.length > 0 && targetFields[0] !== "") {
      const fieldsInPayloadLower = fieldsInPayload.map((k) => k.toLowerCase());

      const dynamicFields = targetFields.filter((field) =>
        fieldsInPayloadLower.includes(field.toLowerCase())
      );

      if (dynamicFields.length > 0) {
        conflictMessage = `The value '${dynamicFields.join(", ")}' is already taken by another ${modelName}`;
      } else {
        conflictMessage = `The value '${targetFields.join(", ")}' triggers a unique constraint conflict`;
      }
    }
  }

  const map = {
    P2002: {
      status: 409,
      category: "Existence Conflict",
      message: conflictMessage,
    },
    P2025: {
      status: 404,
      category: "Not Found",
      message: `${modelName} does not exist`,
    },
    P2003: {
      status: 409,
      category: "Reference Conflict",
      message: `${modelName} references a non-existing or protected record`,
    },
  };

  const dbError = map[err.code];

  if (!dbError) {
    return res.status(500).json({
      success: false,
      category: "Internal Server Error",
      message: err.message,
    });
  }

  return res.status(dbError.status).json({
    success: false,
    category: dbError.category,
    message: dbError.message,
  });
}

module.exports = { handleDBError };
