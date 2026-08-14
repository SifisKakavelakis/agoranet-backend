import User, { IUser } from "../models/user.model";
import { Role, ROLES } from "../models/role.model";
import bcrypt from 'bcrypt';
import { CreateUserDTO } from "../dto/user.dto";
import * as userDAO from '../dao/user.dao'
import { UpdateUserDTO } from "../dto/user.dto";

export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export const createUser = async (payload: CreateUserDTO) => {

    const hashedPassword = await bcrypt.hash(payload.password, BCRYPT_SALT_ROUNDS);

    const user = await userDAO.createUser({
        ...payload,
        password: hashedPassword
    });

    const buyerRole = await Role.findOne({ where: { id: ROLES.BUYER } });
    if (buyerRole) {
        await (user as any).addRole(buyerRole);
    }

    return await User.findOne({
        where: { id: user.id },
        include: [{ model: Role, as: 'roles' }],
    });
};

export const updateUser = async (username: string, payload: UpdateUserDTO) => {
    const existingUser = await userDAO.findByUsername(username);
    if (!existingUser) return null;

    if (payload.password) {
        if (!payload.currentPassword) {
            throw new Error('Current password is required to change password');
        }
        const isValid = await bcrypt.compare(payload.currentPassword, existingUser.password);
        if (!isValid) {
            throw new Error('Current password is incorrect');
        }
    }

    const updateData: Partial<IUser> = {};
    if (payload.firstname     != undefined) updateData.firstname    = payload.firstname;
    if (payload.lastname      != undefined) updateData.lastname     = payload.lastname;
    if (payload.email         != undefined) updateData.email        = payload.email;
    if (payload.phoneNumber   != undefined) updateData.phoneNumber  = payload.phoneNumber;
    if (payload.avatarUrl     != undefined) updateData.avatarUrl    = payload.avatarUrl;

    if (payload.password != undefined) {
        updateData.password = await bcrypt.hash(payload.password, BCRYPT_SALT_ROUNDS);
    }

    return await userDAO.updateUser(username, updateData);
};

export const getUserByUsername = async (username: string) => {
    return await userDAO.findByUsername(username);
};

export const becomeSeller = async (userId: number) => {
    const user = await userDAO.findById(userId);
    if (!user) return null;

    const sellerRole = await Role.findOne({ where: { id: ROLES.SELLER } });
    if (!sellerRole) return null;

    await (user as any).addRole(sellerRole);

    return await User.findOne({
        where: { id: userId },
        include: [{ model: Role, as: 'roles' }],
    });
};