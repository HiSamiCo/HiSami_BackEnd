exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product_categories").insert([
        { category_id: -1, name: "Accessories" },
        { category_id: -2, name: "Stickers" },
        { category_id: -3, name: "Home Decor" },
      ]);
    });
};
