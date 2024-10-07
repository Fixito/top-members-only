import { StatusCodes } from 'http-status-codes';
import * as messagesService from './message.service.js';
import { formatDate } from '../../utils/date.utils.js';

const getAll = async (req, res) => {
  const { rows: messages } = await messagesService.getAll();
  let data = { title: 'Project: Members Only' };

  const newMessages = messages.map((messages) => {
    const formattedDate = formatDate(messages.created_at);
    return {
      ...messages,
      created_at: formattedDate,
    };
  });

  data.messages = newMessages;

  if (req.user) {
    data.user = {
      membership_status: req.user.membership_status || 'basic',
    };
  }

  res.status(StatusCodes.OK).render('index', data);
};

const createMessageGet = (req, res) => {
  res.render('create-message');
};

const createMessagePost = (req, res) => {
  res.render('create-message');
};

export { getAll, createMessageGet, createMessagePost };
