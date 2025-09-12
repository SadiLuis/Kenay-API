import { pool } from '../db.js';

export const getTbl_clientes = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.tbl_clientes');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('tbl_clientes - acceso no Autorizado sin Token')
  }
};

export const createTbl_cliente = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      await pool.query('INSERT INTO kenay_sa.tbl_clientes SET ?', [req.body])
      res.status(201).send('Tbl_cliente created successfully:' + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send('Error creating Tbl_clientes');
  }
};

export const getTbl_clientesPaginate = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData ? cookieData.token : null;

    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token');
    }

    // 1. Obtener los parámetros de paginación de la URL
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // 2. Consulta para obtener el número total de clientes
    const [totalRows] = await pool.query('SELECT COUNT(*) AS total FROM kenay_sa.tbl_clientes');
    const totalItems = totalRows[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // 3. Consulta para obtener los clientes de la página actual
    const [rows] = await pool.query(
      'SELECT * FROM kenay_sa.tbl_clientes LIMIT ? OFFSET ?',
      [limit, offset]
    );
    
    // 4. Devolver la respuesta con los datos y la metadata de paginación
    res.json({
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
      data: rows,
    });
    
  } catch (err) {
    res.status(401).send('tbl_clientes - acceso no Autorizado sin Token');
  }
};

export const getTbl_cliente = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.tbl_clientes WHERE Codigo_cli = ?', [req.params.id])
      if (rows.length <= 0) {
        return res.status(404).send('Tbl_clientes not found: ' + req.params.id);
      } else if (rows.length > 1) {
        return res.status(500).send('Multiple Tbl_clientes found with the same ID');
      }
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send('Art_rubro not found');
  }
}

export const deleteTbl_cliente = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('DELETE FROM kenay_sa.tbl_clientes WHERE Codigo_cli = ?', [req.params.id]);
      if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Tbl_cliente not found'
      });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send('Error deleting Tbl_clientes');
  }
}

export const updateTbl_cliente = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('UPDATE kenay_sa.tbl_clientes SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_ven = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
      res.json(result);
    }
  } catch (err) {
    res.status(500).send('Error updating Tbl_clientes');
  }
}