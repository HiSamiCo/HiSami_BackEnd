const db = require("../../data/db-config.js");

const addCategory = (categ) => {
  return db("product_categories")
    .insert(categ, ["category_name", "category_id"])
    .then(([category]) => category);
};

const getProducts = () => {
  return db("products as p")
    .join("product_categories as p_c", "p.category_id", "p_c.category_id")
    .select("p.*", "p_c.category_name as category");
};

const getProductCategories = async () => {
  // a list of all categories with products attached
  const response = await db("product_categories as c")
    .leftJoin("products as p", "c.category_id", "p.category_id")
    .select("c.*", "p.*", "c.category_id");

  // returns a list of all categories and an array of all products, whether empty or not, associated to that category in the response. For use with creating initial state on first opening of the application
  const categories = response.reduce((list, product) => {
    const exists = list.find(
      (category) => category.category_name === product.category_name
    );

    return exists
      ? list
      : [
          ...list,
          {
            category_id: product.category_id,
            category_name: product.category_name,
            product_id: product.product_id,
          },
        ];
  }, []);

  // a list of all categories with associated products attached
  const result = categories.map((category) => ({
    category_id: category.category_id,
    category_name: category.category_name,
    products: category.product_id
      ? response
          .filter(
            (p) => p.product_id && p.category_name === category.category_name
          )
          .map((prod) => ({
            product_id: prod.product_id,
            product_name: prod.product_name,
            stock: prod.stock,
            details: prod.details,
            price: prod.price,
            image: prod.image,
          }))
      : [],
  }));
  return result;
};

const getProductById = (product_id) => {
  return db("products").where({ product_id }).first();
};

const getCategories = () => {
  return db("product_categories");
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
      "product_name",
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

const deleteProduct = (prod_id) => {
  return db("products").where("product_id", prod_id).del();
};

module.exports = {
  addCategory,
  updateCategory,
  addProduct,
  updateProduct,
  getCategories,
  getProductCategories,
  getProductCategoryByName,
  getProducts,
  getProductById,
  deleteProduct,
};
