import { Request, Response, NextFunction } from 'express';
import * as reviewService from '../services/review.service';
import { CreateReviewDTO } from '../dto/review.dto';
import { toReviewResponseDTO } from '../mappers/review.mapper';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewerId = req.user!.id;
        const data: CreateReviewDTO = req.body;
        const result = await reviewService.createReview(reviewerId, data);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        res.status(201).json({ status: true, data: toReviewResponseDTO(result.data!) });
    } catch (err) {
        next(err);
    }
};
    
export const getSellerReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = parseInt(req.params.sellerId as string);
        const reviews = await reviewService.getSellerReviews(sellerId);
        res.status(200).json({ status: true, data: reviews.map(toReviewResponseDTO) });
    } catch (err) {
        next(err);
    }
};