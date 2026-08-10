import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface IWishlist {
  id?:        number;
  userId:     number;
  productId:  number;
  createdAt?: Date;
}

export class Wishlist extends Model<IWishlist> implements IWishlist {
  declare id:        number;
  declare userId:    number;
  declare productId: number;
  declare createdAt: Date;
}

Wishlist.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    userId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'user_id',
    },
    productId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'product_id',
    },
    createdAt: {
      type:  DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName:  'wishlist_items',
    modelName:  'Wishlist',
    timestamps: false,
  }
);

export default Wishlist;