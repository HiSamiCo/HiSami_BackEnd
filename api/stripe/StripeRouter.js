const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment/:stripe_id", async (req, res) => {
  const { stripe_id } = req.params;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: 0,
      currency: "USD",
      description: "HISAMICO",
      payment_method: stripe_id,
      confirm: true,
    });
    res.send({
      clientSecret: payment.client_secret,
    });
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});
