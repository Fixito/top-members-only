import { StatusCodes } from 'http-status-codes';
import * as messagesService from './message.service.js';
import { formatDate } from '../../utils/date.utils.js';

const getAll = async (_req, res) => {
  const { rows: messages } = await messagesService.getAll();
  res.status(StatusCodes.OK).render('index', { messages });
};

const getAuthenticatedMessagesBoard = async (req, res) => {
  const { rows: messages } =
    await messagesService.getAuthenticatedMessages();

  const newMessages = messages.map((messages) => {
    const formattedDate = formatDate(messages.created_at);
    return {
      ...messages,
      created_at: formattedDate,
    };
  });

  res.render('index', {
    messages: newMessages,
    user: { membership_status: req.user.membership_status },
  });
};

const createMessageGet = (_req, res) => {
  res.render('create-message');
};

const createMessagePost = async (req, res) => {
  const result = req.result;

  if (!result.success) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .render('create-message', {
        errors: result.error.flatten(),
      });
  }

  await messagesService.create({
    data: result.data,
    userId: req.user.userId,
  });

  res.redirect('/');
};

const remove = async (req, res) => {
  const {
    rows: [message],
  } = await messagesService.remove(req.params.id);

  res.redirect('/');
};

export {
  getAll,
  getAuthenticatedMessagesBoard,
  createMessageGet,
  createMessagePost,
  remove,
};
