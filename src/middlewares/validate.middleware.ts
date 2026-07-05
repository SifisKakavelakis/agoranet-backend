import { Response, Request, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodTypeAny) => 
(req: Request, res: Response, next: NextFunction) => {
    try {
        const toValidate = {
            body: req.body,
            query: req.query,
            params: req.params
        };
        schema.parse(toValidate.body);
        next();
    } catch (err:any) {
        if (err instanceof ZodError) {
            return res.status(400).json({ 
                message: err.issues
            });
        }
        return res.status(400).json({ message: err?.message || 'validation error' });
    }
}