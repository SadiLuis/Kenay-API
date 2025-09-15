import {Router} from "express"; 

const router = Router();

import { getTbl_talles, getTbl_talle } from "../controllers/tbl_talle.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

router.get('/tbl_talles', getTbl_talles);

router.get('/tbl_talle/:id', getTbl_talle)


export default router;