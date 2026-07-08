import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

export interface IUser {
    id?: number;
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber?: string | null;
    isActive?: boolean;
    avatarUrl?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User extends Model<IUser> implements IUser {
    declare id: number;
    declare username: string;
    declare password: string;
    declare email: string;
    declare firstname: string;
    declare lastname: string;
    declare phoneNumber: string | null;
    declare isActive: boolean;
    declare avatarUrl: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'first_name',
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'last_name',
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: 'phone_number',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'is_active',
        },
        avatarUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: 'avatar_url',
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default User;