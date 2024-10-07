import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/token.utils.js';
import * as messagesController from '../features/messages/message.service.js';

const authenticateUser = async (req, res, next) => {
  let token = null;

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req?.signedCookies?.accessToken) {
    token = req.signedCookies.accessToken;
  } else {
    const { rows: messages } = await messagesController.getAll();
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .render('index', { messages });
  }

  try {
    const { userId, membership_status } = verifyToken(
      token,
      process.env.JWT_SECRET
    );
    req.user = { userId, membership_status };
    next();
  } catch (error) {
    const { rows: messages } = await messagesController.getAll();
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .render('index', { messages });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.membership_status)) {
      return res.redirect('/');
    }

    next();
  };
};

export { authenticateUser, authorizePermissions };
