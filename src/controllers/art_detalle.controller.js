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

export const getArt_detalle = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Art_detalle WHERE Codigo_art = ?', [req.params.id])
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