import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getTbl_talless = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de Tbl_talles", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_talles');
      res.json(rows);
    }
  } catch (err) {
    // console.error(err);
    res.status(401).send('Tbl_talles - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};

export const getTbl_tallesid = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_talles WHERE Codigo_art = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).send('Tbl_talles not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Tbl_talless found with the same ID');
    }
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    // console.error(err);
    res.status(500).send('Tbl_talles not found');
  }
}