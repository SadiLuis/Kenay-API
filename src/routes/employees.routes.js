import {Router} from "express"; 

const router = Router();

import {getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee} from '../controllers/employees.controller.js'; // Assuming you have a controller for employees

// Define routes for employees
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployee);

router.patch('/employees/:id', updateEmployee); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/employees/:id', deleteEmployee);


export default router;