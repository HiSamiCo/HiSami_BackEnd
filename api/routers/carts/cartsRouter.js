const router = require("express").Router()
const Carts = require("./cartsModel")
const MW = require("./cartsMW")
// const Products = require("../products/productsModel")

router.get("/", (req, res, next) => {

})

// const product = await Products.getProductById(body.product_id)
// const stock =  product.stock - body.quantity
// await Products.updateProduct(body.product_id, { ...product, stock })
router.post("/create", MW.validateCartPayload, async (req, res, next) => {
    try {
        const { body, sentUser } = req
        const { subject: user_id } = sentUser
        const cart = { ...body, user_id }
        const createdCart = await Carts.addCart(cart)
        res.status(201).json(createdCart)
    } catch(err) {
        next(err)
    }
})

router.put("/update",  (req, res, next) => {

})

module.exports = router