import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getEmployees = async (req, res) => {
    await pool.query('SELECT * FROM kenay_sa.mos_vendedor')
    .then(([rows]) => {
      res.json(rows)
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error listing employees');
    });
};

export const createEmployee = async (req, res) => {
    await pool.query('INSERT INTO kenay_sa.mos_vendedor SET ?', [req.body])
    .then(() => {
      res.status(201).send('Employee created successfully:' + JSON.stringify(req.body));
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error creating employee');
    });
};

export const getEmployee = async (req, res) => {
  await pool.query('SELECT * FROM kenay_sa.mos_vendedor WHERE Codigo_ven = ?', [req.params.id])  
  .then(([rows]) => {
    if (rows.length <= 0) {
      return res.status(404).send('Employee not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple employees found with the same ID');
    } 
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Employee not found');
  });
}

export const deleteEmployee = async (req, res) => {
    const [result] = await pool.query('DELETE FROM kenay_sa.mos_vendedor WHERE Codigo_ven = ?', [req.params.id]);

    if (result.affectedRows <= 0) return res.status(404).json ({ 
        message: 'Employee not found' 
    });         
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Employee deleted successfully: ' + req.params.id });
}

export const updateEmployee = async (req, res) => {
    //const { Codigo_ven } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.mos_vendedor SET ? WHERE Codigo_ven = ?', [req.body, req.params.id]);
    console.log(result);
    res.json(result);
}