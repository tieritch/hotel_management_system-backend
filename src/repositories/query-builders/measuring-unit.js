function buildInclude(include) {
  const includes = {
    menuItems: {
      menuItems: true,
    },
  };
  return includes[include];
}

module.exports = { buildInclude };
