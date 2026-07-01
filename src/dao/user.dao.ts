import { User, IUser } from '../models/user.model';
import { Role } from '../models/role.model';

export const createUser = async (data: Partial<IUser>): Promise<User> => {
    return await User.create(data as IUser);
};

export const updateUser = async (
    username: string,
    payload: Partial<IUser>
): Promise<User | null> => {
    await User.update(payload, { where: { username } });
    return await findByUsername(username);
};

export const findByUsername = async (username: string): Promise<User | null> => {
    return await User.findOne({
        where: { username },
        include: [{ model: Role, as: 'roles' }],
    });
};

// export const findAll = async (): Promise<User[]> => {
//     return await User.findAll({
//         include: [{ model: Role, as: 'roles' }],
//     });
// };

// export const findByEmail = async (email: string): Promise<User | null> => {
//     return await User.findOne({
//         where: { email },
//         include: [{ model: Role, as: 'roles' }],
//     });
// };

// export const findById = async (id: number): Promise<User | null> => {
//     return await User.findOne({
//         where: { id },
//         include: [{ model: Role, as: 'roles' }],
//     });
// };
