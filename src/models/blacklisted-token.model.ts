import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface IBlacklistedToken {
  id?:        number;
  token:      string;
  createdAt?: Date;
}

export class BlacklistedToken extends Model<IBlacklistedToken> implements IBlacklistedToken {
  declare id:        number;
  declare token:     string;
  declare createdAt: Date;
}

BlacklistedToken.init(
  {
    id: {
      type:          DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:    true,
    },
    token: {
      type:      DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type:  DataTypes.DATE,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName:  'blacklisted_tokens',
    modelName:  'BlacklistedToken',
    timestamps: false,
  }
);

export default BlacklistedToken;