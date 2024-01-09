import express from 'express'
import path from 'path';
import cors from 'cors';
const __dirname = path.resolve();
import "dotenv/config"

import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_SERVER_KEY);



const app = express()
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);


app.post("/api/v1/payment", async (req, res, next) => {

    const { products } = req.body;
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.image],
                description: product.description,
            },
            unit_amount: product.price * 280, // multiply by the currency ration you want
        },
        quantity: product.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success", // your success url when your transaction success
        cancel_url: "http://localhost:5173/cancel", // your failure url when your transaction failed
    })

    res.send({
        id: session.id,
    })

})

app.use(express.static(path.join(__dirname, '/web/dist')))
app.use("*", express.static(path.join(__dirname, '/web/dist')))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})