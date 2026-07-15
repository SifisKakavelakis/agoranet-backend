import { Router } from 'express';
import * as orderCtrl from '../controller/order.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/order.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order (Buy Now)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Order could not be created
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, authorize('buyer', 'seller'), validate(createOrderSchema), orderCtrl.create);

/**
 * @openapi
 * /orders/my:
 *   get:
 *     summary: Get my orders (buyer)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Unauthorized
 */
router.get('/my', authenticate, authorize('buyer', 'seller'), orderCtrl.getMyOrders);

/**
 * @openapi
 * /orders/selling:
 *   get:
 *     summary: Get orders for my products (seller)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Unauthorized
 */
router.get('/selling', authenticate, authorize('seller'), orderCtrl.getSellerOrders);

/**
 * @openapi
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status (seller only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Order could not be updated
 */
router.put('/:id/status', authenticate, authorize('seller'), validate(updateOrderStatusSchema), orderCtrl.updateStatus);

/**
 * @openapi
 * /orders/{id}/cancel:
 *   put:
 *     summary: Cancel an order (buyer only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Order could not be cancelled
 */
router.put('/:id/cancel', authenticate, authorize('buyer'), orderCtrl.cancelOrder);

export default router;