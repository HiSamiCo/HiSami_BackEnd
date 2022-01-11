exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product_categories").insert([
        { category_id: -1, category_name: "Accessories" },
        { category_id: -2, category_name: "Stickers" },
        { category_id: -3, category_name: "Home Decor" },
      ]);
    });
};
