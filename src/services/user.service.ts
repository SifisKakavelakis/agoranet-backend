import { IUser } from "../models/user.model";
import { Role, ROLES } from "../models/role.model";
import bcrypt from 'bcrypt';
import { CreateUserDTO } from "../dto/user.dto";
import * as userDAO from '../dao/user.dao'
import { UpdateUserDTO } from "../dto/user.dto";

export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export const createUser = async (payload: CreateUserDTO) => {
    console.log("Service Payload", payload);

    const hashedPassword = await bcrypt.hash(payload.password, BCRYPT_SALT_ROUNDS);

    const user = await userDAO.createUser({
        ...payload,
        password: hashedPassword
    });

    const buyerRole = await Role.findOne({ where: { id: ROLES.BUYER } });
    if (buyerRole) {
        await (user as any).addRole(buyerRole);
    }

    return user;
};

export const updateUser = async (username: string, payload: UpdateUserDTO) => {
    const updateUser: Partial<IUser> = {};
    if (payload.firstname!=undefined) updateUser.firstName = payload.firstname;
    if (payload.lastname!=undefined) updateUser.lastName = payload.lastname;
    if (payload.email!=undefined) updateUser.email = payload.email;
    if (payload.phoneNumber!=undefined) updateUser.phoneNumber = payload.phoneNumber;
    if (payload.avatarUrl!=undefined) updateUser.avatarUrl = payload.avatarUrl;

    if (payload.password!=undefined) {
        updateUser.password = await bcrypt.hash(payload.password, BCRYPT_SALT_ROUNDS);
    }

    const user = await userDAO.updateUser(username, updateUser);
    return user;
}