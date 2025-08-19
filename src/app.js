import express from 'express';
import mos_vendedoRoutes from './routes/mos_vendedor.routes.js';
import indexRoutes from './routes/index.routes.js';
import tbl_clientesRoutes from './routes/tbl_clientes.routes.js';
import tbl_lista_preciosRoutes from './routes/tbl_lista_precios.routes.js';
import tbl_personalRoutes from './routes/tbl_personal.routes.js'; // Assuming you have a controller for Tbl_personal
import presup_todosRoutes from './routes/presup_todos.routes.js'; // Assuming you have a controller for Presup_todos
//import presup_detalleRoutes from './controllers/presup_detalle.controller.js';

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(indexRoutes)
app.use('/api', indexRoutes); // Use the index routes under the /api path
app.use('/api', mos_vendedoRoutes);
app.use('/api', tbl_clientesRoutes);
app.use('/api', tbl_lista_preciosRoutes);
app.use('/api', tbl_personalRoutes); // Use the Tbl_personal routes under the /api path
app.use('/api', presup_todosRoutes); // Use the Presup_todos routes under the /api path
//app.use('/api', presup_detalleRoutes); // Use the Presup_detalle route under the /api path

app.use((req, res, next) => {
  res.status(404).send('<h3 style="color: black;text-align:center;">EndPoint Not Found / Ruta o Dirección no Encontrada</h3>'); //si no se encuentra la ruta
  // Optionally, you can log the request method and URL
  //res.status(404).json({ message: 'EndPoint Not Found' }); //si no se encuentra la ruta
});

export default app;