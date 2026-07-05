import { Router } from "express";
import * as userCtrl from '../controller/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.put('/:username', authenticate, userCtrl.update);

export default router;