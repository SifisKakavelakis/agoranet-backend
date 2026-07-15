import { Order, IOrder } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { ProductImage } from '../models/product-image.model';

const orderIncludes = [
    {
        model: Product,
        as: 'product',
        include: [{ model: ProductImage, as: 'images' }],
    },
    {
        model: User,
        as: 'buyer',
        attributes: ['id', 'username'],
    },
];

export const createOrder = async (data: Partial<IOrder>): Promise<Order> => {
    return await Order.create(data as IOrder);
};

export const findById = async (id: number): Promise<Order | null> => {
    return await Order.findOne({
        where: { id },
        include: orderIncludes,
    });
};

export const findByBuyer = async (buyerId: number): Promise<Order[]> => {
    return await Order.findAll({
        where: { buyerId },
        include: orderIncludes,
    });
};

export const findBySeller = async (sellerId: number): Promise<Order[]> => {
    return await Order.findAll({
        include: [
            {
                model: Product,
                as: 'product',
                where: { sellerId },
                include: [{ model: ProductImage, as: 'images' }],
            },
            {
                model: User,
                as: 'buyer',
                attributes: ['id', 'username'],
            },
        ],
    });
};

export const updateStatus = async (
    id: number,
    status: 'pending' | 'confirmed' | 'cancelled'
): Promise<Order | null> => {
    await Order.update({ status }, { where: { id } });
    return await findById(id);
};