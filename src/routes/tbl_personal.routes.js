import {Router} from "express"; 

const router = Router();

import {getTbl_personals, createTbl_personal, getTbl_personal, updateTbl_personal, deleteTbl_personal} from '../controllers/tbl_personal.controller.js'; // Assuming you have a controller for Tbl_personals

// Define routes for Tbl_personals
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_personals', getTbl_personals);

router.get('/Tbl_personal/:id', getTbl_personal);

router.post('/Tbl_personal', createTbl_personal);

router.patch('/Tbl_personal/:id', updateTbl_personal); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/Tbl_personal/:id', deleteTbl_personal);


export default router;