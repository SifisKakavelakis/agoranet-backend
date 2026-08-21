import { z } from 'zod';

export const registerSchema = z.object({
    username:  z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be at most 50 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    password:  z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    email:     z.string().email('Invalid email format'),
    firstname: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50)
        .regex(/^[a-zA-Zα-ωΑ-Ω\s]+$/, 'First name can only contain letters'),
    lastname:  z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50)
        .regex(/^[a-zA-Zα-ωΑ-Ω\s]+$/, 'Last name can only contain letters'),
});

export const updateUserSchema = z.object({
    currentPassword: z.string().min(8).optional(),
    password:        z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .optional(),
    email:           z.string().email().optional(),
    firstname:       z.string()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Zα-ωΑ-Ω\s]+$/, 'First name can only contain letters')
        .optional(),
    lastname:        z.string()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Zα-ωΑ-Ω\s]+$/, 'Last name can only contain letters')
        .optional(),
    phoneNumber:     z.string()
        .regex(/^69\d{8}$/, 'Phone number must be a valid Greek mobile number (69xxxxxxxx)')
        .optional(),
    avatarUrl:       z.string().url().optional(),
});

export const loginSchema = z.object({
    credential: z.string().min(3, 'Credential must be at least 3 characters'),
    password:   z.string().min(8, 'Password must be at least 8 characters'),
});