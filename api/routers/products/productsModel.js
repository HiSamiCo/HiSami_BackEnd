const db = require("../../data/db-config.js");

const addCategory = (categ) => {
  return db("product_categories").insert(categ, "name");
};

const getProducts = () => {
  return db("products as p")
    .join("product_categories as p_c", "p.category_id", "=", "p_c.category_id")
    .select("p.*", "p_c.name as category");
};

const getProductById = (product_id) => {
  return db("products").where({ product_id }).first()
}

const getProductCategories = () => {
  return db("product_categories");
};

const getAllCategoryProducts = async () => {
  const products = await getProducts();
  // get array of all categories
  const categories = products.reduce((list, product) => {
    return list.includes(product.category) ? list : [...list, product.category];
  }, []);
  // create object with key equal to category and value of products in that category
  const categoryProducts = categories.reduce((object, category) => {
    object[category] = products.filter((p) => p.category === category);
    return object;
  }, {});
  return categoryProducts;
};

const getProductCategoryByName = (name) => {
  return db("product_categories").where(name).first();
};

const updateCategory = (categ, newCateg) => {
  return db("product_categories").where("category_id", categ).update(newCateg);
};

const addProduct = (prod) => {
  return db("products")
    .insert(prod, [
      "name",
      "stock",
      "details",
      "price",
      "category_id",
      "image",
    ])
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
  getProductCategories,
  getProductCategoryByName,
  getProducts,
  getAllCategoryProducts,
  getProductById
};
