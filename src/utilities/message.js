function errorMsg(category, success, message, data) {
  return {
    category,
    success,
    message,
    ...(data && typeof data == "object" ? data : {}),
  };
}

module.exports = { errorMsg };
