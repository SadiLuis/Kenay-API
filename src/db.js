import {createPool} from 'mysql2/promise';

export const pool = createPool({
  //host: 'DESKTOP-KOEIBM6', //si usamos en la nube, cambiar localhost por el nombre del servidor
  host: 'localhost', //nombre del servidor de la base de datos en la nube
  port: 3306, //puerto por defecto de MySQL
  user: 'root', //usuario de MySQL en servidor de KenaySA
  password: '438800', //contraseña del usuario root de MySQL en servidor de KenaySA
  database: 'kenay_sa'
});


// ./ngrok.exe config add-authtoken 31Hr6zbpYLWpfwoxeDcWToCeRUu_5L81sNMU9YoGiopuBAZ4H
// ./ngrok.exe http 3000  //para exponer el servidor a internet, usar ngrok
//ngrok http 3000