import {Router} from "express"; 

const router = Router();

import {getPresup_todos, createPresup_todo, getPresup_todo, updatePresup_todo, deletePresup_todo} from '../controllers/presup_todos.controller.js'; 

router.get('/', (req, res) => {
  res.send('Estas en la raíz de la API de KENAY SA');
});

router.get('/Presup_todos', getPresup_todos);

router.get('/Presup_todo/:id', getPresup_todo);

router.post('/Presup_todo', createPresup_todo);

router.patch('/Presup_todo/:id', updatePresup_todo); 

router.delete('/Presup_todo/:id', deletePresup_todo);


export default router;