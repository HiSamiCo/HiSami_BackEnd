const router = require("express").Router();
const userMW = require("../users/usersMW.js");
const Products = require("./productsModel");
const MW = require("./productsMW.js");

router.get("/category", async (req, res, next) => {
  try {
    const categories = await Products.getProductCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await Products.getProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});
router.post(
  "/create/products",
  userMW.isAuthorized,
  userMW.isAdmin,
  MW.validateProductPayload,
  async (req, res, next) => {
    try {
      const createdProduct = await Products.addProduct(req.body);
      res.status(201).json(createdProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/category/products", async (req, res, next) => {
  try {
    const categoryProducts = await Products.getAllCategoryProducts();
    res.status(200).json(categoryProducts);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/category",
  userMW.isAuthorized,
  userMW.isAdmin,
  MW.categoryUnique,
  async (req, res, next) => {
    try {
      const addedCateg = await Products.addCategory(req.body);
      res.status(201).json(addedCateg);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
