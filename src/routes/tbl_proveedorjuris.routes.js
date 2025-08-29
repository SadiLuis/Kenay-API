import {Router} from "express"; 

const router = Router();

import {getTbl_proveedorjuriss, createTbl_proveedorjuris, getTbl_proveedorjuris, updateTbl_proveedorjuris, deleteTbl_proveedorjuris} from '../controllers/Tbl_proveedorjuris.controller.js'; // Assuming you have a controller for Tbl_proveedorjuriss

// Define routes for Tbl_proveedorjuriss
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_proveedorjuriss', getTbl_proveedorjuriss);

router.get('/Tbl_proveedorjuris/:id', getTbl_proveedorjuris);

router.post('/Tbl_proveedorjuris', createTbl_proveedorjuris);

router.patch('/Tbl_proveedorjuris/:id', updateTbl_proveedorjuris); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/Tbl_proveedorjuris/:id', deleteTbl_proveedorjuris);


export default router;