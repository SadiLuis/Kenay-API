import { pool } from '../db.js';


export const getTbl_proveedorjuriss = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_proveedorjuris');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
  }
};


export const createTbl_proveedorjuris = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      await pool.query('INSERT INTO kenay_sa.Tbl_proveedorjuris SET ?', [req.body])
      res.status(201).send('Tbl_proveedorjuris created successfully:' + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send('Error creating Tbl_proveedorjuris');
  }
};

export const getTbl_proveedorjuris = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_proveedorjuris WHERE Codigo_ven = ?', [req.params.id])
      if (rows.length <= 0) {
        return res.status(404).send('Tbl_proveedorjuris not found: ' + req.params.id);
      } else if (rows.length > 1) {
        return res.status(500).send('Multiple Tbl_proveedorjuriss found with the same ID');
      }
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send('Tbl_proveedorjuris not found');
  }
}

export const deleteTbl_proveedorjuris = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('DELETE FROM kenay_sa.Tbl_proveedorjuris WHERE Codigo_ven = ?', [req.params.id]);
      if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Tbl_proveedorjuris not found'
      });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send('Error deleting Tbl_proveedorjuris');
  }
}

export const updateTbl_proveedorjuris = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('UPDATE kenay_sa.Tbl_proveedorjuriss SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_ven = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
      res.json(result);
    }
  } catch (err) {
    res.status(500).send('Error updating Tbl_proveedorjuris');
  }
}