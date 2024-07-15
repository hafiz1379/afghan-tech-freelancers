import createError from '../utils/createError.js';
import Conversation from '../models/conversation.model.js';

export const createConversation = async (req, res, next) => {
  // Construct the conversation object based on the request data
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    return res.status(201).send(savedConversation);
  } catch (error) {
    console.error('Error saving new conversation:', error); // Add logging
    return next(createError(500, 'Error creating conversation'));
  }
};

export const getAllConversations = async (req, res, next) => {
  let query = {};

  if (req.isSeller) {
    query = {
      sellerId: req.userId,
    };
  } else {
    query = {
      buyerId: req.userId,
    };
  }
  try {
    const allConversations = await Conversation.find(query).sort({
      updatedAt: -1,
    });
    return res.status(200).send(allConversations);
  } catch (error) {
    return next(createError(404, 'Something went wrong from conversation'));
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, 'There is no conversation'));
    return res.status(200).send(conversation);
  } catch (error) {
    return next(createError(404, 'Something went wrong from conversation'));
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readBySeller: true,
          readByBuyer: true,
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).send(updatedConversation);
  } catch (error) {
    return next(createError(404, 'Something went wrong from conversation'));
  }
};
