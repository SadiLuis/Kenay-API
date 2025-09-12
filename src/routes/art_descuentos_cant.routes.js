import {Router} from "express"; 

const router = Router();

import { getArt_descuentos_cants, getArt_descuentos_cant, createArt_descuentos_cant, updateArt_descuentos_cant, deleteArt_descuentos_cant   } from "../controllers/Art_descuentos_cant.controller.js";

router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

router.get('/Art_descuentos_cants', getArt_descuentos_cants);

router.get('/Art_descuentos_cant/:id', getArt_descuentos_cant)

router.post('/Art_descuentos_cant', createArt_descuentos_cant);

router.put('/Art_descuentos_cant/:id', updateArt_descuentos_cant);

router.delete('/Art_descuentos_cant/:id', deleteArt_descuentos_cant);

export default router;