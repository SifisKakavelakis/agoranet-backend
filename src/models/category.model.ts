import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface ICategory {
  id?:        number;
  name:       string;
  createdAt?: Date;
}

export class Category extends Model<ICategory> implements ICategory {
  declare id:        number;
  declare name:      string;
  declare createdAt: Date;
}

Category.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    name: {
      type:      DataTypes.STRING(100),
      allowNull: false,
      unique:    true,
    },
    createdAt: {
      type:  DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName:  'categories',
    modelName:  'Category',
    timestamps: false,
  }
);

export default Category;