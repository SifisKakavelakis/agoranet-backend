import { Router } from "express";
import * as userCtrl from '../controller/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateUserSchema } from '../validators/user.validator';

const router = Router();

router.put('/:username', authenticate, validate(updateUserSchema), userCtrl.update);

export default router;