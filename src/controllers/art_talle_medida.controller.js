import { pool } from '../db.js';


export const getArt_talle_medidas = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de talle_medidas", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_talle_medida');
    res.json(rows);
    }
  } catch (err) {    
    res.status(401).send('talle_medidas - acceso no Autorizado sin Token')
  }
};

export const getArt_talle_medida = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.art_talle_medida WHERE id_table = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Art_talle_medida not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Art_talle_medidas found with the same ID');
    } 
    res.json(rows[0]);
  } catch (err) {    
    res.status(500).send('Art_talle_medida not found');
  }
}

export const createArt_talle_medida = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.art_talle_medida SET ?', [req.body])    
      res.status(201).send('Art_talle_medida created successfully:' + JSON.stringify(req.body));
    } catch (err) {      
      res.status(500).send('Error creating Art_talle_medida');
    }
};

export const deleteArt_talle_medida = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.art_talle_medida WHERE id_table = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Art_talle_medida not found' 
    });         
    res.sendStatus(204);
  } catch (err) {    
    res.status(500).send('Error deleting Art_talle_medida');
  }
}

export const updateArt_talle_medida = async (req, res) => {
  try{
    const [result] = await pool.query('UPDATE kenay_sa.art_talle_medida SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE id_table = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    res.json(result);
  } catch (err) {    
    res.status(500).send('Error updating Art_talle_medida');
  }
}