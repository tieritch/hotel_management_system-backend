// repositories/model-fields.js

const { Prisma } = require("@prisma/client");

function getModelFields(model) {
  /*const modelName = model.name;

  /*return Prisma.dmmf.datamodel.models
    .find((m) => m.name === modelName)
    .fields.map((f) => f.name);*/
  //return Object.keys(model.$parent._runtimeDataModel.models[modelName].fields);
  const modelName = model.name;

  return model.$parent._runtimeDataModel.models[modelName].fields.map(
    (field) => field.name
  );
}

module.exports = { getModelFields };
