import { Router } from 'express';
import * as wishlistCtrl from '../controller/wishlist.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /wishlist:
 *   get:
 *     summary: Get my wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist products
 */
router.get('/', authenticate, wishlistCtrl.getWishlist);

/**
 * @openapi
 * /wishlist/{productId}:
 *   post:
 *     summary: Toggle product in wishlist (add/remove)
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product added or removed from wishlist
 */
router.post('/:productId', authenticate, wishlistCtrl.toggle);

/**
 * @openapi
 * /wishlist/{productId}/check:
 *   get:
 *     summary: Check if product is in wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Boolean indicating if product is in wishlist
 */
router.get('/:productId/check', authenticate, wishlistCtrl.checkWishlist);

export default router;