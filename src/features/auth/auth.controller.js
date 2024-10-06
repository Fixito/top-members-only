import { StatusCodes } from 'http-status-codes';
import * as authService from './auth.service.js';
import * as userService from '../users/user.service.js';
import { createAccessToken } from '../../utils/token.utils.js';
import { attachCookieToResponse } from '../../utils/cookie.utils.js';

const registerGet = (_req, res) => {
  res.render('index', {
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

  const token = createAccessToken({ id: user.id });

  attachCookieToResponse(res, 'accessToken', token);

  res.redirect('/messages');
};

const loginGet = (_req, res) => {
  res.render('login-user', {
    title: 'Project: Members Only',
  });
};

const loginPost = async (req, res) => {
  const result = req.result;

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).render('login-user', {
      errors: result.error.flatten(),
    });
  }

  const {
    rows: [user],
  } = await userService.getByEmail(result.data.email);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).render('login-user', {
      error: { message: 'Invalid email or password' },
    });
  }

  res.redirect('/messages');
};

export { loginGet, loginPost, registerGet, registerPost };
