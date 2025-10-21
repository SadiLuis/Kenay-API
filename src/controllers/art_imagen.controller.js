import { pool } from "../db.js";
import crypto from "crypto";
import sharp from "sharp";

export const imagenes = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    } else {
      console.log("imagenes GDrive desactivadas");
      res.status(500).json("imagenes GDrive desactivadas.");      
    }
  } catch (error) {
    console.error("Error al listar archivos de Google Drive:", error);
    res.status(500).json({ error: "Error al obtener la lista de imágenes." });
  }
};

export const imagen = async (req, res) => {
  try {
    console.log("armar aca por ID");
  } catch (error) {
    console.error("Error al servir la imagen:", error);
    res.status(500).send("Error al obtener la imagen.  o Token invalido");
  }
};

export const getArt_imagens = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    } else {
      const [rows] = await pool.query(
        "SELECT * FROM kenay_sa.Art_imagen ORDER BY Codigo_art ASC limit 500"
      );
      const imagesWithBase64 = rows.map((row) => {
        if (row.imagen) {
          const base64Image = Buffer.from(row.imagen).toString("base64");
          return {
            ...row,
            imagenBase64: `data:${row.tipo_imagen};base64,${base64Image}`,
          };
        }
        return row;
      });
      res.json(imagesWithBase64);
    }
  } catch (err) {
    res.status(401).send("Art_imagen - acceso no Autorizado sin Token");
  }
};

export const getArt_imagensb64paginate = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData?.token; // Uso de optional chaining para seguridad

    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    }

    // --- Lógica de Paginación ---

    // Obtener 'page' y 'pageSize' de los query parameters, con valores por defecto
    const page = parseInt(req.query.page) || 1; // Página actual (default 1)
    const pageSize = parseInt(req.query.pageSize) || 50; // Registros por página (default 50)
    
    // Calcular OFFSET
    const offset = (page - 1) * pageSize;
    
    // El límite es el pageSize
    const limit = pageSize;
    
    // Definir el límite máximo para evitar peticiones demasiado grandes
    const maxLimit = 500;
    const finalLimit = Math.min(limit, maxLimit); 

    // --- Consultas a la Base de Datos ---

    // 1. Obtener el conteo total de registros
    const [countRows] = await pool.query(
      "SELECT COUNT(*) as total_count FROM kenay_sa.Art_imagen"
    );
    const totalCount = countRows[0].total_count;

    // 2. Obtener los datos con LIMIT y OFFSET para paginación
    const [rows] = await pool.query(
      `SELECT * FROM kenay_sa.Art_imagen 
       ORDER BY Codigo_art ASC 
       LIMIT ? OFFSET ?`,
      [finalLimit, offset] // Pasamos los valores como array para evitar inyección SQL
    );

    // --- Procesamiento de Imágenes ---
    
    const imagesWithBase64 = rows.map((row) => {
      if (row.imagen) {
        // Asumiendo que 'row.imagen' es un Buffer de la imagen
        const base64Image = Buffer.from(row.imagen).toString("base64");
        return {
          ...row,
          // Crea la URL de datos (Data URI)
          imagenBase64: `data:${row.tipo_imagen};base64,${base64Image}`,
        };
      }
      return row;
    });

    // --- Respuesta con JSON de Paginación ---

    // Calcular el total de páginas
    const totalPages = Math.ceil(totalCount / finalLimit);

    // Enviar la respuesta JSON con los datos y la información de paginación
    res.json({
      pagination: {
        totalCount: totalCount,
        pageSize: finalLimit,
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      data: imagesWithBase64,
    });

  } catch (err) {
    console.error("Error en getArt_imagens:", err);
    res.status(401).send("Art_imagen - acceso no Autorizado sin Token o error de servidor");
  }
};

function getBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.headers["x-forwarded-host"] || req.get("host");
  return `${proto}://${host}`;
}

