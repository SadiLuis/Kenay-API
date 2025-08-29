import {Router} from "express"; 

const router = Router();

import { getAla_usuarios, getAla_usuario, createAla_usuario, updateAla_usuario, deleteAla_usuario   } from "../controllers/ala_usuarios.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/Ala_usuarios', getAla_usuarios);

router.get('/Ala_usuario/:id', getAla_usuario)

router.post('/Ala_usuario', createAla_usuario);

router.put('/Ala_usuario/:id', updateAla_usuario);

router.delete('/Ala_usuario/:id', deleteAla_usuario);

export default router;