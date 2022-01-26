const db = require("../../data/db-config");

const getUserCart = (user_id) => {
  return db("users_cart_products as u_c_p")
    .where({ user_id })
    .join("products as p", "u_c_p.product_id", "p.product_id")
    .select("p.product_name", "p.image", "p.price", "u_c_p.*");
};

const addCart = (cart) => {
  return db("users_cart_products")
    .insert(cart, ["cart_item_id", "user_id", "product_id", "quantity"])
    .then(([item]) => item);
};

const getCartItemBy = (cart) => db("users_cart_products").where(cart);

const removeUserCart = (user_id) =>
  getCartItemBy({ user_id }).del().returning("*");

const updateCartItem = (cart_item_id, cart) => {
  return getCartItemBy({ cart_item_id }).update(cart).returning("*");
};

const removeCartItem = (cart_item_id) => {
  return getCartItemBy({ cart_item_id }).del().returning("*");
};

module.exports = {
  addCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  getCartItemBy,
  removeUserCart,
};
