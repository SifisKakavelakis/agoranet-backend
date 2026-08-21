import { Order } from '../models/order.model';
import { OrderResponseDTO } from '../dto/order.dto';

export const toOrderResponseDTO = (order: Order): OrderResponseDTO => {
    const o = order as any;

    return {
        id: order.id,
        totalPrice: order.totalPrice,
        status: order.status,
        product: o.product ? {
            id: o.product.id,
            title: o.product.title,
            price: o.product.price,
            images: o.product.images?.map((img: any) => ({
                url: img.url,
                isPrimary: img.isPrimary,
            })) || [],
        } : null,
        buyer: o.buyer ? {
            id: o.buyer.id,
            username: o.buyer.username,
        } : null,
        seller: o.product?.seller ? {
            id: o.product.seller.id,
            username: o.product.seller.username,
        } : null,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
    };
};