const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorHandler;
