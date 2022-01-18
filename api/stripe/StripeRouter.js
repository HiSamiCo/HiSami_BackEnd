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
      success_url: "",
      cancel_url: "",
      mode: "payment", 
      shipping_address_collection: {
        allowed_countries: "US"
      },
      confirm: true,
    });
    
    res.redirect(session.url)
  } catch (error) {
    next(error)
  }
  // const { userCart } = req;
  // const { subject } = req.sentUser;
  // try {
  //   for (const product of userCart) {
  //     console.log(product);
  //     const { product_id, newStock } = product;
  //     await Products.updateProduct(product_id, { stock: newStock });
  //   }
  //   const removedCart = await Carts.removeUserCart(subject);
  //   res.status(200).json(removedCart);
  //   // next();
  // } catch (err) {
  //   next(err);
  // }
});

module.exports = router;
