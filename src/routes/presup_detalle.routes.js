import {Router} from "express"; 

const router = Router();

import {getPresup_detalles, createPresup_detalle, getPresup_detalle, updatePresup_detalle, deletePresup_detalle} from '../controllers/presup_detalle.controller.js'; // Assuming you have a controller for Presup_detalles

// Define routes for Clients
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Presup_detalles', getPresup_detalles);

router.get('/Presup_detalle/:id', getPresup_detalle);

router.post('/Presup_detalle', createPresup_detalle);

router.patch('/Presup_detalle/:id', updatePresup_detalle); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/Presup_detalle/:id', deletePresup_detalle);


export default router;