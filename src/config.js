import { config } from "dotenv"; 
config(); // Load environment variables from .env file - con estas 2 lineas leo variables de entorno

// console.log(process.env.PORT);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_DATABASE);   

export const PORT = process.env.PORT || 2538;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '438800';
export const DB_DATABASE = process.env.DB_DATABASE || 'kenay_sa';