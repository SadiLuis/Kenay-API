
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
// Your route handling code goes here

//login
export const getback_users = async (req, res) => {
    try {
        //throw new Error("My error"); //error para pruebas
        const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
        // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
        console.log("cookiedata de woo_rubros", cookieData)
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
        console.error(err);
        res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
    }
}


//log out
export const logoutback_user = async (req, res) => {
    // try {
    //     res.clearCookie('jtw')
    //     return res.redirect('/api/login')
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Error log out_user');
    // }
    res.cookie('user_data', '', { expires: new Date(0), httpOnly: true });
    res.status(200).send({ message: 'Logout exitoso' });
};

export const createBack_user = async (req, res) => {
    const { name, user, pass } = req.body;
    try {
        //throw new Error("My error"); //error para pruebas
        const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
        // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
        console.log("cookiedata de woo_rubros", cookieData)
        const token = cookieData.token;
        if (!token) {
            return res.status(403).send('Acceso no Autorizado, no llega token')
        } else {
            console.log(req.body);
            //verifico si el usuario ya existe
            const [rows] = await pool.query('SELECT * FROM kenay_sa.back_user WHERE back_user = ?', [user]);
            if (rows.length <= 0) {
                var passwordHash = await bcrypt.hash(pass, 8); //hash de la contraseña
                console.log(passwordHash);
                await pool.query('INSERT INTO kenay_sa.back_user SET ?', { back_user: user, back_username: name, back_userpass: passwordHash })
                console.log('usuario no encontrado y Creado Nuevo');
                //res.status(201).send('Creado User Nuevo' + JSON.stringify(req.body));
                res.redirect('/api/login');
            } 
            if (rows.length >= 0) {
                console.log(user, name, pass);
                console.log(rows);
                //res.status(201).send('Error Creando Usuario porque ya existe en la tabla' + JSON.stringify(req.body));            
                console.log('Error creando Back_user: el usuario ya existe');
                res.redirect('/api/register');              

            }}} catch (err) {
                console.error(err);
                console.log("Error creando Back_user", { user, name, pass });
                console.error(err);
                res.status(401).send('REGISTRO CANCELADO - Acceso no Autorizado sin Token o permisos')
                // res.render('index')
                // res.status(500).send('Error creating Back_user');
                //res.redirect('/api/register');
            }
        };

        //metodo para loguear usuarios y debe ser un post
        export const loginback_user = async (req, res) => {
            try {
                const user = req.body.user;
                const pass = req.body.pass;
                if (!user || !pass) {
                    return res.status(400).json({ message: "Username and password are required" });
                } else {
                    const [result] = await pool.query('SELECT * FROM kenay_sa.back_user WHERE back_user = ?', user);
                    //console.log("RESULT",result)
                    if (result <= 0 || result == []) {
                        res.redirect('/api/login')
                        console.log('contraseña incorrecta o usuario', result)
                    } else {
                        if ((await bcrypt.compare(pass, result[0].back_userpass))) {
                            //const user = result[0].back_user
                            // ... después de verificar la contraseña
                            const payload = { user };
                            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
                            console.log(user, pass);
                            console.log("login ok");
                            console.log("TOKEN", token)
                            res.cookie('user_data', JSON.stringify({ user, token }), { httpOnly: true, maxAge: 3600000 });
                            // res
                            //     .cookie('access_token', token, {
                            //         httpOnly: true, //solo accede desde el servidor                        
                            //         maxAge: 1000 * 60 * 60,
                            //     })
                            const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
                            res.json(cookieData);
                            //ENVIA A INDEX 
                            // res.render('index.ejs', {
                            //     pageTitle: 'Página de Inicio',
                            //     userData: cookieData // Envía los datos de la cookie a la vista
                            // });


                            //.send({user, token})
                            //.render("/api/raiz", user, token)
                            //res.status(200).json({ message: "Login successful" } , token); 
                            // const cookiesOptions = {
                            //     expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES *24 * 60 *60 *1000),
                            //     
                            // }
                            // res.cookie(jwt, token, cookiesOptions) 

                        } else {
                            console.log("Datos incorrectos Usuario o Contraseña")
                            res.redirect("/login")
                        }
                    }
                };
            } catch (err) {
                console.error("Login function error:", err);
                // Send a generic error response to the client
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
            // Obtener el encabezado de autorización
            // const authHeader = req.headers['authorization'];
            // // Extraer el token (formato: "Bearer TOKEN")
            // //const token = authHeader && authHeader.split(' ')[1];
            // console.log("authHeader", authHeader);
            // const token = req.cookies.access_token
            // console.log ('token con cookie', token)
            // if (!token) {
            //     return res.status(403).send('Acceso no Autorizado') 
            // } else {
            //     const data = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            //         if (err) return res.sendStatus(403);
            //         console.log("Token", data)
            //         req.user = user;
            //         next();
            //     })
            // }
        }

        export const deleteBack_user = async (req, res) => {
            try {
                const [result] = await pool.query('DELETE FROM kenay_sa.back_user WHERE idback_user = ?', [req.params.id]);
                if (result.affectedRows <= 0) return res.status(404).json({
                    message: 'Back_user not found'
                });
                //res.sendStatus(204); // 204 OK
                res.json({ message: 'Back_user deleted successfully: ' + req.params.id });
            } catch (err) {
                console.error(err);
                res.status(500).send('Error deleting Back_user');
            }
        };
