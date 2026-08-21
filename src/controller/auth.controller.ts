import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import { CreateUserDTO } from '../dto/user.dto';
import { toUserResponseDTO } from '../mappers/user.mapper';
import * as blacklistService from '../services/blacklist.service';

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

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByUsername(req.user!.username);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ status: true, data: toUserResponseDTO(user) });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });
        await blacklistService.addToBlacklist(token);
        res.status(200).json({ status: true, message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
};