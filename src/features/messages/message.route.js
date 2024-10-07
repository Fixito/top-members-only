import express from 'express';
import validator from '../../middlewares/validation.middleware.js';
import * as messageController from './message.controller.js';
import { messageSchema } from './message.schema.js';
import { authenticateUser } from '../../middlewares/authentication.middleware.js';

const router = express.Router();

router.use(authenticateUser);

router
  .route('/')
  .get(messageController.getAuthenticatedMessagesBoard);

router
  .route('/messages')
  .get(messageController.createMessageGet)
  .post(
    validator(messageSchema),
    messageController.createMessagePost
  );

export default router;
