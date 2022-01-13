const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



router.post("/payment", async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "HISAMICO",
            payment_method: id,
            confirm: true
        });
        res.send({
            clientSecret: payment.client_secret
        })
        res.json({
            message: "Payment Successful",
            success: true,
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment Failed",
            success: false,
        })
    }
});
