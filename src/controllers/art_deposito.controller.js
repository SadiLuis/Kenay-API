import { pool } from '../db.js'; // Assuming you have a db.js file that exports a configured MySQL pool


export const getArt_depositos = async (req, res) => {
  try {
    //throw new Error("My error"); //error para pruebas
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    // 2. Renderiza la vista 'profile' y pasa los datos de la cookie    
    // console.log("cookiedata de art_deposito", cookieData)
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      //const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Descripcion_art NOT LIKE "%BAJA%" limit 500');
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Rubro_dep != 0 AND Descripcion_art != "%BAJA%" AND Baja_art != 1 AND TieneImagen != "No" AND Marca_Baja !=	"SI" ORDER BY Codigo_art ASC limit 500');
      //SELECT * FROM kenay_sa.art_deposito where Descripcion_art LIKE '%baja%' limit 20; //FILTRA POR LOS Q EN DESCRIPCION DICE BAJA EN ALGUN LADO
      //const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito limit 500');
      res.json(rows);
    }
  } catch (err) {
    // console.error(err);
    res.status(401).send('art_deposito - acceso no Autorizado sin Token')
    //res.status(500).send('Error listing Woo_rubross');
  }
};

export const getArt_depositostalles = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData.token;
    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token')
    } else {
      const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Rubro_dep != 0 AND Descripcion_art != "%BAJA%" AND Baja_art != 1 AND TieneImagen != "No" AND Marca_Baja !=	"SI" ORDER BY Codigo_art ASC');
      const groupedArticles = {};
      rows.forEach(item => {
        const talleMatch = item.Codigo_art.match(/\.([0-9]+)$/);
        const codigoBase = talleMatch
          ? item.Codigo_art.substring(0, talleMatch.index)
          : item.Codigo_art;

        const talle = talleMatch ? talleMatch[1] : 'N/A'; // Si no hay talle, lo marcamos como 'N/A'

        const descripcionLimpia = item.Descripcion_art.replace(/\s*(\.|-)\s*[0-9]+$/, '');
        if (!groupedArticles[codigoBase]) {
          groupedArticles[codigoBase] = {
            Codigo_art: codigoBase,
            // Usamos la descripción limpia
            descripcion: descripcionLimpia,
            talles: [],
            // Añadimos los nuevos campos al objeto            
            Codigo_Sintalle: item.Codigo_Sintalle,
            FechaIn_dep: item.FechaIn_dep,
            FechaMod_dep: item.FechaMod_dep,
            Rubro_dep: item.Rubro_dep,
            Subrubro_dep: item.Subrubro_dep,
            Temporada_dep: item.Temporada_dep,
            TieneImagen: item.TieneImagen,
            Ultima_Compra: item.Ultima_Compra,
            Compras_total: item.Compras_total,
            Bonifica_dep: item.Bonifica_dep,
            Notas_dep: item.Notas_dep,
            Marca_Art: item.Marca_Art,
            Cantidad_min: item.Cantidad_min,
            Codigo_prov: item.Codigo_prov,
            Inventariado_art: item.Inventariado_art,
            Fecha_inventario: item.Fecha_inventario,
            PrecioManual_art: item.PrecioManual_art,
            PrecioNoVence_art: item.PrecioNoVence_art,
            Gan_Lista4: item.Gan_Lista4,
            Gan_Lista3: item.Gan_Lista3,
            Gan_Lista1: item.Gan_Lista1,
            Gan_Lista2: item.Gan_Lista2,
            Gan_Lista5: item.Gan_Lista5,
            Gan_Lista6: item.Gan_Lista6,
            Impuesto_1: item.Impuesto_1,
            Descripcion_corta: item.Descripcion_corta,
            Baja_art: item.Baja_art,
            TipoImpuesto_art: item.TipoImpuesto_art,
            Impuestos_art: item.Impuestos_art,
            Segunda_unidad: item.Segunda_unidad,
            BotonPrioridad_art: item.BotonPrioridad_art,
            MaterialTipo_art: item.MaterialTipo_art,
            Pagina_art: item.Pagina_art,
            Unidad_compra: item.Unidad_compra,
            Marca_Baja: item.Marca_Baja,
            Desc_auto: item.Desc_auto,
            EnOferta_art: item.EnOferta_art,
            NoVender_art: item.NoVender_art,
            AuxiliarFijo_art: item.AuxiliarFijo_art,
            Publicar_Web: item.Publicar_Web,
            Desc_financiero: item.Desc_financiero,
            ConceptoFE_art: item.ConceptoFE_art,
            Vencimdias_art: item.Vencimdias_art,
            Publicar_WebConST: item.Publicar_WebConST,
            Publicar_WebSTMin: item.Publicar_WebSTMin,
            Imagen1_art: item.Imagen1_art,
            Imagen2_art: item.Imagen2_art,
            Imagen3_art: item.Imagen3_art,
            Imagen4_art: item.Imagen4_art,
            Talle_dep: item.Talle_dep,
            Perfil_impuestos: item.Perfil_impuestos,
            CantidadPack_art: item.CantidadPack_art,
            Tamano_art1: item.Tamano_art1,
            Tamano_art2: item.Tamano_art2,
            Tamano_art3: item.Tamano_art3,
            Tamano_art4: item.Tamano_art4,
            ModoPrecio_art: item.ModoPrecio_art,
            Pesable_art: item.Pesable_art,
            PideObserva_art: item.PideObserva_art,
            NoReporte_art: item.NoReporte_art,
            UserMod_art: item.UserMod_art,
            ModOrigen_art: item.ModOrigen_art,
            ID_Art: item.ID_Art,
            LastUpdate_art: item.LastUpdate_art
          };
        }
        // Creamos un objeto para el talle actual con todos sus campos específicos
        const talleData = {
          talle: talle,
          Cantidad_dep: item.Cantidad_dep,
          Precio_Costo: item.Precio_Costo,
          Precio_CostoUSD: item.Precio_CostoUSD,
          Costo_ante: item.Costo_ante,
          Precio_Lista1: item.Precio_Lista1,
          Precio_Lista2: item.Precio_Lista2,
          Precio_Lista3: item.Precio_Lista3,
          Precio_Lista4: item.Precio_Lista4,
          Precio_Lista5: item.Precio_Lista5,
          Precio_Lista6: item.Precio_Lista6,
          Iva_art: item.Iva_art,
        };
        // Agregamos el objeto del talle al array de talles
        // Verificamos si el talle ya existe para evitar duplicados en el array
        if (!groupedArticles[codigoBase].talles.some(t => t.talle === talle)) {
          groupedArticles[codigoBase].talles.push(talleData);
        }
        // Agregamos el talle al array de talles del código base
        // Verificamos si el talle ya existe para evitar duplicados en el array
        // if (!groupedArticles[codigoBase].talles.includes(talle)) {
        //   groupedArticles[codigoBase].talles.push(talle);
        // }
      });

      // Convertimos el objeto agrupado en un array de objetos para la respuesta JSON
      const result = Object.values(groupedArticles);

      // 3. Devolvemos el JSON con los artículos agrupados
      res.json(result);
    }
  } catch (err) {
    res.status(401).send('art_deposito - acceso no Autorizado sin Token')
  }
};

