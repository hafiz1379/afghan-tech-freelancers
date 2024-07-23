/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Stripe from 'stripe';
import createError from '../utils/createError.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';

export const intent = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  // Create a PaymentIntent with amount and currency
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (req, res, next) => {
  try {
    let query;
    if (req.isSeller) {
      query = { sellerId: req.userId };
    } else {
      query = { buyerId: req.userId };
    }

    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      },
    );

    if (!order) {
      throw createError(404, 'Order not found');
    }

    res.status(200).send('Order confirmed!');
  } catch (err) {
    next(err);
  }
};

export const createOnCashOrder = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      isCompleted: true,
      payment_intent: 'on-cash',
    });

    await newOrder.save();

    res.status(200).send({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong. Please try again.' });
  }
};
