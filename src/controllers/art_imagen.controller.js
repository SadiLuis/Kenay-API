import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool

//import {express} from "express"; 
import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve archivos estáticos desde la carpeta 'public'
const app = express();
const port = 5600;

// Configura credenciales de la cuenta de Google
const KEYFILEPATH = path.join(__dirname, 'kenaysa-rdit-d90cd24434ad.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// ID de la carpeta de Google Drive imágenes
const FOLDER_ID = '1DLGIEP2STdquLzDda6Bs-tq6cAsqnGKq';

export const imagenes = async (req, res) => {
  try {
    
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;    
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const drive = google.drive({ version: 'v3', auth });
      const allImages = await searchInFolder(drive, FOLDER_ID);
      if (!allImages || allImages.length === 0) {
        console.log('No se encontraron archivos de imagen en la carpeta y sus subcarpetas.');
        return res.json([]);
      }
      const imagesJson = allImages.map(file => ({
        id: file.name,
        nombre: file.name,
      }));
      console.log('Imágenes encontradas:', imagesJson.length);
      res.json(imagesJson);
    }
  } catch (error) {
    console.error('Error al listar archivos de Google Drive:', error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes.' });
  }
};

const searchInFolder = async (drive, folderId) => {
  let imageList = [];
  let pageToken = null;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: 'nextPageToken, files(id, name, mimeType)',
      pageToken: pageToken,
    });

    const files = response.data.files;
    if (!files) {
      break;
    }

    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        const subfolderImages = await searchInFolder(drive, file.id);
        imageList = imageList.concat(subfolderImages);
      } else if (file.mimeType.startsWith('image/')) {
        imageList.push(file);
      }
    }
    pageToken = response.data.nextPageToken;
  } while (pageToken);
  return imageList;
}


export const imagen = async (req, res) => {
  try {
    console.log('armar aca por ID')
  } catch (error) {
    console.error('Error al servir la imagen:', error);
    res.status(500).send('Error al obtener la imagen.  o Token invalido');
  }
};

export const getArt_imagens = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de woo_rubros", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.Art_imagen ORDER BY Codigo_art ASC limit 500');
      const imagesWithBase64 = rows.map(row => {
        if (row.imagen) {
          // Create a Buffer from the BLOB data and convert it to a Base64 string
          const base64Image = Buffer.from(row.imagen).toString('base64');
          // Add the Base64 string to the row object, including the data URI prefix
          return {
            ...row,
            imagenBase64: `data:${row.tipo_imagen};base64,${base64Image}`
          };
        }
        // If no image data exists, return the row as is
        return row;
      });
      res.json(imagesWithBase64);
    }
    //   if (!token) {
    //     return res.status(403).send('Acceso no Autorizado, no llega token')
    //   } else {
    //     const [rows] = await pool.query('SELECT * FROM kenay_sa.Art_imagen limit 100');
    //     res.json(rows);
  } catch (err) {
    // console.error(err);
    res.status(401).send('Art_imagen - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};

export const getArt_imagen = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM kenay_sa.Art_imagen WHERE Codigo_art = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).send('Art_imagen not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Art_imagen found with the same ID');
    }
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    // console.error(err);
    res.status(500).send('Art_imagen not found');
  }
}

export const createArt_imagen = async (req, res) => {
  try {
    await pool.query('INSERT INTO kenay_sa.Art_imagen SET ?', [req.body])
    res.status(201).send('Art_imagen created successfully:' + JSON.stringify(req.body));
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error creating Art_imagen');
  }
};

export const deleteArt_imagen = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM kenay_sa.Art_imagen WHERE Codigo_art = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'Art_imagen not found'
    });
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Art_imagen deleted successfully: ' + req.params.id });
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error deleting Art_imagen');
  }
}

export const updateArt_imagen = async (req, res) => {
  try {
    //const { Codigo_art } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.Art_imagen SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    // console.log(result);
    res.json(result); // Return the updated Art_imagen data
    //res.send('Art_imagen updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error updating Art_imagen');
  }
}