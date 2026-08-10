import { Wishlist, IWishlist } from '../models/wishlist.model';
import { Product } from '../models/product.model';
import { ProductImage } from '../models/product-image.model';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';

export const addToWishlist = async (userId: number, productId: number): Promise<Wishlist> => {
    return await Wishlist.create({ userId, productId } as IWishlist);
};

export const removeFromWishlist = async (userId: number, productId: number): Promise<void> => {
    await Wishlist.destroy({ where: { userId, productId } });
};

export const findByUser = async (userId: number): Promise<Wishlist[]> => {
    return await Wishlist.findAll({
        where: { userId },
        include: [
            {
                model: Product, 
                as: 'product',
                where: { isActive: true },
                include: [
                    { model: ProductImage, as: 'images' },
                    { model: Category, as: 'category' },
                    { model: User, as: 'seller', attributes: ['id', 'username'] },
                ],
            },
        ],
    });
};

export const findOne = async (userId: number, productId: number): Promise<Wishlist | null> => {
    return await Wishlist.findOne({ where: { userId, productId } });
};