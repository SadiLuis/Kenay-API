import express from 'express';
import compression from 'compression'; // npm i compression
import path from 'path'; 

import mos_vendedoRoutes from './routes/mos_vendedor.routes.js';
import indexRoutes from './routes/index.routes.js';
import tbl_clientesRoutes from './routes/tbl_clientes.routes.js';
import tbl_lista_preciosRoutes from './routes/tbl_lista_precios.routes.js';
import tbl_personalRoutes from './routes/tbl_personal.routes.js'; 
import presup_todosRoutes from './routes/presup_todos.routes.js';
import art_depositoRoutes from './routes/art_deposito.routes.js';
import art_rubroRoutes from './routes/art_rubro.routes.js';
import art_subrubroRoutes from './routes/art_subrubro.routes.js';
import woo_rubrosRoutes from './routes/woo_rubros.routes.js';
import presup_detalleRoutes from './routes/presup_detalle.routes.js';
import art_talle_medida from './routes/art_talle_medida.routes.js';
import pedido_todos from './routes/pedido_todos.routes.js';
import art_descuentos from './routes/art_descuentos.routes.js';
import art_descuentos_cant from './routes/art_descuentos_cant.routes.js';
import art_imagen from './routes/art_imagen.routes.js';
import combo_art from './routes/combo_art.routes.js';
import art_detalle from './routes/art_detalle.router.js';
import ala_usuarios from './routes/ala.usuarios.routes.js';
import tbl_marcas from './routes/tbl_marcas.routes.js';
import tbl_matamarcas from './routes/tbl_matamarcas.routes.js';
import tbl_matatipos from './routes/tbl_matatipos.routes.js';
import tbl_provee from './routes/tbl_provee.routes.js';
import tbl_proveedorjuris from './routes/tbl_proveedorjuris.routes.js';
import tbl_provincias from './routes/tbl_provincias.routes.js';
import tbl_colores from './routes/tbl_colores.routes.js';
import pedido_detalle from './routes/pedido_detalle.routes.js'
import back_usersRoutes from './routes/auth.routes.js';
import auth_Routes from "./routes/auth.routes.js"
import caja_med_pago from './routes/caja_med_pago.routes.js';
import tbl_talle from './routes/tbl_talle.routes.js';
import tbl_talles from './routes/tbl_talles.routes.js';

import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());

//SI O SI PARA Q ANDEN LAS VISTAS
app.set('view engine', 'ejs'); 
app.set('views', './src/views'); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());


app.use(indexRoutes)
app.use('/api',  indexRoutes);
app.use('/api',  mos_vendedoRoutes);
app.use('/api',  tbl_clientesRoutes);
app.use('/api',  tbl_lista_preciosRoutes);
app.use('/api',  tbl_personalRoutes);
app.use('/api',  presup_todosRoutes); 
app.use('/api',  art_depositoRoutes);
app.use('/api',  art_rubroRoutes);
app.use('/api',  art_subrubroRoutes); 
app.use('/api',  woo_rubrosRoutes);
app.use('/api',  presup_detalleRoutes); 
app.use('/api',  art_talle_medida);
app.use('/api',  pedido_todos);
app.use('/api',  art_descuentos);
app.use('/api',  art_descuentos_cant);
// sadi 
app.use('/api',  art_imagen);
app.use(compression({ level: 6 }));    // comprime JSON (las imágenes ya están comprimidas)
// FIN SADI
app.use('/api',  combo_art);
app.use('/api',  art_detalle);
app.use('/api',  ala_usuarios);
app.use('/api',  tbl_marcas);
app.use('/api',  tbl_matamarcas);
app.use('/api',  tbl_matatipos);
app.use('/api',  tbl_provee);
app.use('/api',  tbl_proveedorjuris);
app.use('/api',  tbl_provincias);
app.use('/api',  tbl_colores);
app.use('/api',  pedido_detalle);
app.use('/api',  back_usersRoutes);
app.use('/api',  auth_Routes);
app.use('/api/', caja_med_pago);
app.use('/api',  tbl_talle);
app.use('/api',  tbl_talles);

//para imagenes
const RUTA_CARPETA_2 = 'E:/Back.End.Sistemas/GestionAR/Imagenes/2'; // Nota: Usé '2' en lugar de '\x02'
const RUTA_CARPETA_2Thumb = 'E:/Back.End.Sistemas/GestionAR/Imagenes/2/Thumb';
const RUTA_CARPETA_3 = 'E:/Back.End.Sistemas/GestionAR/Imagenes/3'; // Nota: Usé '3' en lugar de '\x03'
const RUTA_CARPETA_3Thumb = 'E:/Back.End.Sistemas/GestionAR/Imagenes/3/Thumb';
const RUTA_CARPETA_4 = 'E:/Back.End.Sistemas/GestionAR/Imagenes/4'; // Nota: Usé '4' en lugar de '\x04'
const RUTA_CARPETA_4Thumb = 'E:/Back.End.Sistemas/GestionAR/Imagenes/4/Thumb';
// 1. Configura la ruta URL '/imagenes/c2' para que sirva los archivos de RUTA_CARPETA_2
app.use('/imagenes/2', express.static(path.resolve(RUTA_CARPETA_2)));
app.use('/imagenes/2/Thumb', express.static(path.resolve(RUTA_CARPETA_2Thumb)));
// 2. Configura la ruta URL '/imagenes/c3' para que sirva los archivos de RUTA_CARPETA_3
app.use('/imagenes/3', express.static(path.resolve(RUTA_CARPETA_3)));
app.use('/imagenes/3/Thumb', express.static(path.resolve(RUTA_CARPETA_3Thumb)));
// 3. Configura la ruta URL '/imagenes/c4' para que sirva los archivos de RUTA_CARPETA_4
app.use('/imagenes/4', express.static(path.resolve(RUTA_CARPETA_4)));
app.use('/imagenes/4/Thumb', express.static(path.resolve(RUTA_CARPETA_4Thumb)));

app.use((req, res, next) => {
  res.status(404).send('<h3 style="color: black;text-align:center;">EndPoint Not Found / Ruta no Encontrada</h3>');  
});

export default app;