export const getArt_depositostallespaginate = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData ? cookieData.token : null;

    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token');
    }

    // --- 1. Obtener parámetros de paginación de la URL
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // --- 2. Consulta para obtener el número total de artículos
    const countQuery = 'SELECT COUNT(*) AS total FROM kenay_sa.art_deposito WHERE Rubro_dep != 0 AND Descripcion_art != "%BAJA%" AND Baja_art != 1 AND TieneImagen != "No" AND Marca_Baja != "SI"';
    const [totalRows] = await pool.query(countQuery);
    const totalItems = totalRows[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // --- 3. Consulta para obtener solo los artículos de la página actual
    const dataQuery = `
      SELECT * FROM kenay_sa.art_deposito 
      WHERE Rubro_dep != 0 AND Descripcion_art != "%BAJA%" AND Baja_art != 1 AND TieneImagen != "No" AND Marca_Baja != "SI" AND Marca_Baja != "SI" 
      ORDER BY Codigo_art ASC
      LIMIT ?
      OFFSET ?
    `;
    const [rows] = await pool.query(dataQuery, [limit, offset]);
    
    // --- 4. Agrupar los artículos de la página actual
    const groupedArticles = {};
    rows.forEach(item => {
        const talleMatch = item.Codigo_art.match(/\.([0-9]+)$/);
        const codigoBase = talleMatch
            ? item.Codigo_art.substring(0, talleMatch.index)
            : item.Codigo_art;

        const talle = talleMatch ? talleMatch[1] : 'N/A';

        const descripcionLimpia = item.Descripcion_art.replace(/\s*(\.|-)\s*[0-9]+$/, '');

        if (!groupedArticles[codigoBase]) {
            groupedArticles[codigoBase] = {
                Codigo_art: codigoBase,
                descripcion: descripcionLimpia,
                talles: [],
                Codigo_Sintalle: item.Codigo_Sintalle,
                FechaIn_dep: item.FechaIn_dep,
                FechaMod_dep: item.FechaMod_dep,
                Rubro_dep: item.Rubro_dep,
                Subrubro_dep: item.Subrubro_dep,
                Temporada_dep: item.Temporada_dep,
                TieneImagen: item.TieneImagen,
                Ultima_Compra: item.Ultima_Compra,
                Compras_total: item.Compras_total,
                Bonifica_dep: item.Bonifica_dep,
                Notas_dep: item.Notas_dep,
                Marca_Art: item.Marca_Art,
                Cantidad_min: item.Cantidad_min,
                Codigo_prov: item.Codigo_prov,
                Inventariado_art: item.Inventariado_art,
                Fecha_inventario: item.Fecha_inventario,
                PrecioManual_art: item.PrecioManual_art,
                PrecioNoVence_art: item.PrecioNoVence_art,
                Gan_Lista4: item.Gan_Lista4,
                Gan_Lista3: item.Gan_Lista3,
                Gan_Lista1: item.Gan_Lista1,
                Gan_Lista2: item.Gan_Lista2,
                Gan_Lista5: item.Gan_Lista5,
                Gan_Lista6: item.Gan_Lista6,
                Impuesto_1: item.Impuesto_1,
                Descripcion_corta: item.Descripcion_corta,
                Baja_art: item.Baja_art,
                TipoImpuesto_art: item.TipoImpuesto_art,
                Impuestos_art: item.Impuestos_art,
                Segunda_unidad: item.Segunda_unidad,
                BotonPrioridad_art: item.BotonPrioridad_art,
                MaterialTipo_art: item.MaterialTipo_art,
                Pagina_art: item.Pagina_art,
                Unidad_compra: item.Unidad_compra,
                Marca_Baja: item.Marca_Baja,
                Desc_auto: item.Desc_auto,
                EnOferta_art: item.EnOferta_art,
                NoVender_art: item.NoVender_art,
                AuxiliarFijo_art: item.AuxiliarFijo_art,
                Publicar_Web: item.Publicar_Web,
                Desc_financiero: item.Desc_financiero,
                ConceptoFE_art: item.ConceptoFE_art,
                Vencimdias_art: item.Vencimdias_art,
                Publicar_WebConST: item.Publicar_WebConST,
                Publicar_WebSTMin: item.Publicar_WebSTMin,
                Imagen1_art: item.Imagen1_art,
                Imagen2_art: item.Imagen2_art,
                Imagen3_art: item.Imagen3_art,
                Imagen4_art: item.Imagen4_art,
                Talle_dep: item.Talle_dep,
                Perfil_impuestos: item.Perfil_impuestos,
                CantidadPack_art: item.CantidadPack_art,
                Tamano_art1: item.Tamano_art1,
                Tamano_art2: item.Tamano_art2,
                Tamano_art3: item.Tamano_art3,
                Tamano_art4: item.Tamano_art4,
                ModoPrecio_art: item.ModoPrecio_art,
                Pesable_art: item.Pesable_art,
                PideObserva_art: item.PideObserva_art,
                NoReporte_art: item.NoReporte_art,
                UserMod_art: item.UserMod_art,
                ModOrigen_art: item.ModOrigen_art,
                ID_Art: item.ID_Art,
                LastUpdate_art: item.LastUpdate_art
            };
        }
        const talleData = {
            talle: talle,
            Cantidad_dep: item.Cantidad_dep,
            Precio_Costo: item.Precio_Costo,
            Precio_CostoUSD: item.Precio_CostoUSD,
            Costo_ante: item.Costo_ante,
            Precio_Lista1: item.Precio_Lista1,
            Precio_Lista2: item.Precio_Lista2,
            Precio_Lista3: item.Precio_Lista3,
            Precio_Lista4: item.Precio_Lista4,
            Precio_Lista5: item.Precio_Lista5,
            Precio_Lista6: item.Precio_Lista6,
            Iva_art: item.Iva_art,
        };
        if (!groupedArticles[codigoBase].talles.some(t => t.talle === talle)) {
            groupedArticles[codigoBase].talles.push(talleData);
        }
    });

    const paginatedArticles = Object.values(groupedArticles);
    
    // --- 5. Enviar respuesta con metadatos de paginación
    res.json({
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: limit,
      data: paginatedArticles,
    });

  } catch (err) {
    console.error('Error al procesar la solicitud:', err);
    res.status(401).send('art_deposito - acceso no Autorizado sin Token');
  }
};

