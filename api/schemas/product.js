const yup = require("yup");

const productSchema = yup.object().shape({
  name: yup.string().trim().required(),
  quantity: yup.number().required().min(0),
  details: yup.string().trim(),
  price: yup.number().required().min(0),
  category_id: yup.number().required(),
  image: yup.string().trim().required(),
});

module.exports = productSchema;
