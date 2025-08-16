import {createPool} from 'mysql2/promise';
import { 
  DB_HOST, 
  DB_PORT, 
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD
} from './config';

export const pool = createPool({
  //host: 'DESKTOP-KOEIBM6', //si usamos en la nube, cambiar localhost por el nombre del servidor
  host: DB_HOST, //nombre del servidor de la base de datos en la nube
  port: DB_PORT, //puerto por defecto de MySQL
  user: DB_USER, //usuario de MySQL en servidor de KenaySA
  password: DB_PASSWORD, //contraseña del usuario root de MySQL en servidor de KenaySA
  database: DB_DATABASE
});


// ./ngrok.exe config add-authtoken 31Hr6zbpYLWpfwoxeDcWToCeRUu_5L81sNMU9YoGiopuBAZ4H
// ./ngrok.exe http 3000  //para exponer el servidor a internet, usar ngrok
//ngrok http 3000