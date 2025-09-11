import {Router} from "express"; 

const router = Router();

import {getPresup_detalles, getPresup_detalle, createPresup_detalle, updatePresup_detalle, deletePresup_detalle} from '../controllers/presup_detalle.controller.js';

// // Define routes for Clients
// router.get('/', (req, res) => {
//   res.send('Estas en la raíz de la API de KENAY SA');
// });

router.get('/Presup_detalles', getPresup_detalles);

router.get('/Presup_detalle/:id', getPresup_detalle);

router.post('/Presup_detalle', createPresup_detalle);

router.patch('/Presup_detalle/:id', updatePresup_detalle); 

router.delete('/Presup_detalle/:id', deletePresup_detalle);

// export default router;
export default router;