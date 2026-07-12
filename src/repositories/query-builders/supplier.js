function buildInclude(include) {
  const includes = {
    purchaseOrders: true,
  };
  return includes[include];
}
