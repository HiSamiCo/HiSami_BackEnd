const yup = require("yup")

const cartSchema = yup.object().shape({
    quantity: yup.number().required(),
    product_id: yup.number().required(),
})

module.exports = cartSchema