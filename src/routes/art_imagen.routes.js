import {Router} from "express"; 

const router = Router();

import { getArt_imagensUnificado, getArt_imagensb64paginate, imagenes, imagen, getArt_imagens, getArt_imagenspaginate, getArt_imagenBinary, getArt_imagen, createArt_imagen, updateArt_imagen, deleteArt_imagen   } from "../controllers/art_imagen.controller.js";

router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

// Define routes for Google Drive (no se usan)
router.get('/imagenes', imagenes);
router.get('/imagen/:id', imagen);
//--------------------------------


router.get('/Art_imagens', getArt_imagens);
// mio viejo
// router.get('/Art_imagenspaginate', getArt_imagenspaginate);
//sadi
//router.get('/art_imagensPaginate', getArt_imagenspaginate); // JSON sin base64

router.get('/art_imagensPaginate', getArt_imagensUnificado);

router.get('/art_imagens/:code', getArt_imagenBinary);      // binario con resize/ETag

router.get('/Art_imagen/:id', getArt_imagen)

router.post('/Art_imagen', createArt_imagen);

router.get('/art_imagensb64Paginate', getArt_imagensb64paginate);

router.put('/Art_imagen/:id', updateArt_imagen);

router.delete('/Art_imagen/:id', deleteArt_imagen);

export default router;