export const getArt_depositostallespaginatecursor = async (req, res) => {
  try {
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    const token = cookieData ? cookieData.token : null;

    if (!token) {
      return res.status(403).send('Acceso no Autorizado, no llega token');
    }

    // --- 1. Obtener parámetros de paginación por cursor
    const limit = parseInt(req.query.limit) || 20;
    const lastId = req.query.cursor || null;

    // --- 2. Modificar la consulta para usar el cursor
    let dataQuery = `
      SELECT * FROM kenay_sa.art_deposito 
      WHERE Rubro_dep != 0 AND Descripcion_art != "%BAJA%" AND Baja_art != 1 AND TieneImagen != "No" AND Marca_Baja != "SI"
    `;
    const queryParams = [];

    // Si se proporciona un cursor, agregar la condición
    if (lastId) {
      dataQuery += ` AND Codigo_art > ?`;
      queryParams.push(lastId);
    }
    
    // El orden y el límite son cruciales para la paginación por cursor
    dataQuery += ` ORDER BY Codigo_art ASC LIMIT ?`;
    queryParams.push(limit);

    const [rows] = await pool.query(dataQuery, queryParams);
    
    // --- 3. Procesar y agrupar los artículos
    const groupedArticles = {};
    rows.forEach(item => {
        const talleMatch = item.Codigo_art.match(/\.([0-9]+)$/);
        const codigoBase = talleMatch ? item.Codigo_art.substring(0, talleMatch.index) : item.Codigo_art;
        const talle = talleMatch ? talleMatch[1] : 'N/A';
        const descripcionLimpia = item.Descripcion_art.replace(/\s*(\.|-)\s*[0-9]+$/, '');

        if (!groupedArticles[codigoBase]) {
            groupedArticles[codigoBase] = {
                Codigo_art: codigoBase,
                descripcion: descripcionLimpia,
                talles: [],
                ...item
            };
        }
        const talleData = {
            talle: talle,
            Cantidad_dep: item.Cantidad_dep,
            Precio_Costo: item.Precio_Costo,
            Precio_CostoUSD: item.Precio_CostoUSD,
            Costo_ante: item.Costo_ante,
            Precio_Lista1: item.Precio_Lista1,
            Precio_Lista2: item.Precio_Lista2,
            Precio_Lista3: item.Precio_Lista3,
            Precio_Lista4: item.Precio_Lista4,
            Precio_Lista5: item.Precio_Lista5,
            Precio_Lista6: item.Precio_Lista6,
            Iva_art: item.Iva_art,
        };
        if (!groupedArticles[codigoBase].talles.some(t => t.talle === talle)) {
            groupedArticles[codigoBase].talles.push(talleData);
        }
    });

    const paginatedArticles = Object.values(groupedArticles);
    
    // --- 4. Determinar el próximo cursor y si hay más páginas
    const nextCursor = rows.length > 0 ? rows[rows.length - 1].Codigo_art : null;
    const hasNextPage = rows.length === limit;

    // --- 5. Enviar respuesta con metadatos de paginación
    res.json({
      data: paginatedArticles,
      nextCursor: hasNextPage ? nextCursor : null,
      hasNextPage: hasNextPage
    });

  } catch (err) {
    console.error('Error al procesar la solicitud:', err);
    res.status(401).send('art_deposito - acceso no Autorizado sin Token');
  }
};

