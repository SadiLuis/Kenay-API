import {Router} from "express"; 

const router = Router();

import {getTbl_provees, createTbl_provee, getTbl_provee, updateTbl_provee, deleteTbl_provee} from '../controllers/Tbl_provee.controller.js'; 

router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_provees', getTbl_provees);

router.get('/Tbl_provee/:id', getTbl_provee);

router.post('/Tbl_provee', createTbl_provee);

router.patch('/Tbl_provee/:id', updateTbl_provee); 

router.delete('/Tbl_provee/:id', deleteTbl_provee);


export default router;