const router = require("express").Router();
const Carts = require("./cartsModel");
const MW = require("./cartsMW");

router.get("/", async (req, res, next) => {
  try {
    const cart = await Carts.getUserCart(req.sentUser.subject);
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/create", MW.validateCartPayload, async (req, res, next) => {
  try {
    const { body, sentUser } = req;
    const { subject: user_id } = sentUser;
    const cart = { ...body, user_id };
    const createdCart = await Carts.addCart(cart);
    res.status(201).json(createdCart);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/update/:cart_item_id",
  MW.cartItemExists,
  async (req, res, next) => {
    try {
      const { body } = req;
      const { cart_item_id } = req.params;
      const updatedCart = await Carts.updateCartItem(cart_item_id, body);
      res.status(200).json(updatedCart);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/delete/:cart_item_id",
  MW.cartItemExists,
  async (req, res, next) => {
    try {
      const { cart_item_id } = req.params;
      const removedCart = await Carts.removeCartItem(cart_item_id);
      res.status(200).json(removedCart);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
