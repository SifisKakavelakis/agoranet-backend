import { Router } from 'express';
import * as productCtrl from '../controller/product.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 *       400:
 *         description: Invalid request
 */
router.get('/', productCtrl.getAll);

/**
 * @openapi
 * /products/my/selling:
 *   get:
 *     summary: Get my productss
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller products
 *       401:
 *         description: Unauthorized
 */
router.get('/my/selling', authenticate, authorize('seller'), productCtrl.getMySelling);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', productCtrl.getById);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product (seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, authorize('seller'), validate(createProductSchema), productCtrl.create);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Access denied
 */
router.put('/:id', authenticate, authorize('seller'), validate(updateProductSchema), productCtrl.update);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product (seller only)
 *     tags: [Products]
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
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authenticate, authorize('seller'), productCtrl.remove);

/**
 * @openapi
 * /products/{id}/images:
 *   post:
 *     summary: Upload images for a product
 *     tags: [Products]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Images uploaded successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Product not found
 */
router.post('/:id/images', authenticate, authorize('seller'), upload.array('images', 5), productCtrl.uploadImages);

export default router;