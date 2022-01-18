const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment/", async (req, res, next) => {
  const { userCart } = req 
  const line_items = userCart.map(item => ({
    quantity: item.quantity,
    product_data: {
      name: item.product_name,
      images: item.image
    },
    price_data: {
      currecy: "USD",
      unit_amount: item.price * 100 
    }
  }))
  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      success_url: "facebook.com",
      cancel_url: "twitter.com",
      mode: "payment", 
      shipping_address_collection: {
        allowed_countries: "US"
      }
    });
    
    res.redirect(session.url)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
