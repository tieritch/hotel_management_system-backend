const { Prisma } = require("@prisma/client");

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
        const constraintName = match[1]; // Exemple: "employees_email_key"

        // On nettoie le nom de la table et le suffixe '_key'
        const cleanStr = constraintName
          .replace(`${modelName.toLowerCase()}s_`, "") // Supprime "employees_" (avec un s si pluriel)
          .replace(`${modelName.toLowerCase()}_`, "") // Supprime "employee_"
          .replace("_key", ""); // Supprime "_key"

        targetFields = [cleanStr]; // Résultat: ["email"]
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

    // Nettoyage final des guillemets
    targetFields = targetFields.map((field) =>
      String(field).replace(/"/g, "").trim()
    );

    // 3. Construction dynamique du message basé sur le body
    if (targetFields.length > 0 && targetFields[0] !== "") {
      const reqBody = res.req?.body || {};
      const fieldsInPayload = Object.keys(reqBody).map((k) => k.toLowerCase());

      const dynamicFields = targetFields.filter((field) =>
        fieldsInPayload.includes(field.toLowerCase())
      );

      if (dynamicFields.length > 0) {
        conflictMessage = `The field '${dynamicFields.join(", ")}' is already taken by another ${modelName}`;
      } else {
        conflictMessage = `The field '${targetFields.join(", ")}' triggers a unique constraint conflict`;
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
