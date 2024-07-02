import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: "temporary",
  });

    await newOrder.save();
    res.status(200).send("Successful");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    let query;
    if (req.isSeller) {
      query = { sellerId: req.userId, isCompleted: true };
    } else {
      query = { buyerId: req.userId, isCompleted: true };
    }

    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
