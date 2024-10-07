import express from 'express';
import validator from '../../middlewares/validation.middleware.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../users/user.schema.js';
import * as authController from './auth.controller.js';

const router = express.Router();

router
  .route('/')
  .get(authController.loginGet)
  .post(validator(loginUserSchema), authController.loginPost);

router
  .route('/register')
  .get(authController.registerGet)
  .post(validator(registerUserSchema), authController.registerPost);

export default router;
