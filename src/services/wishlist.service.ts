import * as wishlistDAO from '../dao/wishlist.dao';

export const toggleWishlist = async (userId: number, productId: number) => {
    const existing = await wishlistDAO.findOne(userId, productId);

    if (existing) {
        await wishlistDAO.removeFromWishlist(userId, productId);
        return { added: false };
    } else {
        await wishlistDAO.addToWishlist(userId, productId);
        return { added: true };
    }
};

export const getWishlist = async (userId: number) => {
    return await wishlistDAO.findByUser(userId);
};

export const isInWishlist = async (userId: number, productId: number): Promise<boolean> => {
    const existing = await wishlistDAO.findOne(userId, productId);
    return existing !== null;
};