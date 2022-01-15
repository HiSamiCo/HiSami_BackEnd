const Carts = require("./cartsModel");
const cartSchema = require("../../schemas/cart");
const Products = require("../products/productsModel");

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
    const errors = userCart.reduce(async (errs, item, index) => {
      const product = await Products.getProductById(item.product_id);
      const stock = product.stock - item.quantity;
      userCart[index] = { ...item, newStock: stock };
      if (stock < 0) {
        return [
          ...errs,
          {
            status: 400,
            message: `Sorry we are out of ${product.product_name}, please check back later`,
          },
        ];
      } else {
        return errs;
      }
    }, []);
    if (errors.length > 0) {
      next(errors[0]);
    }
    req.userCart = userCart;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateCartPayload,
  cartItemExists,
  validateUserCart,
};
