function buildInclude(include) {
  const includes = {
    bookings: {
      bookings: true,
    },
    roomCleaning: {
      roomCleaning: true,
    },
    stays: {
      stays: true,
    },
    roomType: {
      roomType: true,
    },
    roomStatus: {
      roomStatus: true,
    },
  };

  return includes[include];
}

module.exports = { buildInclude };
