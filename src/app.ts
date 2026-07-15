import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import './models/index'; 
import { setupSwagger } from './swagger';
import productRoutes from './routes/product.routes';
import path from 'path';
import orderRoutes from './routes/order.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
app.use(express.json());
setupSwagger(app);

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/orders', orderRoutes);    
app.use(errorHandler);

export default app;
