function validate(schemas) {
  return (req, res, next) => {
    const validatedData = {};
    const errors = [];

    for (const [source, sch] of Object.entries(schemas)) {
      const schStrict = typeof sch.strict === "function" ? sch.strict() : sch;
      const result = schStrict.safeParse(req[source]);

      if (!result.success) {
        errors.push(
          ...result.error.issues.map((issue) => ({
            source,
            category: "Invalid",
            message: issue.message,
            path: issue.path,
          }))
        );
      } else {
        validatedData[source] = result.data;
      }
    }

    if (errors.length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    req.validatedData = validatedData;
    next();
  };
}
module.exports = { validate };
