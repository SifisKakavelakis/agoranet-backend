import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV) {
    throw new Error('JWT_SECRET is not defined');
}
const JWT_SECRET: string = JWT_SECRET_ENV;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
    const token = header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid Authorization format' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = {
            id: payload.id,
            username: payload.username,
            roles: payload.roles,
        };
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRoles: string[] = req.user?.roles || [];
        const hasRole = roles.some(role => userRoles.includes(role));
        if (!hasRole) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next();
    };
};