import { Router } from 'express';
import * as reviewCtrl from '../controller/review.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createReviewSchema } from '../validators/review.validator';

const router = Router();

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a review for a seller (buyer only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - rating
 *             properties:
 *               orderId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, authorize('buyer', 'seller'), validate(createReviewSchema), reviewCtrl.create);

/**
 * @openapi
 * /reviews/seller/{sellerId}:
 *   get:
 *     summary: Get all reviews for a seller
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/seller/:sellerId', reviewCtrl.getSellerReviews);

export default router;