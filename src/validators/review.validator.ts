import { z } from 'zod';

export const createReviewSchema = z.object({
    orderId:  z.number().int().positive('Order ID must be a positive number'),
    rating:   z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
    comment:  z.string().min(3).optional(),
}); 