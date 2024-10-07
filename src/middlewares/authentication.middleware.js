import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/token.utils.js';

const authenticateUser = (req, res, next) => {
  let token = null;

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req?.signedCookies?.accessToken) {
    token = req.signedCookies.accessToken;
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  try {
    const { userId, membership_status } = verifyToken(
      token,
      process.env.JWT_SECRET
    );
    req.user = { userId, membership_status };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }
};

export { authenticateUser };
