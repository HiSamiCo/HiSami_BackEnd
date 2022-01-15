exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users_cart_products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users_cart_products").insert([
        { cart_item_id: -1, user_id: -1, product_id: -1, quantity: 1000 },
        { cart_item_id: -2, user_id: -1, product_id: -2, quantity: 1 },
      ]);
    });
};
