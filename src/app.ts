import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import './models/index'; 

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

export default app;
