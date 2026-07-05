function buildInclude(include) {
  const includes = {
    roles: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },

    "roles.permissions": {
      userRoles: {
        include: {
          role: {
            include: {
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
          },
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
