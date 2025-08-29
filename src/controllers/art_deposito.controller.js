import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getArt_depositos = async (req, res) => {
    try{
    //throw new Error("My error"); //error para pruebas
    const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito limit 500');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing Art_depositos');
  }
};

export const getArt_deposito = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Codigo_art = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Art_deposito not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Art_depositos found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    console.error(err);
    res.status(500).send('Art_deposito not found');
  }
}

export const createArt_deposito = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.art_deposito SET ?', [req.body])    
      res.status(201).send('Art_deposito created successfully:' + JSON.stringify(req.body));
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating Art_deposito');
    }
};

export const deleteArt_deposito = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.art_deposito WHERE Codigo_art = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Art_deposito not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Art_deposito deleted successfully: ' + req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting Art_deposito');
  }
}

export const updateArt_deposito = async (req, res) => {
  try{
    //const { Codigo_art } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.art_deposito SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    console.log(result);
    res.json(result); // Return the updated Art_deposito data
    //res.send('Art_deposito updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating Art_deposito');
  }
}