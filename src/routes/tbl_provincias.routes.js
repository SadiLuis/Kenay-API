import {Router} from "express"; 

const router = Router();

import {getTbl_provinciass, createTbl_provincias, getTbl_provincias, updateTbl_provincias, deleteTbl_provincias} from '../controllers/Tbl_provincias.controller.js'; // Assuming you have a controller for Tbl_provinciass

// Define routes for Tbl_provinciass
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_provinciass', getTbl_provinciass);

router.get('/Tbl_provincias/:id', getTbl_provincias);

router.post('/Tbl_provincias', createTbl_provincias);

router.patch('/Tbl_provincias/:id', updateTbl_provincias); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/Tbl_provincias/:id', deleteTbl_provincias);


export default router;