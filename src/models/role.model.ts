import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export type RoleName = 'guest' | 'buyer' | 'seller' | 'admin';

export interface IRole {
  id?:        number;
  name:       RoleName;
  createdAt?: Date;
}

export class Role extends Model<IRole> implements IRole {
  declare id:        number;
  declare name:      RoleName;
  declare createdAt: Date;
}

Role.init(
  {
    id: {
      type:          DataTypes.TINYINT.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    name: {
      type:      DataTypes.ENUM('guest', 'buyer', 'seller', 'admin'),
      allowNull: false,
      unique:    true,
    },
    createdAt: {
      type:         DataTypes.DATE,
      field:        'created_at',
      defaultValue: DataTypes.NOW,  // ← αυτόματα η ώρα δημιουργίας
    },
  },
  {
    sequelize,
    tableName:  'roles',
    modelName:  'Role',
    timestamps: false,
  }
);