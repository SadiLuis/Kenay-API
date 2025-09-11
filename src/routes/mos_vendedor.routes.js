import {Router} from "express"; 

const router = Router();

import {getMos_vendedors, createMos_vendedor, getMos_vendedor, updateMos_vendedor, deleteMos_vendedor} from '../controllers/mos_vendedor.controller.js'; 

// Define routes for employees
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/mos_vendedors', getMos_vendedors);

router.get('/mos_vendedor/:id', getMos_vendedor);

router.post('/mos_vendedor', createMos_vendedor);

router.patch('/mos_vendedor/:id', updateMos_vendedor); 

router.delete('/mos_vendedor/:id', deleteMos_vendedor);


export default router;