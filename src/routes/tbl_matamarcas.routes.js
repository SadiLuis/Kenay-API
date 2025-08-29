import {Router} from "express"; 

const router = Router();

import { gettbl_Matamarcass, gettbl_Matamarcas, createtbl_Matamarcas, updatetbl_Matamarcas, deletetbl_Matamarcas   } from "../controllers/tbl_Matamarcas.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/tbl_Matamarcass', gettbl_Matamarcass);

router.get('/tbl_Matamarcas/:id', gettbl_Matamarcas)

router.post('/tbl_Matamarcas', createtbl_Matamarcas);

router.put('/tbl_Matamarcas/:id', updatetbl_Matamarcas);

router.delete('/tbl_Matamarcas/:id', deletetbl_Matamarcas);

export default router;