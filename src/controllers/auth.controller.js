
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
        const [rows] = await pool.query('SELECT * FROM kenay_sa.back_user');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing back_user');
    }
};

//log out
export const logoutback_user = async (req, res) => {
    try {
        res.clearCookie('jtw')
        return res.redirect('/api/login')
    } catch (err) {
        console.error(err);
        res.status(500).send('Error log out_user');
    }
};


export const createBack_user = async (req, res) => {
    const { name, user, pass } = req.body;
    try {
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
        } else {
            console.log(user, name, pass);
            console.log(rows);
            //res.status(201).send('Error Creando Usuario porque ya existe en la tabla' + JSON.stringify(req.body));            
            console.log('Error creando Back_user: el usuario ya existe');
            res.redirect('/api/register');
        }
    } catch (err) {
        console.error(err);
        console.log("Error creando Back_user", { user, name, pass });
        res.render('index')
        res.status(500).send('Error creating Back_user');
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
            const [result] = await pool.query('SELECT * FROM kenay_sa.back_user WHERE back_user = ?', [user]);

            if ((await bcrypt.compare(pass, result[0].back_userpass))) {
                // ... después de verificar la contraseña
                const payload = { idback_user: user };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
                console.log(user, pass);
                console.log("login ok");
                console.log("TOKEN", token)
                //res.redirect('/api/raiz')
                //para mostrar en cabezera el token
                //res.statos(200).json(user, pass, token)
                //let nDatos = {user, pass, token}
                res.json(token);                   
                //res.render("/api/back_users", token)                       
                //res.status(200).json({ message: "Login successful" });

            } else {
            console.log("Datos incorrectos Usuario o Contraseña")
            res.redirect("/login")

        }}
    } catch (err) {
        console.error("Login function error:", err);
        // Send a generic error response to the client
        res.status(500).json({ message: "An internal server error occurred." });
    }
};

// Middleware
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);

    if (token == null)
        return res.status(401).send("token requerido");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log(user)
        req.user = user;
        next();
    })
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
