import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/token.utils.js';

const authenticateUser = (req, res, next) => {
  let token = null;

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req?.signedCookies?.accessToken) {
    token = req.signedCookies.accessToken;
  } else {
    return next();
  }

  try {
    const { userId, membership_status } = verifyToken(
      token,
      process.env.JWT_SECRET
    );
    req.user = { userId, membership_status };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: 'You are not authorized to access this route',
      });
  }
};

export { authenticateUser };
