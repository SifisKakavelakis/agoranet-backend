import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../dto/product.dto';
import { toProductResponseDTO } from '../mappers/product.mapper';
import fs from 'fs';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = req.user!.id;
        const data: CreateProductDTO = req.body;
        const product = await productService.createProduct(sellerId, data);
        if (!product) return res.status(400).json({ message: 'Product not created' });
        res.status(201).json({ status: true, data: toProductResponseDTO(product) });
    } catch (err) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const sellerId = req.user!.id;
        const data: UpdateProductDTO = req.body;
        const existing = await productService.getProductById(id);
        if (!existing) return res.status(404).json({ message: 'Product not found' });
        if ((existing as any).sellerId !== sellerId) {
            return res.status(403).json({ message: 'Access denied — not your product' });
        }
        const product = await productService.updateProduct(id, data);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ status: true, data: toProductResponseDTO(product) });
    } catch (err) {
        next(err);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const sellerId = req.user!.id;
        const existing = await productService.getProductById(id);
        if (!existing) return res.status(404).json({ message: 'Product not found' });
        if ((existing as any).sellerId !== sellerId) {
            return res.status(403).json({ message: 'Access denied — not your product' });
        }
        await productService.deleteProduct(id);
        res.status(200).json({ status: true, message: 'Product deleted successfully' });
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category, search, page, limit } = req.query;
        const result = await productService.getAllProducts({
            ...(category && { category: parseInt(category as string) }),
            ...(search && { search: search as string }),
            ...(page && { page: parseInt(page as string) }),
            ...(limit && { limit: parseInt(limit as string) }),
        });
        res.status(200).json({
            status: true,
            data: result.data.map(toProductResponseDTO),
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
        });
    } catch (err) {
        next(err);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const product = await productService.getProductById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ status: true, data: toProductResponseDTO(product) });
    } catch (err) {
        next(err);
    }
};

export const getMySelling = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = req.user!.id;
        const products = await productService.getProductsBySeller(sellerId);
        res.status(200).json({ status: true, data: products.map(toProductResponseDTO) });
    } catch (err) {
        next(err);
    }
};

export const uploadImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const sellerId = req.user!.id;
        const files = req.files as Express.Multer.File[];

        const existing = await productService.getProductById(id);
        if (!existing) {
            files?.forEach(file => fs.unlinkSync(file.path));
            return res.status(404).json({ message: 'Product not found' });
        }
        if ((existing as any).sellerId !== sellerId) {
            files?.forEach(file => fs.unlinkSync(file.path));
            return res.status(403).json({ message: 'Access denied — not your product' });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        const images = await productService.addImages(id, files);
        res.status(201).json({ status: true, data: images });
    } catch (err) {
        next(err);
    }
};

export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const imageId = parseInt(req.params.imageId as string);
        const sellerId = req.user!.id;

        const existing = await productService.getProductById(id);
        if (!existing) return res.status(404).json({ message: 'Product not found' });
        if ((existing as any).sellerId !== sellerId) {
            return res.status(403).json({ message: 'Access denied — not your product' });
        }

        await productService.deleteImage(imageId);
        res.status(200).json({ status: true, message: 'Image deleted successfully' });
    } catch (err) {
        next(err);
    }
};