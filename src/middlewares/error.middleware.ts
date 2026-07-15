import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({
            status:  false,
            message: 'Validation error',
            errors:  err.errors.map((e: any) => ({
                field:   e.path,
                message: e.message,
            })),
        });
        return;
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).json({
            status:  false,
            message: 'Already exists',
        });
        return;
    }

    if (err.name === 'MulterError') {
        res.status(400).json({
            status:  false,
            message: err.message,
        });
        return;
    }

    res.status(err.status || 500).json({
        status:  false,
        message: err.message || 'Internal server error',
    });
};