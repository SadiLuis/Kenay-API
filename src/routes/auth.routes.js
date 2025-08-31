import {Router} from "express"; 

const router = Router();

import {authenticateToken, logoutback_user, deleteBack_user, getback_users, createBack_user, loginback_user, } from '../controllers/auth.controller.js';

//defino la ruta de registro de usuarios 
//authcontroller.register; // Route to handle user registration
//RUTAS Q USO EN EL FRONT
router.get('/back_users' ,authenticateToken, getback_users);
router.post('/register', createBack_user);
router.post('/login', loginback_user);
router.delete('/back_user/:id', deleteBack_user);
router.get('/login', logoutback_user);

//router.post('/postregister', authcontroller.register); // Route to handle user registration


export default router;