const router = require("express").Router();
const userMW = require("../users/usersMW.js");
const Products = require("./productsModel");
const MW = require("./productsMW.js");

// router.get("/category");

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
