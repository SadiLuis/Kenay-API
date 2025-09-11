import {Router} from "express"; 

const router = Router();

import {getTbl_lista_precios, createTbl_lista_precio, getTbl_lista_precio, updateTbl_lista_precio, deleteTbl_lista_precio} from '../controllers/tbl_lista_precios.controller.js'; 


router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_lista_precios', getTbl_lista_precios);

router.get('/Tbl_lista_precios/:id', getTbl_lista_precio);

router.post('/Tbl_lista_precios', createTbl_lista_precio);

router.patch('/Tbl_lista_precios/:id', updateTbl_lista_precio); 

router.delete('/Tbl_lista_precios/:id', deleteTbl_lista_precio);


export default router;

