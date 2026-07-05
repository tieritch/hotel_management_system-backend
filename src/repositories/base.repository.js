//const prisma = require("../../prismaClient");
const { Prisma } = require("@prisma/client");

const { getModelFields } = require("./model-metadata");

function modelRepository(model, buildInclude = () => undefined) {
  const allowedFields = getModelFields(model);

  function buildWhere(query = {}) {
    return Object.fromEntries(
      Object.entries(query)
        .map(([key, value]) => {
          if (typeof value === "string") {
            const v = value.trim().toLowerCase();

            if (v === "true") return [key, true];
            if (v === "false") return [key, false];
          }

          return [key, value];
        })
        .filter(([key]) => allowedFields.includes(key))
    );
  }

  return {
    findAll(filters = {}, include) {
      return model.findMany({
        where: buildWhere(filters),
        include: buildInclude(include),
      });
    },

    /*findBy(where) {
      return model.findMany({ where });
    },

    findUnique(where, include) {
      return model.findUnique({
        where,
        include: buildInclude(include),
      });
    },*/

    findById(id, include) {
      return model.findUnique({
        where: { id },
        include: buildInclude(include),
      });
    },

    create(data) {
      return model.create({ data });
    },

    createMany(data) {
      return model.createMany({ data });
    },

    removeById(id) {
      return model.delete({
        where: { id },
      });
    },

    removeBy(where) {
      return model.deleteMany({
        where,
      });
    },

    update(data, where) {
      return model.updateMany({
        where,
        data,
      });
    },

    updateById(data, id) {
      return model.update({
        where: { id },
        data,
      });
    },
  };
}

module.exports = modelRepository;
