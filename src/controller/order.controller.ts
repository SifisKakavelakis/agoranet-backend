import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';
import { CreateOrderDTO, UpdateOrderStatusDTO } from '../dto/order.dto';
import { toOrderResponseDTO } from '../mappers/order.mapper';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buyerId = req.user!.id;
        const data: CreateOrderDTO = req.body;
        const order = await orderService.createOrder(buyerId, data);
        if (!order) return res.status(400).json({ message: 'Order could not be created' });
        res.status(201).json({ status: true, data: toOrderResponseDTO(order) });
    } catch (err) {
        next(err);
    }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buyerId = req.user!.id;
        const orders = await orderService.getMyOrders(buyerId);
        res.status(200).json({ status: true, data: orders.map(toOrderResponseDTO) });
    } catch (err) {
        next(err);
    }
};

export const getSellerOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sellerId = req.user!.id;
        const orders = await orderService.getSellerOrders(sellerId);
        res.status(200).json({ status: true, data: orders.map(toOrderResponseDTO) });
    } catch (err) {
        next(err);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId  = parseInt(req.params.id as string);
        const sellerId = req.user!.id;
        const { status }: UpdateOrderStatusDTO = req.body;
        const order = await orderService.updateOrderStatus(orderId, sellerId, status);
        if (!order) return res.status(400).json({ message: 'Order could not be updated' });
        res.status(200).json({ status: true, data: toOrderResponseDTO(order) });
    } catch (err) {
        next(err);
    }
};

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = parseInt(req.params.id as string);
        const buyerId = req.user!.id;
        const order = await orderService.cancelOrder(orderId, buyerId);
        if (!order) return res.status(400).json({ message: 'Order could not be cancelled' });
        res.status(200).json({ status: true, data: toOrderResponseDTO(order) });
    } catch (err) {
        next(err);
    }
};