import { Product, IProduct } from '../models/product.model';
import { ProductImage, IProductImage } from '../models/product-image.model';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { Op } from 'sequelize';
import fs from 'fs';
import path from 'path';

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
    page?:     number;
    limit?:    number;
} = {}) => {
    const where: any = { isActive: true };

    if (filters.category) {
        where.categoryId = filters.category;
    }

    if (filters.search) {
        where.title = { [Op.like]: `%${filters.search}%` };
    }

    const page  = filters.page  || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        where,
        include: [
            { model: Category,     as: 'category' },
            { model: User,         as: 'seller', attributes: ['id', 'username'] },
            { model: ProductImage, as: 'images' },
        ],
        limit,
        offset,
        distinct: true,
    });

    return {
        data:       rows,
        total:      count,
        page,
        totalPages: Math.ceil(count / limit),
    };
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

export const findImages = async (productId: number): Promise<ProductImage[]> => {
    return await ProductImage.findAll({ where: { productId, isPrimary: true } });
};

export const addImages = async (images: Partial<IProductImage>[]): Promise<ProductImage[]> => {
    return await ProductImage.bulkCreate(images as IProductImage[]);
};

export const deleteImage = async (imageId: number): Promise<void> => {
    const image = await ProductImage.findOne({ where: { id: imageId } });
    if (image) {
        // διαγραφή αρχείου από disk
        const filePath = path.join(__dirname, '../../', image.url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await image.destroy();
    }
};