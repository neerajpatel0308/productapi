const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  validateCreateProduct,
  validateProduct,
  validateObjectId,
  validateProductQuery,
} = require("../validators/product.validator");

const router = express.Router();

router.use(protect);

router.get("/", validateProductQuery, getProducts);
router.get("/:id", validateObjectId, getProduct);

router.post("/", validateCreateProduct, createProduct);
router.put("/:id", validateObjectId, validateProduct, updateProduct);
router.delete("/:id", validateObjectId, deleteProduct);

module.exports = router;