export const getPaginatedAndFilteredData = (tableName, filterClause) => {
  return async (req, res) => {
    try {
      // 1. Validar el token de la cookie
      const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
      if (!cookieData || !cookieData.token) {
        // console.log("Acceso no Autorizado, no llega token en la cookie");
        return res.status(401).send('Acceso no Autorizado. Por favor, inicie sesión.');
      }

      // 2. Obtener los parámetros de paginación de la URL
      const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
      const limit = parseInt(req.query.limit) || 200; // Límite de registros, por defecto 20
      const offset = (page - 1) * limit; // Calcula el OFFSET

      // 3. Obtener el total de registros para los metadatos de la paginación
      const [totalRows] = await pool.query(`SELECT COUNT(*) as count FROM kenay_sa.${tableName} ${filterClause}`);
      const totalCount = totalRows[0].count;

      // 4. Construir y ejecutar la consulta con LIMIT y OFFSET
      const query = `SELECT * FROM kenay_sa.${tableName} ${filterClause} LIMIT ? OFFSET ?`;
      const [rows] = await pool.query(query, [limit, offset]);

      // 5. Enviar la respuesta con los metadatos de paginación
      res.json({
        total: totalCount,
        page: page,
        limit: limit,
        data: rows,
      });

    } catch (err) {
      // console.error(`Error al obtener datos paginados de ${tableName}:`, err);
      res.status(500).send('Error interno del servidor. No se pudieron obtener los datos.');
    }
  };
};


