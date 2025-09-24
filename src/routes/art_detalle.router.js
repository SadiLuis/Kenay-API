import {Router} from "express"; 

const router = Router();

import { getArt_detalles, getArt_detallesPaginate, getArt_detalle, createArt_detalle, updateArt_detalle, deleteArt_detalle   } from "../controllers/art_detalle.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});


router.get('/Art_detalles', getArt_detalles);

router.get('/Art_detallesPaginate', getArt_detallesPaginate);

router.get('/Art_detalle/:id', getArt_detalle)

router.post('/Art_detalle', createArt_detalle);

router.put('/Art_detalle/:id', updateArt_detalle);

router.delete('/Art_detalle/:id', deleteArt_detalle);

export default router;