
import {Router} from "express"; 

const router = Router();

import { getCaja_med_pagos, getCaja_med_pago } from "../controllers/caja_med_pago.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

router.get('/Caja_med_pagos', getCaja_med_pagos);

router.get('/Caja_med_pago/:id', getCaja_med_pago)

export default router;