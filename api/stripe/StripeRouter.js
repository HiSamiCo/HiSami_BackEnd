const router = require("express").Router();
const Products = require("../routers/products/productsModel");
const Carts = require("../routers/carts/cartsModel");

router.post("/payment/:stripe_id", async (req, res, next) => {
  const { userCart } = req;
  const { subject } = req.sentUser;
  try {
    for (const product of userCart) {
      console.log(product);
      const { product_id, newStock } = product;
      await Products.updateProduct(product_id, { stock: newStock });
    }
    const removedCart = await Carts.removeUserCart(subject);
    res.status(200).json(removedCart);
    // next();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
