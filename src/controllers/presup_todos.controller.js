import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getPresup_todos = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    console.log("cookiedata de Presup_todos", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Presup_todos limit 500');
    res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(401).send('Presup_todos - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};

export const createPresup_todo = async (req, res) => {
    try{      
      await pool.query('INSERT INTO kenay_sa.Presup_todos SET ?', [req.body])    
      res.status(201).send('Presup_todos created successfully:' + JSON.stringify(req.body));
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating Presup_todos');
    }
};

export const getPresup_todo = async (req, res) => {
  try{
  const [rows] = await pool.query('SELECT * FROM kenay_sa.Presup_todos WHERE id = ?', [req.params.id])  
    if (rows.length <= 0) {
      return res.status(404).send('Presup_todo not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Presup_todos found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    console.error(err);
    res.status(500).send('Presup_todo not found');
  }
}

export const deletePresup_todo = async (req, res) => {
    try{
    const [result] = await pool.query('DELETE FROM kenay_sa.Presup_todos WHERE Codigo_ven = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Presup_todo not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Presup_todo deleted successfully: ' + req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting Presup_todos');
  }
}

export const updatePresup_todo = async (req, res) => {
  try{
    //const { Codigo_ven } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.Presup_todos SET Deposito_venta = IFNULL(?, Deposito_venta), Prefijo_venta = IFNULL(?, Prefijo_venta), Numero_venta= IFNULL(?, Numero_venta), Total_venta = IFNULL(?, Total_venta), Total_grabado = IFNULL(?, Total_grabado), Bonifica_venta = IFNULL(?, Bonifica_venta), Codigo_ven = IFNULL(?, Codigo_ven), Nombre_ven = IFNULL(?, Nombre_ven), Fecha_venta = IFNULL(?, Fecha_venta), Hora_venta = IFNULL(?, Hora_venta), Bonifica_total_porcent = IFNULL(?, Bonifica_total_porcent), Listap_apli = IFNULL(?, Listap_apli), Codigo_cli = IFNULL(?, Codigo_cli), Nombre_cli = IFNULL(?, Nombre_cli), Direccion_cli = IFNULL(?, Direccion_cli), Provincia_cli = IFNULL(?, Provincia_cli), Localidad_cli = IFNULL(?, Localidad_cli), Cuit_cli = IFNULL(?, Cuit_cli), IvaCond_cli = IFNULL(?, IvaCond_cli), Observa_pre = IFNULL(?, Observa_pre), Cond_venta = IFNULL(?, Cond_venta), Total_Sub = IFNULL(?, Total_Sub), Codigo_con = IFNULL(?, Codigo_con) WHERE ID = ?', [req.body.Deposito_venta, req.body.Prefijo_venta, req.body.Numero_venta, req.body.Total_venta, req.body.Total_grabado, req.body.Bonifica_venta, req.body.Codigo_ven, req.body.Nombre_ven, req.body.Fecha_venta, req.body.Hora_venta, req.body.Bonifica_total_porcent, req.body.Listap_apli, req.body.Codigo_cli, req.body.Nombre_cli, req.body.Direccion_cli, req.body.Provincia_cli, req.body.Localidad_cli, req.body.Cuit_cli, req.body.IvaCond_cli, req.body.Observa_pre, req.body.Cond_venta, req.body.Total_Sub, req.body.Codigo_con, req.params.id]);
    console.log(result);
    res.json(result); // Return the updated Presup_todo data
    //res.send('Presup_todo updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating Presup_todos');
  }
}