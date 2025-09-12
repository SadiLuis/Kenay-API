import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getArt_rubros = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de woo_rubros", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_rubro WHERE Nombre_Rub != "NO USAR"');
      res.json(rows);
    }
  } catch (err) {
    res.status(401).send('art_rubro - acceso no Autorizado sin Token')
  }
};


export const getArt_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_rubro WHERE Codigo_Rub = ?', [req.params.id])
      if (rows.length <= 0) {
        return res.status(404).send('Art_rubro not found: ' + req.params.id);
      } else if (rows.length > 1) {
        return res.status(500).send('Multiple Art_rubros found with the same ID');
      }
      res.json(rows[0]);
    }
  } catch (err) {

    res.status(500).send('Art_rubro not found');
  }
}

export const createArt_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      await pool.query('INSERT INTO kenay_sa.art_rubro SET ?', [req.body])
      res.status(201).send('Art_rubro created successfully:' + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send('Error creating Art_rubro');
  }
};

export const deleteArt_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('DELETE FROM kenay_sa.art_rubro WHERE Codigo_Rub = ?', [req.params.id]);
      if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Art_rubro not found'
      });
      res.sendStatus(204);
    }
  } catch (err) {

    res.status(500).send('Error deleting Art_rubro');
  }
}

export const updateArt_rubro = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [result] = await pool.query('UPDATE kenay_sa.art_rubro SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_Rub = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
      res.json(result);
    }
  } catch (err) {
    res.status(500).send('Error updating Art_rubro');
  }
}