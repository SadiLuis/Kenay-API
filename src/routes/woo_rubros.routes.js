import {Router} from "express"; 

const router = Router();

import { getWoo_rubros, getWoo_rubro, createWoo_rubro, updateWoo_rubro, deleteWoo_rubro  } from "../controllers/woo_rubros.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

router.get('/Woo_rubros', getWoo_rubros);

router.get('/Woo_rubro/:id', getWoo_rubro)

router.post('/Woo_rubro', createWoo_rubro);

router.put('/Woo_rubro/:id', updateWoo_rubro);

router.delete('/Woo_rubro/:id', deleteWoo_rubro);

export default router;