import { z } from 'zod';

export const createProductSchema = z.object({
    title:       z.string().min(3, 'Title must be at least 3 characters').max(255),
    description: z.string().min(10, 'Description must be at least 10 characters').optional(),
    price:       z.number().positive('Price must be a positive number'),
    categoryId:  z.number().int().positive('Category is required'),
});

export const updateProductSchema = z.object({
    title:       z.string().min(3).max(255).optional(),
    description: z.string().min(10).optional(),
    price:       z.number().positive().optional(),
    categoryId:  z.number().int().positive().optional(),
    isActive:    z.boolean().optional(),
});