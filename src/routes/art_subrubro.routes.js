import {Router} from "express"; 

const router = Router();

import { getArt_subrubros, getArt_subrubro, createArt_subrubro, updateArt_subrubro, deleteArt_subrubro   } from "../controllers/art_subrubro.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/art_subrubros', getArt_subrubros);

router.get('/art_subrubro/:id', getArt_subrubro)

router.post('/art_subrubro', createArt_subrubro);

router.put('/art_subrubro/:id', updateArt_subrubro);

router.delete('/art_subrubro/:id', deleteArt_subrubro);

export default router;