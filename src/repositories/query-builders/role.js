function buildInclude(include) {
  const includes = {
    permissions: {
      rolePermissions: {
        include: {
          permission: {
            include: {
              action: true,
              resource: true,
            },
          },
        },
      },
    },

    users: {
      userRoles: {
        include: {
          user: true,
        },
      },
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
