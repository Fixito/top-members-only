import { StatusCodes } from 'http-status-codes';
import * as authService from './auth.service.js';
import * as userService from '../users/user.service.js';
import { createAccessToken } from '../../utils/token.utils.js';
import { attachCookieToResponse } from '../../utils/cookie.utils.js';
import { comparePasswords } from '../../utils/password.utils.js';

const registerGet = (_req, res) => {
  res.render('register-user', {
    title: 'Project: Members Only',
  });
};

const registerPost = async (req, res) => {
  const result = req.result;

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).render('index', {
      errors: result.error.flatten(),
    });
  }

  const { rows: user } = await authService.register(result.data);

  const token = createAccessToken({
    userId: user.user_id,
    membership_status: user.membership_status,
  });

  attachCookieToResponse(res, 'accessToken', token);

  res.redirect('/messages');
};

const loginGet = (_req, res) => {
  res.render('index', {
    title: 'Project: Members Only',
  });
};

const loginPost = async (req, res) => {
  const result = req.result;

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).render('index', {
      errors: result.error.flatten(),
    });
  }

  const {
    rows: [user],
  } = await userService.findByEmail(result.data.email);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).render('index', {
      error: { message: 'Invalid email or password' },
    });
  }

  const isPasswordValid = await comparePasswords(
    result.data.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).render('index', {
      error: { message: 'Invalid email or password' },
    });
  }

  const token = createAccessToken({
    userId: user.user_id,
    membership_status: user.membership_status,
  });

  attachCookieToResponse(res, 'accessToken', token);

  res.redirect('/messages');
};

const logout = (_req, res) => {
  res.clearCookie('accessToken');
  res.redirect('/');
};

export { loginGet, loginPost, logout, registerGet, registerPost };
