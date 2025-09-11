import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getCaja_med_pagos = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Caja_med_pago limit 1000');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('Caja_med_pago - acceso no Autorizado sin Token')
  }
};
export const getCaja_med_pago = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM kenay_sa.Caja_med_pago WHERE Codigo_art = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).send('Caja_med_pago not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Caja_med_pagos found with the same ID');
    }
    res.json(rows[0]);  
  } catch (err) {
    res.status(500).send('Caja_med_pago not found');
  }
}