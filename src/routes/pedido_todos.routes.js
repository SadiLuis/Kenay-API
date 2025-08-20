import {Router} from "express"; 

const router = Router();

import {getPedido_todos, createPedido_todo, getPedido_todo, updatePedido_todo, deletePedido_todo} from '../controllers/pedido_todos.controller.js'; // Assuming you have a controller for employees

// Define routes for employees
router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/pedido_todos', getPedido_todos);

router.get('/pedido_todo/:id', getPedido_todo);

router.post('/pedido_todo', createPedido_todo);

router.patch('/pedido_todo/:id', updatePedido_todo); //put actualiza todo el objeto, patch actualiza solo los campos que se envían

router.delete('/pedido_todo/:id', deletePedido_todo);


export default router;