exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("products").insert([
        {
          product_id: -1,
          name: "Monstera Clay Earings",
          stock: 200,
          details: "",
          price: 20.0,
          category_id: -1,
          image:
            "https://live.staticflickr.com/65535/51561477070_77b09350ba_b.jpg",
        },
        {
          product_id: -2,
          name: "Wildflower Screen Print Clay Earings",
          stock: 100,
          details: "",
          price: 20.0,
          category_id: -1,
          image:
            "https://live.staticflickr.com/65535/51561243964_7c0eb0c4b4_b.jpg",
        },
      ]);
    });
};
