const Products = require("./productsModel.js");

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

module.exports = {
  categoryUnique,
};
