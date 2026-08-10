import { Request, Response, NextFunction } from 'express';
import * as wishlistService from '../services/wishlist.service';
import { toProductResponseDTO } from '../mappers/product.mapper';

export const toggle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId    = req.user!.id;
        const productId = parseInt(req.params.productId as string);
        const result    = await wishlistService.toggleWishlist(userId, productId);
        res.status(200).json({ status: true, added: result.added });
    } catch (err) {
        next(err);
    }
};

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId  = req.user!.id;
        const items   = await wishlistService.getWishlist(userId);
        const products = items
            .map(item => (item as any).product)
            .filter(Boolean)
            .map(toProductResponseDTO);
        res.status(200).json({ status: true, data: products });
    } catch (err) {
        next(err);
    }
};

export const checkWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId    = req.user!.id;
        const productId = parseInt(req.params.productId as string);
        const inWishlist = await wishlistService.isInWishlist(userId, productId);
        res.status(200).json({ status: true, inWishlist });
    } catch (err) {
        next(err);
    }
};