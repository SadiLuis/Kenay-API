import {Router} from "express"; 

const router = Router();

import { getArt_talle_medidas, getArt_talle_medida, createArt_talle_medida, updateArt_talle_medida, deleteArt_talle_medida   } from "../controllers/art_talle_medida.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/art_talle_medidas', getArt_talle_medidas);

router.get('/art_talle_medida/:id', getArt_talle_medida)

router.post('/art_talle_medida', createArt_talle_medida);

router.put('/art_talle_medida/:id', updateArt_talle_medida);

router.delete('/art_talle_medida/:id', deleteArt_talle_medida);

export default router;