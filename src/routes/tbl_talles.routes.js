import {Router} from "express"; 

const router = Router();

import { getTbl_talless, getTbl_tallesid } from "../controllers/tbl_talles.controller.js";


router.get('/', (req, res) => {
  res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
});

router.get('/tbl_talless', getTbl_talless);

router.get('/tbl_talles/:id', getTbl_tallesid)


export default router;