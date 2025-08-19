import {Router} from "express"; 

const router = Router();

import { getArt_rubros, getArt_rubro, createArt_rubro, updateArt_rubro, deleteArt_rubro   } from "../controllers/art_rubro.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/art_rubros', getArt_rubros);

router.get('/art_rubro/:id', getArt_rubro)

router.post('/art_rubro', createArt_rubro);

router.put('/art_rubro/:id', updateArt_rubro);

router.delete('/art_rubro/:id', deleteArt_rubro);

export default router;