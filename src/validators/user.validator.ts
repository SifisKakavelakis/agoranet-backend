import { z } from 'zod';

export const registerSchema  = z.object({
    username:  z.string().min(3, 'Username must be at least 3 characters').max(50),
    password:  z.string().min(6, 'Password must be at least 6 characters'),
    email:     z.string().email('Invalid email format'),
    firstname: z.string().min(2, 'First name must be at least 2 characters'),
    lastname:  z.string().min(2, 'Last name must be at least 2 characters'),
});

export const updateUserSchema = z.object({
    password:    z.string().min(6).optional(),
    email:       z.string().email().optional(),
    firstname:   z.string().min(2).optional(),
    lastname:    z.string().min(2).optional(),
    phoneNumber: z.string().min(10).optional(),
    avatarUrl:   z.string().url().optional(),
});

export const loginSchema = z.object({
    credential: z.string().min(3, 'Credential must be at least 3 characters'),
    password:   z.string().min(6, 'Password must be at least 6 characters'),
});