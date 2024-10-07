import { StatusCodes } from 'http-status-codes';
import * as membershipController from './membership.service.js';
import { createAccessToken } from '../../utils/token.utils.js';
import { attachCookieToResponse } from '../../utils/cookie.utils.js';

const createMembershipGet = (req, res) => {
  res.render('membership');
};

const createMembershipPost = async (req, res) => {
  const result = req.result;

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).render('membership', {
      errors: result.error.flatten(),
    });
  }

  const secretPassword = req.result.data.secretPassword;

  if (secretPassword !== 'secret')
    return res.status(StatusCodes.BAD_REQUEST).render('membership', {
      error: { message: 'Invalid password' },
    });

  const {
    rows: [user],
  } = await membershipController.update({
    status: 'premium',
    userId: req.user.userId,
  });

  const token = createAccessToken({
    userId: user.user_id,
    membership_status: user.membership_status,
  });

  attachCookieToResponse(res, 'accessToken', token);

  res.redirect('/messages');
};

export { createMembershipGet, createMembershipPost };
