
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js';;
import express from 'express';
import { promisify } from 'util';
import { render } from 'ejs';
import { Console } from 'console';


const app = express();
// Middleware to parse JSON bodies 
app.use(express.json());

export const getback_users = async (req, res) => {
    try {
        //throw new Error("My error"); //error para pruebas
        const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
        // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
        // console.log("cookiedata de woo_rubros", cookieData)
        const token = cookieData.token;
        if (!token) {
            return res.status(403).send('Acceso no Autorizado, no llega token')
        } else {
            //throw new Error("My error"); //error para pruebas
            const [rows] = await pool.query('SELECT * FROM kenay_sa.back_user');
            res.json(rows);
        }
    }
    catch (err) {
        res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
    }
}


//log out
export const logoutback_user = async (req, res) => {
    res.cookie('user_data', '', { expires: new Date(0), httpOnly: true });
    res.status(200).send({ message: 'Logout exitoso' });
};

export const createBack_user = async (req, res) => {
    const { name, user, pass } = req.body;
    try {
        //throw new Error("My error"); //error para pruebas
        const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
        // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
        // console.log("cookiedata de woo_rubros", cookieData)
        const token = cookieData.token;
        if (!token) {
            return res.status(403).send('Acceso no Autorizado, no llega token')
        } else {
            // console.log(req.body);
            //verifico si el usuario ya existe
            const [rows] = await pool.query('SELECT * FROM kenay_sa.back_user WHERE back_user = ?', [user]);
            if (rows.length <= 0) {
                var passwordHash = await bcrypt.hash(pass, 8); //hash de la contraseña
                // console.log(passwordHash);
                await pool.query('INSERT INTO kenay_sa.back_user SET ?', { back_user: user, back_username: name, back_userpass: passwordHash })
                // console.log('usuario no encontrado y Creado Nuevo');
                //res.status(201).send('Creado User Nuevo' + JSON.stringify(req.body));
                res.redirect('/api/login');
            }
            if (rows.length >= 0) {
                // console.log(user, name, pass);
                // console.log(rows);
                //res.status(201).send('Error Creando Usuario porque ya existe en la tabla' + JSON.stringify(req.body));            
                // console.log('Error creando Back_user: el usuario ya existe');
                res.redirect('/api/register');

            }
        }
    } catch (err) {
        // console.log("Error creando Back_user", { user, name, pass });
        res.status(401).send('REGISTRO CANCELADO - Acceso no Autorizado sin Token o permisos')
        // res.render('index')
        // res.status(500).send('Error creating Back_user');
        //res.redirect('/api/register');
    }
};

//metodo para loguear usuarios y debe ser un post
// export const loginback_user = async (req, res) => {
//     try {
//         const user = req.body.user;
//         const pass = req.body.pass;
//         const horaActual = new Date();

//         // 1. Obtener la IP del cliente de forma segura
//         const clientIp = req.headers['x-forwarded-for'] || req.ip;        
//         // 2. Obtener el país de origen de la IP
//         let country = 'Desconocido';
//         try {
//             const geo = geoip.lookup(clientIp);
//             if (geo && geo.country) {
//                 country = geo.country;
//             }
//         } catch (geoError) {
//             console.error('Error al obtener la geolocalización:', geoError);
//         }

