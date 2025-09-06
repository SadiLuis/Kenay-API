import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getTbl_proveedorjuriss = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de woo_rubros", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_proveedorjuris');
    res.json(rows);
    }
  } catch (err) {
    // console.error(err);
    res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};


export const createTbl_proveedorjuris = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.Tbl_proveedorjuris SET ?', [req.body])    
      res.status(201).send('Tbl_proveedorjuris created successfully:' + JSON.stringify(req.body));
    } catch (err) {
      // console.error(err);
      res.status(500).send('Error creating Tbl_proveedorjuris');
    }
};

export const getTbl_proveedorjuris = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.Tbl_proveedorjuris WHERE Codigo_ven = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Tbl_proveedorjuris not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Tbl_proveedorjuriss found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    // console.error(err);
    res.status(500).send('Tbl_proveedorjuris not found');
  }
}

export const deleteTbl_proveedorjuris = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.Tbl_proveedorjuris WHERE Codigo_ven = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Tbl_proveedorjuris not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Tbl_proveedorjuris deleted successfully: ' + req.params.id });
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error deleting Tbl_proveedorjuris');
  }
}

export const updateTbl_proveedorjuris = async (req, res) => {
  try{
    //const { Codigo_ven } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.Tbl_proveedorjuriss SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_ven = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    // console.log(result);
    res.json(result); // Return the updated Tbl_proveedorjuris data
    //res.send('Tbl_proveedorjuris updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error updating Tbl_proveedorjuris');
  }
}