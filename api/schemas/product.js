const yup = require("yup");

const productSchema = yup.object().shape({
  product_name: yup.string().trim().required(),
  stock: yup.number().required().min(0),
  details: yup.string().trim(),
  price: yup.number().required().min(0),
  category_id: yup.number().required(),
  image: yup.string().trim().required(),
});

module.exports = productSchema;
