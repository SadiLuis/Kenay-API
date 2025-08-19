import {Router} from "express"; 

const router = Router();

import {getTbl_clientes, createTbl_cliente, getTbl_cliente, updateTbl_cliente, deleteTbl_cliente} from '../controllers/tbl_clientes.controller.js'; // Assuming you have a controller for Clients

// Define routes for Clients
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Tbl_clientes', getTbl_clientes);

router.get('/Tbl_cliente/:id', getTbl_cliente);

router.post('/Tbl_cliente', createTbl_cliente);

router.patch('/Tbl_cliente/:id', updateTbl_cliente); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/Tbl_cliente/:id', deleteTbl_cliente);


export default router;