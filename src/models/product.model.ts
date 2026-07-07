import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface IProduct {
  id?:          number;
  sellerId:     number;
  categoryId:   number;
  title:        string;
  description?: string | null;
  price:        number;
  isActive?:    boolean;
  createdAt?:   Date;
  updatedAt?:   Date;
}

export class Product extends Model<IProduct> implements IProduct {
  declare id:          number;
  declare sellerId:    number;
  declare categoryId:  number;
  declare title:       string;
  declare description: string | null;
  declare price:       number;
  declare isActive:    boolean;
  declare createdAt:   Date;
  declare updatedAt:   Date;
}

Product.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    sellerId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'seller_id',
    },
    categoryId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'category_id',
    },
    title: {
      type:      DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type:      DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type:      DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    isActive: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: true,
      field:        'is_active',
    },
    createdAt: {
      type:  DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type:  DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName:  'products',
    modelName:  'Product',
    timestamps: true,
    createdAt:  'created_at',
    updatedAt:  'updated_at',
  }
);

export default Product;