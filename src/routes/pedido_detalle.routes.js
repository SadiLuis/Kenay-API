import {Router} from "express"; 

const router = Router();

import {getpedido_detalles, createpedido_detalle, getpedido_detalle, updatepedido_detalle, deletepedido_detalle} from '../controllers/pedido_detalle.controller.js';

router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/pedido_detalles', getpedido_detalles);

router.get('/pedido_detalle/:id', getpedido_detalle);

router.post('/pedido_detalle', createpedido_detalle);

router.patch('/pedido_detalle/:id', updatepedido_detalle);

router.delete('/pedido_detalle/:id', deletepedido_detalle);


export default router;