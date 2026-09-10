const {
  createProduct: createProductService,
  getProducts: getProductsService,
  getProductById,
  updateProduct: updateProductService,
  deleteProduct: deleteProductService,
} = require("../services/product.service");

const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body, req.user.userId);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.inStock !== undefined) {
      filter.inStock = req.query.inStock === "true";
    }

    const products = await getProductsService(filter);

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const existingProduct = await getProductById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.createdBy._id.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update your own products",
      });
    }

    const allowedFields = ["name", "description", "price", "category", "inStock"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const product = await updateProductService(req.params.id, updateData);

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const existingProduct = await getProductById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (existingProduct.createdBy._id.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own products",
      });
    }

    await deleteProductService(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
