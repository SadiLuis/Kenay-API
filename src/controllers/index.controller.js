import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


// export const getIndexraiz = async (req, res) => {  
//     //router.get('/', (req, res) => {

//       res.render('index.ejs');

//       //res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
//       //<a href="https://macaw-striking-violently.ngrok-free.app/api/woo_rubros">Woo_rubros</a>    
// };
export const getIndexraiz = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // // console.log("cookiedata de woo_rubros", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      // const [rows] = await pool.query('SELECT * FROM kenay_sa.Woo_rubros');
      // res.json(rows);
      res.render('index.ejs');
    }
  } catch (err) {
    // // console.error(err);
    res.status(401).send('Index.ejs - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');  
  };
  //router.get('/', (req, res) => {

  //res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
  //<a href="https://macaw-striking-violently.ngrok-free.app/api/woo_rubros">Woo_rubros</a>    
};

export const getIndexLogin = async (req, res) => {  
    //router.get('/', (req, res) => {
      res.render('login.ejs');
      //res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
      //<a href="https://macaw-striking-violently.ngrok-free.app/api/woo_rubros">Woo_rubros</a>    
};

export const getIndexRegister = async (req, res) => {  
    //router.get('/', (req, res) => {
      res.render('register.ejs');
      //res.send('KENAY SA - API REST con MySQL y Node.js - BACKEND - 15-08-25');
      //<a href="https://macaw-striking-violently.ngrok-free.app/api/woo_rubros">Woo_rubros</a>    
};

export const getIndex = async (req, res) =>  {  
    const [result] = await pool.query('SELECT "KENAY_SA" AS result');  
    // // console.log(result);  
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

