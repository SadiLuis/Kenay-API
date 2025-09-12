import { pool } from '../db.js';

export const getWoo_rubros = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Woo_rubros');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
  }
};

export const getWoo_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Woo_rubros WHERE Codigo_woo = ?', [req.params.id])
      if (rows.length <= 0) {
        return res.status(404).send('Woo_rubros not found: ' + req.params.id);
      } else if (rows.length > 1) {
        return res.status(500).send('Multiple Woo_rubross found with the same ID');
      }
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send('Woo_rubros not found');
  }
}

export const createWoo_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      await pool.query('INSERT INTO kenay_sa.Woo_rubros SET ?', [req.body])
      res.status(201).send('Woo_rubros created successfully:' + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send('Error creating Woo_rubros');
  }
};

export const deleteWoo_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('DELETE FROM kenay_sa.Woo_rubros WHERE Codigo_woo = ?', [req.params.id]);
      if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Woo_rubros not found'
      });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send('Error deleting Woo_rubros');
  }
}

export const updateWoo_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('UPDATE kenay_sa.Woo_rubros SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_woo = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
      res.json(result);
    }
  } catch (err) {
    res.status(500).send('Error updating Woo_rubros');
  }
}