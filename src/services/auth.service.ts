import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { CreateUserDTO } from '../dto/user.dto';
import * as userService from './user.service';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES = '1h';

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

    const payload = { 
        id:       user.id,
        username: user.username, 
        email:    user.email, 
        roles:    (user as any).roles?.map((r: any) => r.name)
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return { user, token };
};

export const register = async (payload: CreateUserDTO) => {

    const existingEmail = await User.findOne({ where: { email: payload.email } });
    if (existingEmail) return null;

    const existingUsername = await User.findOne({ where: { username: payload.username } });
    if (existingUsername) return null;

    const user = await userService.createUser(payload);
    if (!user) return null;

    const tokenPayload = { 
        id:       user.id,
        username: user.username, 
        email:    user.email, 
        roles:    (user as any).roles?.map((r: any) => r.name)
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return { user, token };
};