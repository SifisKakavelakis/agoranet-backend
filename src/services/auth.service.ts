import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { CreateUserDTO } from '../dto/user.dto';
import * as userService from './user.service';
import jwt from 'jsonwebtoken';

const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV) {
    throw new Error('JWT_SECRET is not defined');
}
const JWT_SECRET: string = JWT_SECRET_ENV;

const JWT_EXPIRES_ENV = process.env.JWT_EXPIRES;
if (!JWT_EXPIRES_ENV) {
    throw new Error('JWT_EXPIRES is not defined');
}
const JWT_EXPIRES: string = JWT_EXPIRES_ENV;

export const login = async (credential: string, password: string) => {

    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: credential },
                { username: credential },
            ]
        },
        include: [{ model: Role, as: 'roles' }],
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const token = generateToken(user);
    return { user, token };
};

export const register = async (payload: CreateUserDTO) => {

    const existingCredential = await User.findOne({
        where: { [Op.or]: [{ email: payload.email }, { username: payload.username }] }
    });
    if (existingCredential) return null;

    const user = await userService.createUser(payload);
    if (!user) return null;

    const token = generateToken(user);
    return { user, token };
};

function generateToken(user: User): string {
  const payload = {
    id: user.id,
    roles: (user as any).roles?.map((r: any) => r.name),
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES as any });
}