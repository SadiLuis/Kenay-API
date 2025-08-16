import {Router} from "express"; 

const router = Router();

import {getIndex, createIndex, idIndex, updateIndex, deleteIndex} from '../controllers/index.controller.js';


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for indexes
router.get('/index', getIndex);

router.get('/index/:id', idIndex)

router.post('/index', createIndex);

router.put('/index/:id', updateIndex);

router.delete('/index/:id', deleteIndex);

export default router;
