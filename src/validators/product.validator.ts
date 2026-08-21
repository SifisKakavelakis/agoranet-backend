import { z } from 'zod';

export const createProductSchema = z.object({
    title:       z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(255, 'Title must be at most 255 characters'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(2000, 'Description must be at most 2000 characters')
        .optional(),
    price:       z.number()
        .positive('Price must be a positive number')
        .max(100000, 'Price must be at most €100,000'),
    categoryId:  z.number().int().positive('Category is required'),
});

export const updateProductSchema = z.object({
    title:       z.string().min(3).max(255).optional(),
    description: z.string().min(10).max(2000).optional(),
    price:       z.number().positive().max(100000).optional(),
    categoryId:  z.number().int().positive().optional(),
    isActive:    z.boolean().optional(),
});