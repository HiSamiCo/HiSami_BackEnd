const db = require("../../data/db-config")

const getUserCart = (user_id) => {
    return db("users_cart_products as u_c_p")
        .where({ user_id })
        .join("products as p", "u_c_p.product_id", "=", "p.product_id")
        .select("p.name", "p.image", "p.image", "u_c_p.*")
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