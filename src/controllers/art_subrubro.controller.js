import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getArt_subrubros = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    console.log("cookiedata de woo_rubros", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_subrubro');
      res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(401).send('art_subrubro - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};


export const getArt_subrubro = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM kenay_sa.art_subrubro WHERE Codigo_sub = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).send('art_subrubro not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple art_subrubros found with the same ID');
    }
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    console.error(err);
    res.status(500).send('art_subrubro not found');
  }
}

export const createArt_subrubro = async (req, res) => {
  try {
    await pool.query('INSERT INTO kenay_sa.art_subrubro SET ?', [req.body])
    res.status(201).send('art_subrubro created successfully:' + JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating art_subrubro');
  }
};

export const deleteArt_subrubro = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM kenay_sa.art_subrubro WHERE Codigo_sub = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'art_subrubro not found'
    });
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'art_subrubro deleted successfully: ' + req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting art_subrubro');
  }
}

export const updateArt_subrubro = async (req, res) => {
  try {
    //const { Codigo_Rub } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.art_subrubro SET Nombre_sub = IFNULL(?, Nombre_sub), Domicilio_sub = IFNULL(?, Domicilio_sub), Ciudad_sub = IFNULL(?, Ciudad_sub), Telefono_sub = IFNULL(?, Telefono_sub), Celular_sub = IFNULL(?, Celular_sub), comision_sub = IFNULL(?, comision_sub), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_sub = ?', [req.body.Nombre_sub, req.body.Domicilio_sub, req.body.Ciudad_sub, req.body.Telefono_sub, req.body.Celular_sub, req.body.comision_sub, req.body.Codigo_alta, req.params.id]);
    console.log(result);
    res.json(result); // Return the updated art_subrubro data
    //res.send('art_subrubro updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating art_subrubro');
  }
}