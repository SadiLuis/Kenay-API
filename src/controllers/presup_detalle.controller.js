import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getPresup_detalles = async (req, res) => {
    try{
    //throw new Error("My error"); //error para pruebas
    const [rows] = await pool.query('SELECT * FROM kenay_sa.presup_detalle');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing Presup_detalles');
  }
};

export const createPresup_detalle = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.presup_detalle SET ?', [req.body])    
      res.status(201).send('Presup_detalles created successfully:' + JSON.stringify(req.body));
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating Presup_detalles');
    }
};

export const getPresup_detalle = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.presup_detalle WHERE id = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Presup_detalle not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Presup_detalles found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    console.error(err);
    res.status(500).send('Presup_detalle not found');
  }
}

export const deletePresup_detalle = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.presup_detalle WHERE Codigo_ven = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Presup_detalle not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Presup_detalle deleted successfully: ' + req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting Presup_detalles');
  }
}

export const updatePresup_detalle = async (req, res) => {
  try{
    //const { Codigo_ven } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.presup_detalle SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_ven = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    console.log(result);
    res.json(result); // Return the updated Presup_detalle data
    //res.send('Presup_detalle updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating Presup_detalles');
  }
}