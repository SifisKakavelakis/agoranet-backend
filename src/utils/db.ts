import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    server: process.env.DB_SERVER || '',
    database: process.env.DB_NAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    options: {
        trustServerCertificate: true
    }
}

export const connectDB = async()=> {
    try {
        await mssql.connect(config);
        console.log("DB connected")
    } catch(err) {
        console.log("DB connection error:", err)
        process.exit(1);
    }
}