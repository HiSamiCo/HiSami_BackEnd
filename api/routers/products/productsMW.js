const Products = require("./productsModel.js");
const productSchema = require("../../schemas/product");

const categoryUnique = async (req, res, next) => {
  try {
    const existingCategory = await Products.getProductCategoryByName(req.body);
    if (existingCategory) {
      next({ message: "that name already exists", status: 400 });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateProductPayload = (req, res, next) => {
  try {
    const { body } = req.body;
    productSchema.validate(body);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  categoryUnique,
  validateProductPayload,
};
