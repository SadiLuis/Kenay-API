import {Router} from "express"; 

const router = Router();

import { getCombo_arts, getCombo_art, createCombo_art, updateCombo_art, deleteCombo_art   } from "../controllers/Combo_art.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});


router.get('/Combo_arts', getCombo_arts);

router.get('/Combo_art/:id', getCombo_art)

router.post('/Combo_art', createCombo_art);

router.put('/Combo_art/:id', updateCombo_art);

router.delete('/Combo_art/:id', deleteCombo_art);

export default router;