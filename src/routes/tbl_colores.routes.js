import {Router} from "express"; 

const router = Router();

import {getTbl_Coloress, createTbl_Colores, getTbl_Colores, updateTbl_Colores, deleteTbl_Colores} from '../controllers/tbl_colores.controller.js';

router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_Coloress', getTbl_Coloress);

router.get('/Tbl_Colores/:id', getTbl_Colores);

router.post('/Tbl_Colores', createTbl_Colores);

router.patch('/Tbl_Colores/:id', updateTbl_Colores); 

router.delete('/Tbl_Colores/:id', deleteTbl_Colores);


export default router;