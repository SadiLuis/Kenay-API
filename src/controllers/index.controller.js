import { pool } from '../db.js'; 

export const getIndexraiz = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null; 
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      res.render('index.ejs');
    }
  } catch (err) {
    res.status(401).send('Index.ejs - acceso no Autorizado sin Token')  
  };  
};

export const getIndexLogin = async (req, res) => {  
      res.render('login.ejs');   
};

export const getIndexRegister = async (req, res) => {  
      res.render('register.ejs');   
};

export const getIndex = async (req, res) =>  {  
    const [result] = await pool.query('SELECT "KENAY_SA" AS result');  
    res.json(result);
  };

export const createIndex = (req, res) =>
  res.send('Creation of indexs');

export const idIndex = (req, res) => {
  const { id } = req.params;
  res.send(`Indexes with ID: ${id}`);
}

export const updateIndex = (req, res) => {
  res.send('Update of Indexes');
}

export const deleteIndex = (req, res) => {
  res.send('Deletion of Indexes');
}

