import { Product } from '../models/product.model';
import { ProductResponseDTO } from '../dto/product.dto';

export const toProductResponseDTO = (product: Product): ProductResponseDTO => {
    const p = product as any;

    return {
        id:          product.id,
        title:       product.title,
        description: product.description,
        price:       product.price,
        isActive:    product.isActive,
        category: p.category ? {
            id:   p.category.id,
            name: p.category.name,
        } : null,
        seller: p.seller ? {
            id:       p.seller.id,
            username: p.seller.username,
        } : null,
        images: p.images?.map((img: any) => ({
            id:        img.id,
            url:       img.url,
            isPrimary: img.isPrimary,
        })) || [],
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
};