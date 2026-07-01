import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { CreateUserDTO } from '../dto/user.dto';
import * as userService from './user.service';

export const login = async (credential: string, password: string) => {
    
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email:    credential },
                { username: credential },
            ]
        },
        include: [{ model: Role, as: 'roles' }],
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
};

export const register = async (payload: CreateUserDTO) => {

    const existingEmail = await User.findOne({ where: { email: payload.email } });
    if (existingEmail) return null;

    const existingUsername = await User.findOne({ where: { username: payload.username } });
    if (existingUsername) return null;

    const user = await userService.createUser(payload);
    return user;
};