import { Product } from '../models/product.model';
import { ProductImage } from '../models/product-image.model';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { IProduct } from '../models/product.model';
import { Op } from 'sequelize';

export const createProduct = async (data: Partial<IProduct>): Promise<Product> => {
    return await Product.create(data as IProduct);
};

export const updateProduct = async (
    id: number,
    data: Partial<IProduct>
): Promise<Product | null> => {
    await Product.update(data, { where: { id } });
    return await findById(id);
};

export const deleteProduct = async (id: number): Promise<void> => {
    await Product.destroy({ where: { id } });
};

export const findAll = async (filters: {
    category?: number;
    search?:   string;
} = {}) => {
    const where: any = { isActive: true };

    if (filters.category) {
        where.categoryId = filters.category;
    }

    if (filters.search) {
        where.title = { [Op.like]: `%${filters.search}%` };
    }

    return await Product.findAll({
        where,
        include: [
            { model: Category,     as: 'category' },
            { model: User,         as: 'seller', attributes: ['id', 'username'] },
            { model: ProductImage, as: 'images' },
        ],
    });
};

export const findById = async (id: number): Promise<Product | null> => {
    return await Product.findOne({
        where: { id },
        include: [
            { model: Category,      as: 'category' },
            { model: User,          as: 'seller', attributes: ['id', 'username'] },
            { model: ProductImage,  as: 'images' },
        ],
    });
};

export const findBySeller = async (sellerId: number): Promise<Product[]> => {
    return await Product.findAll({
        where: { sellerId },
        include: [
            { model: Category,      as: 'category' },
            { model: User,          as: 'seller', attributes: ['id', 'username'] },
            { model: ProductImage,  as: 'images' },
        ],
    });
};