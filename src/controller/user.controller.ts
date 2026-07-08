import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';
import { UpdateUserDTO } from "../dto/user.dto";
import { toUserResponseDTO } from "../mappers/user.mapper";

export const update = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const username = req.params.username as string;
        const data: UpdateUserDTO = req.body;
        const result = await userService.updateUser(username, data);
        if (!result) {
            return res.status(404).json({message: 'User not found' });
        }
        res.status(200).json({ status: true, data: toUserResponseDTO(result) });
    } catch(err) {
        next(err)
    }
}