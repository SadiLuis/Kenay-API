import { config } from "dotenv"; 
config(); // Load environment variables from .env file - con estas 2 lineas leo variables de entorno

// console.log(process.env.PORT);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_DATABASE);   

export const PORT = process.env.PORT || 3000;