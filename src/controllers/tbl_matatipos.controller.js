import { pool } from '../db.js';


export const gettbl_Matatiposs = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.tbl_Matatipos');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
  }
};

export const gettbl_Matatipos = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.tbl_Matatipos WHERE ID_user = ?', [req.params.id])
      if (rows.length <= 0) {
        return res.status(404).send('tbl_Matatipos not found: ' + req.params.id);
      } else if (rows.length > 1) {
        return res.status(500).send('Multiple tbl_Matatipos found with the same ID');
      }
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send('tbl_Matatipos not found');
  }
}

export const createtbl_Matatipos = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      await pool.query('INSERT INTO kenay_sa.tbl_Matatipos SET ?', [req.body])
      res.status(201).send('tbl_Matatipos created successfully:' + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send('Error creating tbl_Matatipos');
  }
};

export const deletetbl_Matatipos = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('DELETE FROM kenay_sa.tbl_Matatipos WHERE ID_user = ?', [req.params.id]);
      if (result.affectedRows <= 0) return res.status(404).json({
        message: 'tbl_Matatipos not found'
      });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send('Error deleting tbl_Matatipos');
  }
}

export const updatetbl_Matatipos = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('UPDATE kenay_sa.tbl_Matatipos SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
      res.json(result);
    }
  } catch (err) {
    res.status(500).send('Error updating tbl_Matatipos');
  }
}