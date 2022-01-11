const Carts = require("./cartsModel")
const cartSchema = require("../../schemas/cart")

const validateCartPayload = async (req, res, next) => {
    try {
        const { body } = req
        await cartSchema.validate(body)
        next()
    } catch (err) {
        next(err)
    }
}

const cartItemExists = async (req, res, next) => {
    try {
        const { cart_item_id } = req.params
        const { subject: user_id } = req.sentUser
        const [cartItem] = await Carts.getCartItemBy({ cart_item_id, user_id })
        if(cartItem) {
            next()
        } else {
            next({ message: "cart item does not exist", status: 400 })
        }   
    } catch(err) {
        next(err)
    }
}

module.exports = {
    validateCartPayload,
    cartItemExists
}