const { measuringUnit } = require("../../../prismaClient");

function buildInclude(include) {
  const includes = {
    measureUnit: {
      measuringUnit: true,
    },
    stockMovements: {
      stockMovements: true,
    },
    purchaseItems: {
      purchaseItems: true,
    },
  };
  return includes[include];
}

module.exports = { buildInclude };
