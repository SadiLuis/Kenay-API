import {Router} from "express"; 

const router = Router();

import { gettbl_Matatiposs, gettbl_Matatipos, createtbl_Matatipos, updatetbl_Matatipos, deletetbl_Matatipos   } from "../controllers/tbl_Matatipos.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/tbl_Matatiposs', gettbl_Matatiposs);

router.get('/tbl_Matatipos/:id', gettbl_Matatipos)

router.post('/tbl_Matatipos', createtbl_Matatipos);

router.put('/tbl_Matatipos/:id', updatetbl_Matatipos);

router.delete('/tbl_Matatipos/:id', deletetbl_Matatipos);

export default router;