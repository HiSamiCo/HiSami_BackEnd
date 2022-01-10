const router = require("express").Router()
const Carts = require("./cartsModel")
const MW = require("./cartsMW")
// const Products = require("../products/productsModel")

router.get("/", async (req, res, next) => {
    try {
        const cart = await Carts.getUserCart(req.sentUser.subject)
        res.status(200).json(cart) 
    } catch(err) {
        next(err)
    }
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

router.put("/update", async (req, res, next) => {
 try {
    const { cart_item_id, quantity } = req.body
    const updatedCart = await Carts.updateCart(cart_item_id, { quantity })
    res.status().json(updatedCart)
 } catch(err) {
     next(err)
 }
})

router.delete("/", (req, res, next) => {

})

module.exports = router