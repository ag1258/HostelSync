const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: "rzp_test_HA0dblFvRuSZ2X",
  key_secret: "WnueYlnYvG1GD7pVoQZv9OzE"
});

router.post('/orders', async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

router.get('/payment/:paymentId', async (req, res) => {
  try {
    const payment = await razorpay.payments.fetch(req.params.paymentId);
    res.json(payment);
  } catch (error) {
    res.status(500).json("Failed to fetch payment status");
  }
});

module.exports = router;
