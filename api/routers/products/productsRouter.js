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
