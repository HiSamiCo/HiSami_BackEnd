const router = require("express").Router();
const userMW = require("../users/usersMW.js");
const Products = require("./productsModel");
const MW = require("./productsMW.js");

// gets a list of all product categories
router.get("/category", async (req, res, next) => {
  try {
    const categories = await Products.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

// get a list of all products
router.get("/products", async (req, res, next) => {
  try {
    const products = await Products.getProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

// creates a product
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

// gets all products with associated products attached
router.get("/category/products", async (req, res, next) => {
  try {
    const categoryProducts = await Products.getProductCategories();
    res.status(200).json(categoryProducts);
  } catch (err) {
    next(err);
  }
});

// adds a new category
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

router.delete(
  "/delete/:product_id",
  userMW.isAuthorized,
  userMW.isAdmin,
  async (req, res, next) => {
    try {
      const deletedProduct = await Products.deleteProduct(
        req.params.product_id
      );
      res.status(200).json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