export const getArt_depositos_cursor = async (req, res) => {
  try {
    // 1. Token validation (same as before)
    const cookieData = req.cookies.user_data ? JSON.parse(req.cookies.user_data) : null;
    if (!cookieData || !cookieData.token) {
      // console.log("Acceso no Autorizado, no llega token en la cookie");
      return res.status(401).send('Acceso no Autorizado. Por favor, inicie sesión.');
    }

    // 2. Get pagination parameters from the URL
    const lastId = req.query.lastId ? parseInt(req.query.lastId) : 0; // The cursor
    const limit = parseInt(req.query.limit) || 50; // Items per page, default 50

    // 3. Build the query using the cursor (lastId)
    let query = `
      SELECT * FROM kenay_sa.art_deposito
      WHERE Descripcion_art NOT LIKE "%BAJA%"
    `;
    let queryParams = [];

    // Add the cursor condition if lastId is provided
    if (lastId > 0) {
      query += ` AND Codigo_art > ?`; // Assuming 'ID' is your unique indexed column
      queryParams.push(lastId);
    }

    // Add ORDER BY and LIMIT
    query += ` ORDER BY Codigo_art ASC LIMIT ?`;
    queryParams.push(limit);

    // 4. Execute the query
    const [rows] = await pool.query(query, queryParams);

    // 5. Send the response with data and the next cursor
    const nextCursor = rows.length > 0 ? rows[rows.length - 1].ID : null;

    res.json({
      data: rows,
      nextCursor: nextCursor,
      hasMore: rows.length === limit,
    });

  } catch (err) {
    // console.error("Error fetching art_depositos with cursor:", err);
    res.status(500).send('Error interno del servidor. No se pudieron obtener los datos.');
  }
};



export const getArt_deposito = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM kenay_sa.art_deposito WHERE Codigo_art = ?', [req.params.id])
    if (rows.length <= 0) {
      return res.status(404).send('Art_deposito not found: ' + req.params.id);
    } else if (rows.length > 1) {
      return res.status(500).send('Multiple Art_depositos found with the same ID');
    }
    res.json(rows[0]);
    //  res.json(rows);  manda como objeto, si se quiere como array, usar res.json([rows[0]])    
  } catch (err) {
    // console.error(err);
    res.status(500).send('Art_deposito not found');
  }
}

export const createArt_deposito = async (req, res) => {
  try {
    await pool.query('INSERT INTO kenay_sa.art_deposito SET ?', [req.body])
    res.status(201).send('Art_deposito created successfully:' + JSON.stringify(req.body));
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error creating Art_deposito');
  }
};

export const deleteArt_deposito = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM kenay_sa.art_deposito WHERE Codigo_art = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'Art_deposito not found'
    });
    res.sendStatus(204); // 204 OK
    //res.json({ message: 'Art_deposito deleted successfully: ' + req.params.id });
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error deleting Art_deposito');
  }
}

export const updateArt_deposito = async (req, res) => {
  try {
    //const { Codigo_art } = req.params;
    //const {   Nombre_ven, Domicilio_ven, Ciudad_ven, Telefono_ven, Celular_ven, comision_ven, Codigo_alta } = req.body;
    const [result] = await pool.query('UPDATE kenay_sa.art_deposito SET Nombre_ven = IFNULL(?, nombre_ven), Domicilio_ven = IFNULL(?, Domicilio_ven), Ciudad_ven = IFNULL(?, Ciudad_ven), Telefono_ven = IFNULL(?, Telefono_ven), Celular_ven = IFNULL(?, Celular_ven), comision_ven = IFNULL(?, comision_ven), Codigo_alta = IFNULL(?, Codigo_alta) WHERE Codigo_art = ?', [req.body.Nombre_ven, req.body.Domicilio_ven, req.body.Ciudad_ven, req.body.Telefono_ven, req.body.Celular_ven, req.body.comision_ven, req.body.Codigo_alta, req.params.id]);
    // console.log(result);
    res.json(result); // Return the updated Art_deposito data
    //res.send('Art_deposito updated successfully: ' + JSON.stringify(req.body));
  } catch (err) {
    // console.error(err);
    res.status(500).send('Error updating Art_deposito');
  }
}