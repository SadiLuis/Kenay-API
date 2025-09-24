import { pool } from '../db.js';


export const getArt_detalles = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Art_detalle');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('Art_detalle - acceso no Autorizado sin Token')
  }
};

export const getArt_detallesPaginate = async (req, res) => {
  try {
    // 1. Obtener y verificar el token
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData?.token; // Uso de optional chaining para manejo más limpio
    
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token');
    }

    // 2. Obtener Parámetros de Paginación desde la URL (query parameters)
    // Valores predeterminados: página 1, límite 10 registros por página
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    
    // Calcular el OFFSET (el punto de inicio de la consulta)
    // Ejemplo: Si page=3 y limit=10, el offset es (3-1)*10 = 20.
    const offset = (page - 1) * limit;

    // 3. Consulta de Conteo Total de Registros
    // Necesitamos el total para que el frontend sepa cuántas páginas hay.
    const [countRows] = await pool.query('SELECT COUNT(*) as total FROM kenay_sa.Art_detalle');
    const totalItems = countRows[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // 4. Consulta de Datos Paginados
    const sqlQuery = `
      SELECT * FROM kenay_sa.Art_detalle 
      LIMIT ? 
      OFFSET ?
    `;
    const [dataRows] = await pool.query(sqlQuery, [limit, offset]);

    // 5. Enviar Respuesta JSON estructurada
    res.json({
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
      data: dataRows,
    });

  } catch (err) {
    console.error('Error en getArt_detalles paginado:', err);
    res.status(401).send('Art_detalle - acceso no Autorizado sin Token o error de Base de Datos');
  }
};

export const getArt_detalle = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Art_detalle WHERE ID_Art = ?', [req.params.id])
      if (rows.length <= 0) {
        return res.status(404).send('Art_detalle not found: ' + req.params.id);
      } else if (rows.length > 1) {
        return res.status(500).send('Multiple Art_detalles found with the same ID');
      }
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send('Art_detalle not found');
  }
}

export const createArt_detalle = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      await pool.query('INSERT INTO kenay_sa.Art_detalle SET ?', [req.body])
      res.status(201).send('Art_detalle created successfully:' + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send('Error creating Art_detalle');
  }
};

export const deleteArt_detalle = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('DELETE FROM kenay_sa.Art_detalle WHERE Codigo_art = ?', [req.params.id]);
      if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Art_detalle not found'
      });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send('Error deleting Art_detalle');
  }
}

export const updateArt_detalle = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('UPDATE kenay_sa.Art_detalle SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
      res.json(result);
    }
  } catch (err) {
    res.status(500).send('Error updating Art_detalle');
  }
}