import {Router} from "express"; 

const router = Router();

import { getArt_depositos, getArt_deposito, createArt_deposito, updateArt_deposito, deleteArt_deposito   } from "../controllers/art_deposito.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/art_depositos', getArt_depositos);

router.get('/art_deposito/:id', getArt_deposito)

router.post('/art_deposito', createArt_deposito);

router.put('/art_deposito/:id', updateArt_deposito);

router.delete('/art_deposito/:id', deleteArt_deposito);

export default router;