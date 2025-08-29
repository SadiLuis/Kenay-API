import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getpedido_detalles = async (req, res) => {
    try{
    //throw new Error("My error"); //error para pruebas
    const [rows] = await pool.query('SELECT * FROM kenay_sa.pedido_detalle limit 500');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error listing pedido_detalle');
  }
};

export const createpedido_detalle = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.pedido_detalle SET ?', [req.body])    
      res.status(201).send('_pedido_detalle created successfully:' + JSON.stringify(req.body));
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating _pedido_detalle');
    }
};

export const getpedido_detalle = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.pedido_detalle WHERE ID_propio = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('_pedido_detalle not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple pedido_detalle found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    console.error(err);
    res.status(500).send('_pedido_detalle not found');
  }
}

export const deletepedido_detalle = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.pedido_detalle WHERE ID_propio = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: '_pedido_detalle not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: '_pedido_detalle deleted successfully: ' + req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting _pedido_detalle');
  }
}

export const updatepedido_detalle = async (req, res) => {
  try{
    //const { Codigo_ven } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.pedido_detalle SET ID_propio = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_ven = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    console.log(result);
    res.json(result); // Return the updated _pedido_detalle data
    //res.send('_pedido_detalle updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating _pedido_detalle');
  }
}