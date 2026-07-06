import { Router } from "express";
import * as userCtrl from '../controller/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { updateUserSchema } from '../validators/user.validator';

const router = Router();

/** 
 * @openapi
 * /users/{username}:
 *  put:
 *   summary: Update user information
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: username
 *      required: true
 *      schema:
 *       type: string
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *   responses:
 *    200:
 *      description: User updated successfully
 *    404:
 *      description: User not found 
 */
router.put('/:username', authenticate, validate(updateUserSchema), userCtrl.update);

export default router;