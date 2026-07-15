import * as orderDAO from '../dao/order.dao';
import * as productDAO from '../dao/product.dao';
import { CreateOrderDTO } from '../dto/order.dto';

export const createOrder = async (buyerId: number, payload: CreateOrderDTO) => {
    const product = await productDAO.findById(payload.productId);
    if (!product) return null;
    if (!product.isActive) return null;
    if (product.sellerId === buyerId) return null;
    const order = await orderDAO.createOrder({
        buyerId,
        productId:  payload.productId,
        totalPrice: product.price,
    });
    await productDAO.updateProduct(payload.productId, { isActive: false });
    return await orderDAO.findById(order.id);
};

export const getMyOrders = async (buyerId: number) => {
    return await orderDAO.findByBuyer(buyerId);
};

export const getSellerOrders = async (sellerId: number) => {
    return await orderDAO.findBySeller(sellerId);
};

export const updateOrderStatus = async (
    orderId:  number,
    sellerId: number,
    status:   'confirmed' | 'cancelled'
) => {
    const order = await orderDAO.findById(orderId);
    if (!order) return null;
    const product = await productDAO.findById((order as any).productId);
    if (!product || product.sellerId !== sellerId) return null;
    if (order.status !== 'pending') return null;

    return await orderDAO.updateStatus(orderId, status);
};

export const cancelOrder = async (orderId: number, buyerId: number) => {
    const order = await orderDAO.findById(orderId);
    if (!order) return null;
    if (order.buyerId !== buyerId) return null;
    if (order.status !== 'pending') return null;
    await productDAO.updateProduct(order.productId, { isActive: true });

    return await orderDAO.updateStatus(orderId, 'cancelled');
};