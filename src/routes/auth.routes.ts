import { Router } from 'express';
import * as authCtrl from '../controller/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validators/user.validator';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/** 
 * @openapi
 * /auth/login:
 *  post:
 *   summary: User login
 *   tags: [Auth]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - credential
 *             - password
 *           properties:
 *            credential:
 *             type: string
 *            password:
 *             type: string
 *   responses: 
 *     200:
 *       description: User Looged in successfully
 *     401:
 *       description: Invalid credentials
 */
router.post('/login', validate(loginSchema), authCtrl.login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *               - firstname
 *               - lastname
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', validate(registerSchema), authCtrl.register);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, authCtrl.me);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout and invalidate token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticate, authCtrl.logout);

export default router;