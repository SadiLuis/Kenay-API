import express from 'express';
import mos_vendedoRoutes from './routes/mos_vendedor.routes.js';
import indexRoutes from './routes/index.routes.js';
import tbl_clientesRoutes from './routes/tbl_clientes.routes.js';
import tbl_lista_preciosRoutes from './routes/tbl_lista_precios.routes.js';
import tbl_personalRoutes from './routes/tbl_personal.routes.js'; // Assuming you have a controller for Tbl_personal
import presup_todosRoutes from './routes/presup_todos.routes.js'; // Assuming you have a controller for Presup_todos
import art_depositoRoutes from './routes/art_deposito.routes.js'; // Assuming you have a controller for Art_deposito
import art_rubroRoutes from './routes/art_rubro.routes.js'; // Assuming you have a controller for Art_rubro
import art_subrubroRoutes from './routes/art_subrubro.routes.js'; // Assuming you have a controller for Art_subrubro
import woo_rubrosRoutes from './routes/woo_rubros.routes.js'; // Assuming you have a controller for Woo_rubros
import presup_detalleRoutes from './routes/presup_detalle.routes.js';
import art_talle_medida from './routes/art_talle_medida.routes.js'; // Assuming you have a controller for Art_talle_medida
import pedido_todos from './routes/pedido_todos.routes.js'; // Assuming you have a controller for Pedido_todos
import art_descuentos from './routes/art_descuentos.routes.js'; // Assuming you have a controller for Art_descuentos
import art_descuentos_cant from './routes/art_descuentos_cant.routes.js'; // Assuming you have a controller for Art_descuentos_cant
import art_imagen from './routes/art_imagen.routes.js'; // Assuming you have a controller for Art_imagen
import combo_art from './routes/combo_art.routes.js'; // Assuming you have a controller for Combo_art
import art_detalle from './routes/art_detalle.router.js'; // Assuming you have a controller for Art_detalle
import ala_usuarios from './routes/ala.usuarios.routes.js'; // Assuming you have a controller for Ala_usuarios
import tbl_marcas from './routes/tbl_marcas.routes.js'; // Assuming you have a controller for Tbl_marcas
import tbl_matamarcas from './routes/tbl_matamarcas.routes.js'; // Assuming you have a controller for Tbl_matamarcas
import tbl_matatipos from './routes/tbl_matatipos.routes.js'; // Assuming you have a controller for Tbl_matatipos
import tbl_provee from './routes/tbl_provee.routes.js'; // Assuming you have a controller for Tbl_provee
import tbl_proveedorjuris from './routes/tbl_proveedorjuris.routes.js'; // Assuming you have a controller for Tbl_proveedorjuris
import tbl_provincias from './routes/tbl_provincias.routes.js'; // Assuming you have a controller for Tbl_provincias
import tbl_colores from './routes/tbl_colores.routes.js';
import pedido_detalle from './routes/pedido_detalle.routes.js'


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

//SI O SI PARA Q ANDEN LAS VISTAS
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', './src/views'); // Set the directory for EJS templates


app.use(indexRoutes)
app.use('/api', indexRoutes); // Use the index routes under the /api path
app.use('/api', mos_vendedoRoutes);
app.use('/api', tbl_clientesRoutes);
app.use('/api', tbl_lista_preciosRoutes);
app.use('/api', tbl_personalRoutes);
app.use('/api', presup_todosRoutes); 
app.use('/api', art_depositoRoutes);
app.use('/api', art_rubroRoutes);
app.use('/api', art_subrubroRoutes); 
app.use('/api', woo_rubrosRoutes);
app.use('/api', presup_detalleRoutes); 
app.use('/api', art_talle_medida); // Use the art_talle_medida routes under the /api path
app.use('/api', pedido_todos); // Use the pedido_todos routes under the /api path
app.use('/api', art_descuentos); // Use the art_descuentos routes under the /api path
app.use('/api', art_descuentos_cant); // Use the art_descuentos_cant routes under the /api path
app.use('/api', art_imagen); // Use the art_imagen routes under the /api path
app.use('/api', combo_art); // Use the combo_art routes under the /api path
app.use('/api', art_detalle); // Use the art_detalle routes under the /api path
app.use('/api', ala_usuarios); // Use the ala_usuarios routes under the /api path
app.use('/api', tbl_marcas); // Use the tbl_marcas routes under the /api path
app.use('/api', tbl_matamarcas); // Use the tbl_matamarcas routes under the /api path
app.use('/api', tbl_matatipos); // Use the tbl_matatipos routes under the /api path
app.use('/api', tbl_provee); // Use the tbl_provee routes under the /api path
app.use('/api', tbl_proveedorjuris); // Use the tbl_proveedorjuris routes under the /api path
app.use('/api', tbl_provincias); // Use the tbl_provincias routes under the /api path
app.use('/api', tbl_colores);
app.use('/api', pedido_detalle);



app.use((req, res, next) => {
  res.status(404).send('<h3 style="color: black;text-align:center;">EndPoint Not Found / Ruta o Dirección no Encontrada</h3>'); //si no se encuentra la ruta
  // Optionally, you can log the request method and URL
  //res.status(404).json({ message: 'EndPoint Not Found' }); //si no se encuentra la ruta
});

export default app;