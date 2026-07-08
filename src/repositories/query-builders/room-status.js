function buildInclude(include) {
  const includes = {
    rooms: {
      rooms: true,
    },
  };
  return includes[include];
}

module.exports = { buildInclude };
