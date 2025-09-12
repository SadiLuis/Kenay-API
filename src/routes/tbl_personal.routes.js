import {Router} from "express"; 

const router = Router();

import {getTbl_personals, createTbl_personal, getTbl_personal, updateTbl_personal, deleteTbl_personal} from '../controllers/tbl_personal.controller.js'; 

router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_personals', getTbl_personals);

router.get('/Tbl_personal/:id', getTbl_personal);

router.post('/Tbl_personal', createTbl_personal);

router.patch('/Tbl_personal/:id', updateTbl_personal);

router.delete('/Tbl_personal/:id', deleteTbl_personal);


export default router;