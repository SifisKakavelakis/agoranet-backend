import { User } from "../models/user.model";
import { Role, ROLES } from "../models/role.model";
import bcrypt from 'bcrypt';
import { CreateUserDTO } from "../dto/user.dto";
import * as userDAO from '../dao/user.dao'

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