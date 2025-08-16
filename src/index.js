import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';

import {PORT} from './config.js'

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(indexRoutes)
app.use('/api', employeesRoutes);

app.use((req, res, next) => {
  res.status(404).send('EndPoint Not Found'); //si no se encuentra la ruta
  //res.status(404).json({ message: 'EndPoint Not Found' }); //si no se encuentra la ruta
});

//const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
