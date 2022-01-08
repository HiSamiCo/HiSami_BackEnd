const db = require("../../data/db-config.js");

const addCategory = (categ) => {
  return db("product_categories").insert(categ, "name");
};

const updateCategory = (categ, newCateg) => {
  return db("product_categories").where("category_id", categ).update(newCateg);
};

const addProduct = (prod) => {
  return db("products")
    .insert(prod, ["name", "quantity", "details", "price", "category", "image"])
    .then(([product]) => product);
};

const updateProduct = (prod_id, newProd) => {
  return db("products").where("product_id", prod_id).update(newProd);
};

module.exports = {
  addCategory,
  updateCategory,
  addProduct,
  updateProduct,
};
