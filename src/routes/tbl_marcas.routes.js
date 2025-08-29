import {Router} from "express"; 

const router = Router();

import { gettbl_Marcass, gettbl_Marcas, createtbl_Marcas, updatetbl_Marcas, deletetbl_Marcas   } from "../controllers/tbl_Marcas.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/tbl_Marcass', gettbl_Marcass);

router.get('/tbl_Marcas/:id', gettbl_Marcas)

router.post('/tbl_Marcas', createtbl_Marcas);

router.put('/tbl_Marcas/:id', updatetbl_Marcas);

router.delete('/tbl_Marcas/:id', deletetbl_Marcas);

export default router;