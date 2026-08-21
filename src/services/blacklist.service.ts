import { BlacklistedToken } from '../models/blacklisted-token.model';

export const addToBlacklist = async (token: string): Promise<void> => {
    await BlacklistedToken.create({ token });
};

export const isBlacklisted = async (token: string): Promise<boolean> => {
    const found = await BlacklistedToken.findOne({ where: { token } });
    return found !== null;
};