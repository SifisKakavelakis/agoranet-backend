import { IUser, User } from "../models/user.model";
import bcrypt from 'bcrypt';

export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export const createUser = async (payload: IUser) => {
    console.log("Service Payload", payload);

    const hashedPassword = await bcrypt.hash(payload.password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
        username:  payload.username,
        password:  hashedPassword,
        email:     payload.email,
        firstName: payload.firstName,
        lastName:  payload.lastName,
        roleId:    2,
    });

    console.log("New user: ", user);
    return user;
};