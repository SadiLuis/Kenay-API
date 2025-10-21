import {Router} from "express"; 

const router = Router();

import { getArt_depositos,  getArt_depositostalles, getArt_depositostallescursor, getArt_depositostallespaginate, getArt_depositostallespaginatecursor, getArt_depositos_cursor, getArt_deposito, createArt_deposito, updateArt_deposito, deleteArt_deposito   } from "../controllers/art_deposito.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

import { getPaginatedAndFilteredData } from '../controllers/art_deposito.controller.js';

// En este endpoint, el cliente puede usar la paginación
// Ejemplo de URL: http://localhost:3000/articulos/depositos?page=2&limit=50
router.get('/art_depositos_paginate', getPaginatedAndFilteredData('art_deposito', 'WHERE Descripcion_art NOT LIKE "%BAJA%"'));
// To get the first page:
// GET /api/art_depositos_cursor?limit=100
// To get the next page:
// GET /api/art_depositos_cursor?limit=100&cursor=ID_of_last_item_from_first_page
router.get('/art_depositos_cursor',  getArt_depositos_cursor);


router.get('/art_depositos', getArt_depositos);

router.get('/art_depositostalles', getArt_depositostalles);

router.get('/Art_depositostallescursor', getArt_depositostallescursor);

router.get('/art_depositostallespaginate', getArt_depositostallespaginate);

router.get('/art_depositostallespaginatecursor', getArt_depositostallespaginatecursor);

router.get('/art_deposito/:id', getArt_deposito)

router.post('/art_deposito', createArt_deposito);

router.put('/art_deposito/:id', updateArt_deposito);

router.delete('/art_deposito/:id', deleteArt_deposito);

export default router;