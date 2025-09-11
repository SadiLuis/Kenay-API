import {Router} from "express"; 

const router = Router();

import {getIndexRegister, getIndexLogin, getIndexraiz, getIndex, createIndex, idIndex, updateIndex, deleteIndex} from '../controllers/index.controller.js';


// defino la ruta de login y vistas
router.get('/raiz', getIndexraiz); // Route to render the index page
router.get('/login', getIndexLogin); // Route to render the login page
router.get('/register', getIndexRegister); // Route to render the register page

// Define routes for indexes
router.get('/index', getIndex);

router.get('/index/:id', idIndex)

router.post('/index', createIndex);

router.put('/index/:id', updateIndex);

router.delete('/index/:id', deleteIndex);

export default router;
