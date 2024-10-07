import express from 'express';
import * as membershipController from './membership.controller.js';
import validator from '../../middlewares/validation.middleware.js';
import { MembershipPasswordSchema } from './membership.schema.js';
import { authenticateUser } from '../../middlewares/authentication.middleware.js';

const router = express.Router();

router.use(authenticateUser);

router
  .route('/')
  .get(membershipController.createMembershipGet)
  .post(
    validator(MembershipPasswordSchema),
    membershipController.createMembershipPost
  );

export default router;
