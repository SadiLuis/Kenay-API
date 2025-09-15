import { pool } from '../db.js';


export const getPresup_detalles = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.presup_detalle');
    res.json(rows);
    }
  } catch (err) {    
    res.status(401).send('presup_detalle - acceso no Autorizado sin Token')
  }
};



export const createPresup_detalle = async (req, res) => {
    try {    
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {      
      await pool.query('INSERT INTO kenay_sa.presup_detalle SET ?', [req.body])    
      res.status(201).send('Presup_detalles created successfully:' + JSON.stringify(req.body));
    }
    } catch (err) {      
      res.status(500).send('Error creating Presup_detalle');
    }
};

export const getPresup_detalle = async (req, res) => {
  try {    
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
  const [rows] = await pool.query('SELECT * FROM kenay_sa.presup_detalle WHERE id = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Presup_detalle not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Presup_detalles found with the same ID');
    } 
    res.json(rows[0]);  
  } 
  } catch (err) {    
    res.status(500).send('Presup_detalle not found');
  }
}

export const deletePresup_detalle = async (req, res) => {
    try {    
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
    const [result] = await pool.query('DELETE FROM kenay_sa.presup_detalle WHERE Codigo_ven = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Presup_detalle not found' 
    });         
    res.sendStatus(204);
  } 
  } catch (err) {    
    res.status(500).send('Error deleting Presup_detalles');
  }
}

export const updatePresup_detalle = async (req, res) => {
  try {    
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
    const [result] = await pool.query('UPDATE kenay_sa.presup_detalle SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_ven = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    res.json(result);
    } 
  } catch (err) {    
    res.status(500).send('Error updating Presup_detalles');
  }
}