//         if (!user || !pass) {
//             return res.status(400).json({ message: "Username and password are required" });
//         } else {
//             const [result] = await pool.query('SELECT * FROM kenay_sa.back_user WHERE back_user = ?', user);
//             //console.log("RESULT",result)
//             if (result <= 0 || result == []) {
//                 res.redirect('/api/login')
//                 console.log('contraseña incorrecta o usuario, ', `hora actual: ${horaActual.toLocaleTimeString()}`)
//             } else {
//                 if ((await bcrypt.compare(pass, result[0].back_userpass))) {
//                     // ... después de verificar la contraseña
//                     const payload = { user };
//                     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
//                     res.cookie('user_data', JSON.stringify({ user, token }), { httpOnly: true, maxAge: 3600000 });
//                     const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
//                     // 1. Obtener la IP del cliente de forma segura                    
//                     console.log(`Solicitud de acceso desde la IP: ${clientIp}`);
//                     //Hora y estado ok del login
//                     console.log('Login Correcto!!!')   
//                     // 3. Loguear la IP y el país de acceso
//                     console.log(`País: ${country}, hora actual: ${horaActual.toLocaleTimeString()}`);                 
//                     res.json(cookieData);
//                 } else {
//                     console.log("Datos incorrectos Usuario/Contraseña:", `hora actual: ${horaActual.toLocaleTimeString()}`)
//                     res.redirect("/login")
//                 }
//             }
//         };
//     } catch (err) {
//         res.status(500).json({ message: "An internal server error occurred." });
//     }
// };
export const loginback_user = async (req, res) => {
    try {
        const user = req.body.user;
        const pass = req.body.pass;
        const horaActual = new Date();
        
        // 1. Obtener la IP del cliente de forma segura
        const clientIp = req.headers['x-forwarded-for'] || req.ip;

        // 2. Realizar la llamada a la API de Abstract API de forma asíncrona
        let country = 'Desconocido';
        let city = 'Desconocido';        
        try {
            //const clientIpdev = process.env.CLIENTIPDEV;
            const clientIpdev = clientIp
            const abstractApiToken = process.env.ABSTRACT_API_TOKEN;
            if (abstractApiToken) {
                //const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${abstractApiToken}&ip_address=181.126.119.210`);
                const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${abstractApiToken}&ip_address=${clientIpdev}`);
                if (response.ok) {
                    const geoInfo = await response.json();
                    country = geoInfo.country || country;
                    city = geoInfo.city || city;
                }
            } else {
                console.log('ADVERTENCIA: No se ha configurado el token de Abstract API en las variables de entorno.');
            }
        } catch (apiError) {
            console.error("Error al consultar la API de Abstract API:", apiError.message);
        }
        
        if (!user || !pass) {
            return res.status(400).json({ message: "Username and password are required" });
        } else {
            const [result] = await pool.query('SELECT * FROM kenay_sa.back_user WHERE back_user = ?', user);
            
            if (result.length === 0) {
                res.redirect('/api/login');
                console.log('Contraseña o usuario incorrecto', `hora actual: ${horaActual.toLocaleTimeString()}`);
            } else {
                if ((await bcrypt.compare(pass, result[0].back_userpass))) {
                    const payload = { user };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
                    res.cookie('user_data', JSON.stringify({ user, token }), { httpOnly: true, maxAge: 3600000 });
                    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;

                    // Loguear la IP, el país y la ciudad de acceso
                    console.log("Usuario ID:", result[0].idback_user);
                    console.log(`Login Correcto - IP: ${clientIp}, País: ${country}, Ciudad: ${city}, hora actual: ${horaActual.toLocaleTimeString()}`);
                    
                    res.json(cookieData);
                } else {
                    //console.log("Datos incorrectos Usuario/Contraseña:", `hora actual: ${horaActual.toLocaleTimeString()}`);
                    //res.redirect("/login");
                    res.status(403).send('Acceso no Autorizado, no llega token')
                }
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};


// Middleware
export const authenticateToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(403).send('Acceso no Autorizado')
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        req.user = user;
        next();
    } catch {
        res.status(401).send('acceso no Autorizado sin')
    }
}

export const deleteBack_user = async (req, res) => {
    try {
        const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
        const token = cookieData.token;
        if (!token) {
            return res.status(403).send('Acceso no Autorizado, no llega token')
        } else {
            const [result] = await pool.query('DELETE FROM kenay_sa.back_user WHERE idback_user = ?', [req.params.id]);
            if (result.affectedRows <= 0) return res.status(404).json({
                message: 'Back_user not found'
            });
            res.json({ message: 'Back_user deleted successfully: ' + req.params.id });
        }
    } catch (err) {
        res.status(500).send('Error deleting Back_user');
    }
};