export const getArt_imagenspaginate = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData ? cookieData.token : null;
    if (!token) return res.status(403).send('Acceso no Autorizado, no llega token');

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(500, parseInt(req.query.limit) || 50));
    const offset = (page - 1) * limit;    
    const [[{ total: totalItems }]] = await pool.query(
      'SELECT COUNT(*) AS total FROM kenay_sa.Art_imagen'
    );
    const totalPages = Math.ceil(totalItems / limit);
    const [rows] = await pool.query(
      `
      SELECT Codigo_art, tipo_imagen
      FROM kenay_sa.Art_imagen
      ORDER BY Codigo_art ASC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    const baseUrl = getBaseUrl(req);

    const data = rows.map(r => {
      const code = String(r.Codigo_art).trim();
      return {
        Codigo_art: code,        
        thumbUrl: `${baseUrl}/api/art_imagens/${encodeURIComponent(code)}?variant=thumb&size=160&format=webp`,
        imageUrl: `${baseUrl}/api/art_imagens/${encodeURIComponent(code)}?variant=full&format=webp`,        
        tipo_imagen: r.tipo_imagen || null,
      };
    });

    res.set('Cache-Control', 'public, max-age=60');
    res.json({
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
      data,
    });
  } catch (err) {
    console.error('[art_imagenspaginate] error', err);
    res.status(401).send('Art_imagen - acceso no Autorizado sin Token');
  }
};

export const getArt_imagenBinary = async (req, res) => {
  try {
    const { code } = req.params;
    const variant = (req.query.variant || 'thumb').toString();
    const size = Math.max(16, Math.min(2000, parseInt(req.query.size) || (variant === 'thumb' ? 160 : 1200)));
    const format = (req.query.format || 'webp').toString().toLowerCase();
    const validFmt = ['webp', 'jpeg', 'png'].includes(format) ? format : 'webp';

    const [rows] = await pool.query(
      `SELECT imagen, tipo_imagen, updated_at
        FROM kenay_sa.Art_imagen
        WHERE Codigo_art = ?
        LIMIT 1`,
      [code]
    );
    if (!rows.length || !rows[0].imagen) return res.status(404).send('Imagen no encontrada');

    const originBuf = Buffer.from(rows[0].imagen);
    const lastMod = rows[0].updated_at ? new Date(rows[0].updated_at) : null;
    
    const etag = crypto
      .createHash('md5')
      .update(`${originBuf}|${variant}|${size}|${validFmt}`)
      .digest('hex');

    if (req.headers['if-none-match'] === etag) {
      res.status(304).end();
      return;
    }

    let img = sharp(originBuf).rotate();
    if (variant === 'thumb') {
      img = img.resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true });
    } else {
      img = img.resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true });
    }

    if (validFmt === 'webp') img = img.webp({ quality: 70 });
    else if (validFmt === 'jpeg') img = img.jpeg({ quality: 80 });
    else if (validFmt === 'png') img = img.png();

    const out = await img.toBuffer();

    res.set('Content-Type', validFmt === 'jpeg' ? 'image/jpeg' : `image/${validFmt}`);
    if (lastMod) res.set('Last-Modified', lastMod.toUTCString());
    res.set('ETag', etag);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');

    res.status(200).send(out);
  } catch (err) {
    console.error('[getArt_imagenBinary] error', err);
    res.status(500).send('No se pudo procesar la imagen');
  }
};

export const getArt_imagensUnificado = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData ? cookieData.token : null;
    if (!token) return res.status(403).send('Acceso no Autorizado, no llega token');

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(500, parseInt(req.query.limit) || 50));
    const offset = (page - 1) * limit;

    const [[{ total: totalItems }]] = await pool.query(
      'SELECT COUNT(*) AS total FROM kenay_sa.Art_imagen'
    );
    const totalPages = Math.ceil(totalItems / limit);
    
    const [rows] = await pool.query(
      `SELECT Codigo_art, imagen, Thumb, Update_time FROM kenay_sa.Art_imagen ORDER BY Codigo_art ASC LIMIT ? OFFSET ?`, [limit, offset]
    );

    const data = await Promise.all(
      rows.map(async (r) => {
        const code = String(r.Codigo_art).trim();
        const originBuf = Buffer.from(r.imagen);
        const lastMod = r.updated_at ? new Date(r.updated_at) : null;
       
        const size = 160;
        const validFmt = 'webp';

        let img = sharp(originBuf).rotate();
        img = img.resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true });
        img = img.webp({ quality: 70 });
        const out = await img.toBuffer();        
        return {
          Codigo_art: code,
          lastModified: lastMod ? lastMod.toUTCString() : null,
          data: `data:image/webp;base64,${out.toString('base64')}`,
        };
      })
    );

    res.set('Cache-Control', 'public, max-age=60'); // lista cacheable 60s
    res.json({
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
      data,
    });
  } catch (err) {
    console.error('[getArt_imagensUnificado] error', err);
    res.status(500).send('Error al procesar la solicitud');
  }
};

export const getArt_imagen = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    } else {
      const [rows] = await pool.query(
        "SELECT * FROM kenay_sa.Art_imagen WHERE Codigo_art = ?",
        [req.params.id]
      );
      if (rows.length <= 0) {
        return res.status(404).send("Art_imagen not found: " + req.params.id);
      } else if (rows.length > 1) {
        return res
          .status(500)
          .send("Multiple Art_imagen found with the same ID");
      }
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send("Art_imagen not found");
  }
};

export const createArt_imagen = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    } else {
      await pool.query("INSERT INTO kenay_sa.Art_imagen SET ?", [req.body]);
      res
        .status(201)
        .send("Art_imagen created successfully:" + JSON.stringify(req.body));
    }
  } catch (err) {
    res.status(500).send("Error creating Art_imagen");
  }
};

export const deleteArt_imagen = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    } else {
      const [result] = await pool.query(
        "DELETE FROM kenay_sa.Art_imagen WHERE Codigo_art = ?",
        [req.params.id]
      );
      if (result.affectedRows <= 0)
        return res.status(404).json({
          message: "Art_imagen not found",
        });
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).send("Error deleting Art_imagen");
  }
};

export const updateArt_imagen = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data
      ? JSON.parse(req.cookies.user_data)
      : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send("Acceso no Autorizado, no llega token");
    } else {
      const [result] = await pool.query(
        "UPDATE kenay_sa.Art_imagen SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?",
        [
          req.body.Nombre_ven,
          req.body.Domicilio_ven,
          req.body.Ciudad_ven,
          req.body.Telefono_ven,
          req.body.Celular_ven,
          req.body.comision_ven,
          req.body.Codigo_alta,
          req.params.id,
        ]
      );
      res.json(result);
    }
  } catch (err) {
    res.status(500).send("Error updating Art_imagen");
  }
};
