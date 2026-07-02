import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { CreateUserDTO } from '../dto/user.dto';
import { toUserResponseDTO } from '../mappers/user.mapper';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { credential, password } = req.body;
        const result = await authService.login(credential, password);
        if (!result) return res.status(401).json({ message: 'Invalid email or password' });
        res.status(200).json({ token: result.token, user: toUserResponseDTO(result.user) });
    } catch (err) {
        next(err);
    }   
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: CreateUserDTO = req.body;
        const result = await authService.register(data);
        if (!result) return res.status(400).json({ message: 'User already exists' });
        res.status(201).json({ token: result.token, user: toUserResponseDTO(result.user) });
    } catch (err) {
        next(err);
    }
};