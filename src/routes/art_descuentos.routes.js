import {Router} from "express"; 

const router = Router();

import { getArt_descuentos, getArt_descuento, createArt_descuento, updateArt_descuento, deleteArt_descuento   } from "../controllers/art_descuentos.controller.js";

router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

router.get('/art_descuentos', getArt_descuentos);

router.get('/art_descuento/:id', getArt_descuento)

router.post('/art_descuento', createArt_descuento);

router.put('/art_descuento/:id', updateArt_descuento);

router.delete('/art_descuento/:id', deleteArt_descuento);

export default router;