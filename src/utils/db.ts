import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME     || '',
  process.env.DB_USER     || '',
  process.env.DB_PASSWORD || '',
  {
    host:    process.env.DB_HOST || 'localhost',
    port:    parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: false,
    pool: {
      max:     10,
      min:     0,
      acquire: 30000,
      idle:    10000,
    },
  }
);

export const connectDB = async(): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("DB connected")
    } catch(err) {
        console.error("DB connection error:", err)
        process.exit(1);
    }
} 