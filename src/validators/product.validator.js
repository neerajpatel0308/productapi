const mongoose = require("mongoose");

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    errors.push("Name must be a non-empty string");
  }

  if (description !== undefined && (typeof description !== "string" || !description.trim())) {
    errors.push("Description must be a non-empty string");
  }

  if (price !== undefined && (typeof price !== "number" || Number.isNaN(price) || price < 0)) {
    errors.push("Price must be a number greater than or equal to 0");
  }

  if (category !== undefined && (typeof category !== "string" || !category.trim())) {
    errors.push("Category must be a non-empty string");
  }

  if (inStock !== undefined && typeof inStock !== "boolean") {
    errors.push("inStock must be true or false");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

const validateCreateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required");
  }
  if (!description || typeof description !== "string" || !description.trim()) {
    errors.push("Description is required");
  }
  if (price === undefined || typeof price !== "number" || Number.isNaN(price) || price < 0) {
    errors.push("Price must be a number greater than or equal to 0");
  }
  if (!category || typeof category !== "string" || !category.trim()) {
    errors.push("Category is required");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  next();
};

const validateProductQuery = (req, res, next) => {
  const { inStock } = req.query;

  if (inStock !== undefined && inStock !== "true" && inStock !== "false") {
    return res.status(400).json({
      message: "Validation failed",
      errors: ["inStock query must be true or false"],
    });
  }

  next();
};

module.exports = {
  validateProduct,
  validateCreateProduct,
  validateObjectId,
  validateProductQuery,
};
