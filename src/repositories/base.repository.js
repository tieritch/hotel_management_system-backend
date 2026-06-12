function modelRepository(model) {
  return {
    findAll() {
      return model.findMany();
    },

    findBy(where) {
      return model.findFirst({ where });
    },

    findUnique(where) {
      return model.findUnique({ where });
    },
    findById(id) {
      return model.findUnique({
        where: { id },
      });
    },

    async create(data) {
      return model.create({
        data,
      });
    },
  };
}

module.exports = modelRepository;
