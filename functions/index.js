// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"sk_test_51HOVT8BETI3Lr3vebhl8pyOoqrYaI0nFJHPY6ZkBoodmu8vowpthdhqca0305qjcrsrUVHA9dtuNZ1KiepMut2Wg00J2RBfF1O"
);

// - API

// - App config
const app = express();

// - Middlewares
// app.use(cors());
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('Hello from function'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    // const customer = request.query.customer;

    console.log('Payment request receive for this amount >>> ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        // customer: customer,
        // payment_method_types: ['card'],
    });

    response.status(201).send({ // 201 created
        clientSecret: paymentIntent.client_secret,
    }); 
})

// - Listening command
exports.api = functions.https.onRequest(app);

// Emulated endpoint
// http://localhost:5001/clone-4a1c8/us-central1/api