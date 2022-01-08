const router = require("express").Router();
const userMW = require("../users/usersMW.js");
const Products = require("./productsModel");

router.get("/category");

router.post(
  "/category",
  userMW.isAuthorized,
  userMW.isAdmin,
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
