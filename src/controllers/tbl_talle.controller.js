import { pool } from '../db.js';

export const getTbl_talles = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_talle');
      res.json(rows);
    }
  } catch (err) {    
    res.status(401).send('Tbl_talle - acceso no Autorizado sin Token')
  }
};

export const getTbl_talle = async (req, res) => {
  try {    
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
    const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_talle WHERE Codigo_art = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).send('Tbl_talle not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Tbl_talles found with the same ID');
    }
    res.json(rows[0]); 
  }  
  } catch (err) {    
    res.status(500).send('Tbl_talle not found');
  }
}