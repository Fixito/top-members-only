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
    title: 'Project: Members Only',
    messages: newMessages,
    user: { membership_status: req.user.membership_status },
  });
};

const createMessageGet = (req, res) => {
  res.render('create-message');
};

const createMessagePost = (req, res) => {
  res.render('create-message');
};

export {
  getAll,
  getAuthenticatedMessagesBoard,
  createMessageGet,
  createMessagePost,
};
