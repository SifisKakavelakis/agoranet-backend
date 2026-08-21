import { BlacklistedToken } from '../models/blacklisted-token.model';
import { Op } from 'sequelize';

export const addToBlacklist = async (token: string, expiresAt: Date): Promise<void> => {
    await BlacklistedToken.create({ token, expiresAt });
};

export const isBlacklisted = async (token: string): Promise<boolean> => {
    const found = await BlacklistedToken.findOne({
        where: {
            token,
            expiresAt: { [Op.gt]: new Date() },
        },
    });
    return found !== null;
};