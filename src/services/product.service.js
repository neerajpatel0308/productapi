const Product = require("../models/Product");

const createProduct = async (data, userId) => {
  return Product.create({
    ...data,
    createdBy: userId,
  });
};

const getProducts = async (filter = {}) => {
  return Product.find(filter)
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};

const getProductById = async (id) => {
  return Product.findById(id).populate("createdBy", "name email");
};

const updateProduct = async (id, data) => {
  return Product.findByIdAndUpdate(
    id,
    { $set: data },
    {
      new: true,
      runValidators: true,
    },
  ).populate("createdBy", "name email");
};

const deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
