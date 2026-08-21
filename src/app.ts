import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import './models/index'; 
import { setupSwagger } from './swagger';
import productRoutes from './routes/product.routes';
import path from 'path';
import orderRoutes from './routes/order.routes';
import { errorHandler } from './middlewares/error.middleware';
import reviewRoutes from './routes/review.routes';
import wishlistRoutes from './routes/wishlist.routes';
import cors from 'cors';

dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:      100,
    message:  { status: false, message: 'Too many requests, please try again later' },
});

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use('/api', limiter);
setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);  
app.use('/api/wishlist', wishlistRoutes);
app.use(errorHandler);

export default app;