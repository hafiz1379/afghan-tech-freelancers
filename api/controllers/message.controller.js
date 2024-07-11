/* eslint-disable import/extensions */
import createError from '../utils/createError.js';
import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

export const createMessage = async (req, res, next) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      {
        new: true,
      },
    );
    return res.status(201).send(savedMessage);
  } catch (error) {
    return next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    return res.status(200).send(messages);
  } catch (error) {
    return next(createError(404, 'Problem from message controller (getMessages)'));
  }
};
