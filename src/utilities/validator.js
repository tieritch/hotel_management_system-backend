function refineValidator() {
  return (data) => {
    return Object.values(data).some((field) => field != undefined);
  };
}

const refineErrorMsg = {
  error: "At least one field must be provided",
  path: ["body"],
};

module.exports = { refineValidator, refineErrorMsg };
