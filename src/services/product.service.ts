import { IProduct } from '../models/product.model';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import * as productDAO from '../dao/product.dao';

export const getAllProducts = async (filters: {
    category?: number;
    search?:   string;
} = {}) => {
    return await productDAO.findAll(filters);
};

export const getProductById = async (id: number) => {
    return await productDAO.findById(id);
};

export const getProductsBySeller = async (sellerId: number) => {
    return await productDAO.findBySeller(sellerId);
};

export const createProduct = async (sellerId: number, payload: CreateProductDTO) => {
    const product = await productDAO.createProduct({
        ...payload,
        sellerId,
    });

    return await productDAO.findById(product.id);
};

export const updateProduct = async (id: number, payload: UpdateProductDTO) => {
    return await productDAO.updateProduct(id, payload);
};

export const deleteProduct = async (id: number): Promise<void> => {
    await productDAO.deleteProduct(id);
};