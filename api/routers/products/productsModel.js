const db = require("../../data/db-config.js");

const addCategory = (categ) => {
  return db("product_categories")
    .insert(categ, [
      "category_name", 
      "category_id"
    ]).then(([category]) => category)
};

const getProducts = () => {
  return db("products as p")
    .join("product_categories as p_c", "p.category_id", "p_c.category_id")
    .select("p.*", "p_c.name as category");
};

const getCategories = async () => {
  const response = await db("product_categories as c")
    .leftJoin("products as p", "c.category_id", "p.category_id")
    .select("c.*", "p.*", "c.category_id");


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

  const result = categories.map((category) => ({
    category_id: category.category_id,
    category_name: category.category_name,
    products: category.product_id
      ? response
          .filter((p) => p.product_id && p.category_name === category.category_name)
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

const getProductCategories = () => {
  return db("product_categories");
};

const getAllCategoryProducts = async () => {
  const products = await getCategories();
  // // get array of all categories
  // const categories = products.reduce((list, product) => {
  //   return list.includes(product.category) ? list : [...list, product.category];
  // }, []);
  // // create object with key equal to category and value of products in that category
  // const categoryProducts = categories.reduce((object, category) => {
  //   object[category] = products.filter((p) => p.category === category);
  //   return object;
  // }, {});
  return products;
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

module.exports = {
  addCategory,
  updateCategory,
  addProduct,
  updateProduct,
  getCategories,
  getProductCategories,
  getProductCategoryByName,
  getProducts,
  getAllCategoryProducts,
  getProductById,
};
