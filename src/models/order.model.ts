import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

export interface IOrder {
  id?:         number;
  buyerId:     number;
  productId:   number;
  totalPrice:  number;
  status?:     OrderStatus;
  createdAt?:  Date;
  updatedAt?:  Date;
}

export class Order extends Model<IOrder> implements IOrder {
  declare id:         number;
  declare buyerId:    number;
  declare productId:  number;
  declare totalPrice: number;
  declare status:     OrderStatus;
  declare createdAt:  Date;
  declare updatedAt:  Date;
}

Order.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    buyerId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'buyer_id',
    },
    productId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'product_id',
    },
    totalPrice: {
      type:      DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field:     'total_price',
    },
    status: {
      type:         DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      allowNull:    false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName:  'orders',
    modelName:  'Order',
    timestamps: true,
    createdAt:  'created_at',
    updatedAt:  'updated_at',
  }
);

export default Order;