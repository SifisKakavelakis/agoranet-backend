import { Review } from '../models/review.model';
import { ReviewResponseDTO } from '../dto/review.dto';

export const toReviewResponseDTO = (review: Review): ReviewResponseDTO => {
    const r = review as any;

    return {
        id:      review.id,
        rating:  review.rating,
        comment: review.comment,
        reviewer: r.reviewer ? {
            id:       r.reviewer.id,
            username: r.reviewer.username,
        } : null,
        createdAt: review.createdAt,
    };
};