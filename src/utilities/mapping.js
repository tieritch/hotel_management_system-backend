/**
 * Mappe les données du body vers la DB.
 * Si fieldMapping n'est pas fourni, les clés Zod et DB sont considérées comme identiques.
 */

function mapZodToDb(bodyData, fieldMapping = null) {
  const updateData = {};

  // Si aucun mapping n'est fourni, on crée un mapping automatique clé -> clé
  const actualMapping =
    fieldMapping ||
    Object.keys(bodyData).reduce((acc, key) => {
      acc[key] = key;
      return acc;
    }, {});

  for (const [zodKey, dbKey] of Object.entries(actualMapping)) {
    if (bodyData[zodKey] !== undefined) {
      updateData[dbKey] = bodyData[zodKey] === "" ? null : bodyData[zodKey];
    }
  }

  return updateData;
}

module.exports = { mapZodToDb };
