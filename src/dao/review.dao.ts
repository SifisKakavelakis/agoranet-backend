import { Review, IReview } from '../models/review.model';
import { User } from '../models/user.model';

export const createReview = async (data: Partial<IReview>): Promise<Review> => {
    return await Review.create(data as IReview);
};

export const findBySeller = async (sellerId: number): Promise<Review[]> => {
    return await Review.findAll({
        where: { sellerId },
        include: [
            { model: User, as: 'reviewer', attributes: ['id', 'username'] },
        ],
        order: [['created_at', 'DESC']],
    });
};

export const findByOrder = async (orderId: number): Promise<Review | null> => {
    return await Review.findOne({
        where: { orderId },
    });
};