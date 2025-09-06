import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getArt_depositos = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de art_deposito", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      //const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Descripcion_art NOT LIKE "%BAJA%" limit 500');
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Rubro_dep != 0 AND Descripcion_art != "%BAJA%" ORDER BY Codigo_art ASC limit 500');
      //SELECT * FROM kenay_sa.art_deposito where Descripcion_art LIKE '%baja%' limit 20; //FILTRA POR LOS Q EN DESCRIPCION DICE BAJA EN ALGUN LADO
      //const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito limit 500');
      res.json(rows);
    }
  } catch (err) {
    // console.error(err);
    res.status(401).send('art_deposito - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};

export const getPaginatedAndFilteredData = (tableName, filterClause) => {
  return async (req, res) => {
    try {
      // 1. Validar el token de la cookie
      const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
      if (!cookieData || !cookieData.token) {
        // console.log("Acceso no Autorizado, no llega token en la cookie");
        return res.status(401).send('Acceso no Autorizado. Por favor, inicie sesión.');
      }

      // 2. Obtener los parámetros de paginación de la URL
      const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
      const limit = parseInt(req.query.limit) || 200; // Límite de registros, por defecto 20
      const offset = (page - 1) * limit; // Calcula el OFFSET

      // 3. Obtener el total de registros para los metadatos de la paginación
      const [totalRows] = await pool.query(`SELECT COUNT(*) as count FROM kenay_sa.${tableName} ${filterClause}`);
      const totalCount = totalRows[0].count;

      // 4. Construir y ejecutar la consulta con LIMIT y OFFSET
      const query = `SELECT * FROM kenay_sa.${tableName} ${filterClause} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [limit, offset]);

      // 5. Enviar la respuesta con los metadatos de paginación
      res.json({
        total: totalCount,
        page: page,
        limit: limit,
        data: rows,
      });

    } catch (err) {
      // console.error(`Error al obtener datos paginados de ${tableName}:`, err);
      res.status(500).send('Error interno del servidor. No se pudieron obtener los datos.');
    }
  };
};


export const getArt_depositos_cursor = async (req, res) => {
  try {
    // 1. Token validation (same as before)
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    if (!cookieData || !cookieData.token) {
      // console.log("Acceso no Autorizado, no llega token en la cookie");
      return res.status(401).send('Acceso no Autorizado. Por favor, inicie sesión.');
    }

    // 2. Get pagination parameters from the URL
    const lastId = req.query.lastId ? parseInt(req.query.lastId) : 0; // The cursor
    const limit = parseInt(req.query.limit) || 50; // Items per page, default 50

    // 3. Build the query using the cursor (lastId)
    let query = `
      SELECT * FROM kenay_sa.art_deposito
      WHERE Descripcion_art NOT LIKE "%BAJA%"
    `;
    let queryParams = [];

    // Add the cursor condition if lastId is provided
    if (lastId > 0) {
      query += ` AND Codigo_art > ?`; // Assuming 'ID' is your unique indexed column
      queryParams.push(lastId);
    }
    
    // Add ORDER BY and LIMIT
    query += ` ORDER BY Codigo_art ASC LIMIT ?`;
    queryParams.push(limit);

    // 4. Execute the query
    const [rows] = await pool.query(query, queryParams);

    // 5. Send the response with data and the next cursor
    const nextCursor = rows.length > 0 ? rows[rows.length - 1].ID : null;

    res.json({
      data: rows,
      nextCursor: nextCursor,
      hasMore: rows.length === limit,
    });

  } catch (err) {
    // console.error("Error fetching art_depositos with cursor:", err);
    res.status(500).send('Error interno del servidor. No se pudieron obtener los datos.');
  }
};



export const getArt_deposito = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Codigo_art = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Art_deposito not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Art_depositos found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    // console.error(err);
    res.status(500).send('Art_deposito not found');
  }
}

export const createArt_deposito = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.art_deposito SET ?', [req.body])    
      res.status(201).send('Art_deposito created successfully:' + JSON.stringify(req.body));
    } catch (err) {
      // console.error(err);
      res.status(500).send('Error creating Art_deposito');
    }
};

export const deleteArt_deposito = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.art_deposito WHERE Codigo_art = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Art_deposito not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Art_deposito deleted successfully: ' + req.params.id });
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error deleting Art_deposito');
  }
}

export const updateArt_deposito = async (req, res) => {
  try{
    //const { Codigo_art } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.art_deposito SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    // console.log(result);
    res.json(result); // Return the updated Art_deposito data
    //res.send('Art_deposito updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error updating Art_deposito');
  }
}