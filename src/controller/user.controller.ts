import { Request, Response, NextFunction } from "express";
import * as userService from '../services/user.service';
import { UpdateUserDTO } from "../dto/user.dto";

export const create = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({status:true, data:user});
    } catch(err) {
        console.log(err);
        next(err)}
}

export const update = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const username = req.params.username as string;
        const data: UpdateUserDTO = req.body;
        const result = await userService.updateUser(username, data);
        if (!result) {
            return res.status(401).json({message: 'User not found' });
        }
        res.status(200).json(result);
    } catch(err) {
        next(err)
    }
}