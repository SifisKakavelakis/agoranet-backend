import * as reviewDAO from '../dao/review.dao';
import * as orderDAO from '../dao/order.dao';
import { CreateReviewDTO } from '../dto/review.dto';

export const createReview = async (reviewerId: number, payload: CreateReviewDTO) => {

    // βρίσκουμε το order
    const order = await orderDAO.findById(payload.orderId);
    if (!order) return { error: 'Order not found' };

    // ελέγχουμε αν ανήκει στον reviewer
    if (order.buyerId !== reviewerId) return { error: 'Access denied' };

    // ελέγχουμε αν το order είναι confirmed
    if (order.status !== 'confirmed') return { error: 'Order must be confirmed to leave a review' };

    // ελέγχουμε αν υπάρχει ήδη review για αυτό το order
    const existing = await reviewDAO.findByOrder(payload.orderId);
    if (existing) return { error: 'You have already reviewed this order' };

    // βρίσκουμε τον seller από το product
    const product = (order as any).product;
    if (!product) return { error: 'Product not found' };

    const review = await reviewDAO.createReview({
    reviewerId,
    sellerId:  product.sellerId,
    orderId:   payload.orderId,
    rating:    payload.rating,
    comment:   payload.comment ?? null,
});

    return { data: review };
};

export const getSellerReviews = async (sellerId: number) => {
    return await reviewDAO.findBySeller(sellerId);
};