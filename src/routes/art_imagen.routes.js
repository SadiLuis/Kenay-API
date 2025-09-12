import {Router} from "express"; 

const router = Router();

import { imagenes, imagen, getArt_imagens, getArt_imagenspaginate, getArt_imagen, createArt_imagen, updateArt_imagen, deleteArt_imagen   } from "../controllers/art_imagen.controller.js";

router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for Google Drive (no se usan)
router.get('/imagenes', imagenes);
router.get('/imagen/:id', imagen);
//--------------------------------


router.get('/Art_imagens', getArt_imagens);

router.get('/Art_imagenspaginate', getArt_imagenspaginate);

router.get('/Art_imagen/:id', getArt_imagen)

router.post('/Art_imagen', createArt_imagen);

router.put('/Art_imagen/:id', updateArt_imagen);

router.delete('/Art_imagen/:id', deleteArt_imagen);

export default router;