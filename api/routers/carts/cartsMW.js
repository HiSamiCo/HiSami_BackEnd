const Carts = require("./cartsModel");
const cartSchema = require("../../schemas/cart");
const Products = require("../products/productsModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const validateCartPayload = async (req, res, next) => {
  try {
    const { body } = req;
    await cartSchema.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};

const cartItemExists = async (req, res, next) => {
  try {
    const { cart_item_id } = req.params;
    const { subject: user_id } = req.sentUser;
    const [cartItem] = await Carts.getCartItemBy({ cart_item_id, user_id });
    if (cartItem) {
      next();
    } else {
      next({ message: "This item is not in cart", status: 400 });
    }
  } catch (err) {
    next(err);
  }
};

const validateUserCart = async (req, res, next) => {
  try {
    const { subject: user_id } = req.sentUser;
    const userCart = await Carts.getUserCart(user_id);
    const errors = [];
    for (let i = 0; i < userCart.length; i++) {
      const item = userCart[i];
      const product = await Products.getProductById(item.product_id);
      const stock = product.stock - item.quantity;
      userCart[i] = { ...item, newStock: stock };
      if (stock < 0) {
        await Carts.removeCartItem(item.cart_item_id);
        errors.push({
          status: 400,
          message: `Sorry we are out of ${product.product_name}, this has been removed from your cart.`,
        });
      }
    }
    if (errors.length > 0) {
      next(errors[0]);
    } else {
      req.userCart = userCart;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const makePayment = async (req, res, next) => {
  const { stripe_id } = req.params;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: 0,
      currency: "USD",
      description: "HISAMICO",
      payment_method: stripe_id,
      confirm: true,
    });
    res.send({
      clientSecret: payment.client_secret,
    });
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};

module.exports = {
  validateCartPayload,
  cartItemExists,
  validateUserCart,
  makePayment,
};
