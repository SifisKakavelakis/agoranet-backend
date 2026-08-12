import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';
import { UpdateUserDTO } from "../dto/user.dto";
import { toUserResponseDTO } from "../mappers/user.mapper";

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username as string;
        if (req.user!.username !== username) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const data: UpdateUserDTO = req.body;
        const result = await userService.updateUser(username, data);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: true, data: toUserResponseDTO(result) });
    } catch (err) {
        next(err)
    }
}

export const getByUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username as string;
        const result = await userService.getUserByUsername(username);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status: true, data: toUserResponseDTO(result) });
    } catch (err) {
        next(err);
    }
};

export const becomeSeller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const result = await userService.becomeSeller(userId);
        if (!result) return res.status(400).json({ message: 'Could not become seller' });
        res.status(200).json({ status: true, data: toUserResponseDTO(result) });
    } catch (err) {
        next(err);
    }
};  