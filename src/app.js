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

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

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


app.use((req, res, next) => {
  res.status(404).send('<h3 style="color: black;text-align:center;">EndPoint Not Found / Ruta o Dirección no Encontrada</h3>'); //si no se encuentra la ruta
  // Optionally, you can log the request method and URL
  //res.status(404).json({ message: 'EndPoint Not Found' }); //si no se encuentra la ruta
});

export default app;