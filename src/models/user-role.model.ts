import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export class UserRole extends Model {}

UserRole.init(
    {
        userId: {
            type:       DataTypes.INTEGER.UNSIGNED,
            field:      'user_id',
            primaryKey: true,
        },
        roleId: {
            type:       DataTypes.TINYINT.UNSIGNED,
            field:      'role_id',
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName:  'user_roles',
        modelName:  'UserRole',
        timestamps: true,
        createdAt:  'created_at',
        updatedAt:  'updated_at',
    }
);