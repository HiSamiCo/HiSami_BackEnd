const db = require("../../data/db-config")

const getUserCart = (user_id) => {

}

const addCart = (cart) => {
    return db("users_cart_products").insert(cart, [
        "cart_item_id",
        "user_id",
        "product_id",
        "quantity"
    ]).then(([item]) => item)
}

module.exports = {
    addCart,
    getUserCart
}