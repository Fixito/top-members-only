import express from 'express';
import validator from '../../middlewares/validation.middleware.js';
import * as messageController from './message.controller.js';
import { messageSchema } from './message.schema.js';

const router = express.Router();

router.route('/').get(messageController.getAll);

router
  .route('/create')
  .get(messageController.createMessageGet)
  .post(
    validator(messageSchema),
    messageController.createMessagePost
  );

export default router;
