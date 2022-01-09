const yup = require("yup");

const productSchema = yup.object().shape({
  name: yup.string(),
  quantity: yup.number(),
  details: yup.string(),
  price: yup.number(),
  category_id: yup.number(),
  image: yup.string(),
});

module.exports = productSchema;
