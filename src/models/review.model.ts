import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface IReview {
  id?:          number;
  reviewerId:   number;
  sellerId:     number;
  orderId:      number;
  rating:       number;
  comment?:     string | null;
  createdAt?:   Date;
}

export class Review extends Model<IReview> implements IReview {
  declare id:         number;
  declare reviewerId: number;
  declare sellerId:   number;
  declare orderId:    number;
  declare rating:     number;
  declare comment:    string | null;
  declare createdAt:  Date;
}

Review.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    reviewerId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'reviewer_id',
    },
    sellerId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'seller_id',
    },
    orderId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'order_id',
    },
    rating: {
      type:      DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    comment: {
      type:      DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type:  DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName:  'reviews',
    modelName:  'Review',
    timestamps: false,
  }
);

export default Review;