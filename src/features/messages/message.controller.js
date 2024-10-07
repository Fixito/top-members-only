import { StatusCodes } from 'http-status-codes';
import * as messagesService from './message.service.js';
import { formatDate } from '../../utils/date.utils.js';

const getAll = async (_req, res) => {
  const { rows: messages } = await messagesService.getAll();

  const newMessages = messages.map((messages) => {
    const formattedDate = formatDate(messages.created_at);
    return {
      ...messages,
      created_at: formattedDate,
    };
  });

  res
    .status(StatusCodes.OK)
    .render('messages-board', { messages: newMessages });
};

const createMessageGet = (req, res) => {
  res.render('create-message');
};

const createMessagePost = (req, res) => {
  res.render('create-message');
};

export { getAll, createMessageGet, createMessagePost };
