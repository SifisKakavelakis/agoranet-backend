import { z } from 'zod';

export const createOrderSchema = z.object({
    productId: z.number().int().positive('Product ID must be a positive number'),
});

export const updateOrderStatusSchema = z.object({
    status: z.enum(['confirmed', 'cancelled'] as const, {
        message: 'Status must be confirmed or cancelled',
    }),
});