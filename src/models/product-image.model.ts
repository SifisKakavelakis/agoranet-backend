import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface IProductImage {
  id?:        number;
  productId:  number;
  url:        string;
  isPrimary?: boolean;
  createdAt?: Date;
}

export class ProductImage extends Model<IProductImage> implements IProductImage {
  declare id:        number;
  declare productId: number;
  declare url:       string;
  declare isPrimary: boolean;
  declare createdAt: Date;
}

ProductImage.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    productId: {
      type:      DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field:     'product_id',
    },
    url: {
      type:      DataTypes.STRING(500),
      allowNull: false,
    },
    isPrimary: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: false,
      field:        'is_primary',
    },
    createdAt: {
      type:  DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName:  'product_images',
    modelName:  'ProductImage',
    timestamps: false,
  }
);

export default ProductImage;