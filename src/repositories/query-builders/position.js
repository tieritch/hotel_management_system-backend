function buildInclude(include) {
  const includes = {
    employees: {
      employees: true,
    },
  };

  return includes[include];
}

function buildSelect(select) {
  return undefined;
}

function buildOrderBy(sort) {
  return undefined;
}

module.exports = {
  buildInclude,
  buildSelect,
  buildOrderBy,
};
