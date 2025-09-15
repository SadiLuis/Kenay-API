import {Router} from "express"; 

const router = Router();

import {getIndexRegister, getIndexLogin, getIndexraiz, getIndex, createIndex, idIndex, updateIndex, deleteIndex} from '../controllers/index.controller.js';


// defino la ruta de login y vistas
router.get('/raiz', getIndexraiz);
router.get('/login', getIndexLogin);
router.get('/register', getIndexRegister);


router.get('/index', getIndex);

router.get('/index/:id', idIndex)

router.post('/index', createIndex);

router.put('/index/:id', updateIndex);

router.delete('/index/:id', deleteIndex);

export default router;
