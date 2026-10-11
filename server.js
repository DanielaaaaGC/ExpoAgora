const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const db = require("./db");

dotenv.config();

const app = express();

// Aumentamos el límite del body parser a 10mb para permitir la subida de imágenes/banderas en Base64
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// =========================================================
// REGISTRO Y LOGIN DE USUARIOS
// =========================================================
const crypto = require('crypto');
const sessionSecret = process.env.SESSION_SECRET;
function crearToken(usuario) {
    if (!sessionSecret) throw new Error('Falta SESSION_SECRET en backend/.env');
    const payload = Buffer.from(JSON.stringify({id:usuario.id_usuario, rol:usuario.rol, exp:Date.now()+8*60*60*1000})).toString('base64url');
    const firma = crypto.createHmac('sha256',sessionSecret).update(payload).digest('base64url');
    return `${payload}.${firma}`;
}
function leerToken(req){
    if(!sessionSecret) return null;
    const token=(req.get('Authorization')||'').replace(/^Bearer /i,'');
    const [payload,firma,...rest]=token.split('.');
    if(!payload||!firma||rest.length)return null;
    const esperado=crypto.createHmac('sha256',sessionSecret).update(payload).digest('base64url');
    const a=Buffer.from(firma),b=Buffer.from(esperado);
    if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return null;
    try{const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.exp>Date.now()?data:null;}catch{return null}
}
app.post('/api/login',async(req,res)=>{
  try{
    const {correo,contrasena}=req.body||{};
    if(!correo||!contrasena)return res.status(400).json({mensaje:'Ingresa correo y contraseña.'});
    const x=await db.query('SELECT id_usuario,nombre,apellido,correo,contrasena,rol,activo FROM usuario WHERE LOWER(correo)=LOWER($1) LIMIT 1',[correo.trim()]);
    const usuario=x.rows[0];
    if(!usuario||usuario.activo===false||!usuario.contrasena||!(await bcrypt.compare(contrasena,usuario.contrasena)))return res.status(401).json({mensaje:'Correo o contraseña incorrectos.'});
    const {contrasena:_,...seguro}=usuario;
    res.json({usuario:seguro,token:crearToken(seguro)});
  }catch(err){console.error('Error login:',err);res.status(500).json({mensaje:'No se pudo iniciar sesión. Revisa la conexión y SESSION_SECRET.'})}
});

app.post("/api/usuarios", async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena, rol } = req.body;

        if (!nombre || !apellido || !correo || !contrasena || !rol) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        if (rol !== "estudiante" && rol !== "profesor") {
            return res.status(400).json({
                mensaje: "El rol seleccionado no es válido."
            });
        }

        const usuarioExistente = await db.query(
            `SELECT id_usuario FROM usuario WHERE correo = $1`,
            [correo]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario con ese correo."
            });
        }

        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

        const resultado = await db.query(
            `
            INSERT INTO usuario (
                nombre,
                apellido,
                correo,
                contrasena,
                proveedor,
                rol
            )
            VALUES ($1, $2, $3, $4, 'local', $5)
            RETURNING
                id_usuario,
                nombre,
                apellido,
                correo,
                rol,
                avatar_id,
                activo,
                fecha_registro
            `,
            [nombre, apellido, correo, contrasenaEncriptada, rol]
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario: resultado.rows[0]
        });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({
            mensaje: "Error al registrar el usuario.",
            detalle: error.message
        });
    }
});

app.post("/api/registro", async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena, rol } = req.body;

        if (!nombre || !apellido || !correo || !contrasena || !rol) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        if (rol !== "estudiante" && rol !== "profesor") {
            return res.status(400).json({ error: "El rol debe ser estudiante o profesor" });
        }

        const usuarioExistente = await db.query(
            `SELECT id_usuario FROM usuario WHERE correo = $1`,
            [correo]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        const hash = await bcrypt.hash(contrasena, 10);

        const resultado = await db.query(
            `INSERT INTO usuario (nombre, apellido, correo, contrasena, rol)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id_usuario, nombre, apellido, correo, rol, fecha_registro`,
            [nombre, apellido, correo, hash, rol]
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: resultado.rows[0]
        });
    } catch (error) {
        console.error("Error registrando usuario:", error);
        res.status(500).json({
            error: "Error al registrar usuario",
            detalle: error.message
        });
    }
});

// =========================================================
// GESTIÓN DE ESTUDIANTES (CRUD)
// =========================================================
app.get("/api/estudiantes", async (req, res) => {
    try {
        const resultado = await db.query(`
            SELECT 
                id_usuario,
                nombre,
                apellido,
                correo,
                rol,
                avatar_id,
                activo,
                fecha_registro,
                ultimo_acceso
            FROM usuario
            WHERE rol = 'estudiante'
            ORDER BY id_usuario ASC
        `);

        res.json(resultado.rows);
    } catch (error) {
        console.error("Error obteniendo estudiantes:", error);
        res.status(500).json({
            error: "Error al obtener los estudiantes",
            detalle: error.message
        });
    }
});

app.get("/api/estudiantes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const estudiante = await db.query(
            `SELECT id_usuario, nombre, apellido, correo, rol, avatar_id, activo, fecha_registro 
             FROM usuario 
             WHERE id_usuario = $1 AND rol = 'estudiante'`,
            [id]
        );

        if (estudiante.rows.length === 0) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }

        res.json(estudiante.rows[0]);
    } catch (error) {
        console.error("Error al obtener estudiante por ID:", error);
        res.status(500).json({ error: "Error del servidor", detalle: error.message });
    }
});

app.put("/api/estudiantes/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;

    try {
        const resultado = await db.query(
            `UPDATE usuario 
             SET nombre = $1, apellido = $2, correo = $3 
             WHERE id_usuario = $4 AND rol = 'estudiante'
             RETURNING id_usuario, nombre, apellido, correo`,
            [nombre, apellido, correo, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Estudiante no encontrado." });
        }

        res.json({
            mensaje: "Estudiante actualizado correctamente.",
            estudiante: resultado.rows[0]
        });
    } catch (error) {
        console.error("Error al actualizar estudiante:", error);
        res.status(500).json({
            error: "Error al actualizar estudiante en la base de datos.",
            detalle: error.message
        });
    }
});

app.delete("/api/estudiantes/:id", async (req, res) => {
    const { id } = req.params;
    const client = await (db.getClient ? db.getClient() : null);

    try {
        if (client) await client.query("BEGIN");
        const queryRunner = client || db;

        await queryRunner.query(`DELETE FROM sesion WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM usuario_curso WHERE usuario_id = $1`, [id]);
        await queryRunner.query(`DELETE FROM resultado_quiz WHERE id_estudiante = $1`, [id]);
        await queryRunner.query(`DELETE FROM usuario_recompensa WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM racha WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM caja_ideas WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM miembro_partido WHERE id_estudiante = $1`, [id]);
        await queryRunner.query(`DELETE FROM voto WHERE id_estudiante = $1`, [id]);
        
        await queryRunner.query(`
            DELETE FROM mensaje_chat 
            WHERE conversacion_id IN (SELECT id_conversacion FROM conversacion_chat WHERE usuario = $1)
        `, [id]);
        await queryRunner.query(`DELETE FROM conversacion_chat WHERE usuario = $1`, [id]);

        const resultado = await queryRunner.query(
            `DELETE FROM usuario 
             WHERE id_usuario = $1 AND rol = 'estudiante' 
             RETURNING id_usuario`,
            [id]
        );

        if (resultado.rows.length === 0) {
            if (client) await client.query("ROLLBACK");
            return res.status(404).json({
                error: "Estudiante no encontrado o no corresponde al rol de estudiante."
            });
        }

        if (client) await client.query("COMMIT");

        res.json({
            mensaje: "Estudiante y todos sus registros asociados fueron eliminados con éxito",
            id_usuario: id
        });
    } catch (error) {
        if (client) await client.query("ROLLBACK");
        console.error("Error al eliminar estudiante:", error);
        res.status(500).json({
            error: "Error al intentar eliminar el estudiante de la base de datos.",
            detalle: error.message
        });
    } finally {
        if (client) client.release();
    }
});

// =========================================================
// MÓDULO DE CREACIÓN DE PARTIDOS POLÍTICOS Y PROPUESTAS
// =========================================================
app.get("/api/formulario", async (req, res) => {
    try {
        const gobiernosRes = await db.query(
            `SELECT id_gobierno, nombre, estado FROM gobierno_estudiantil ORDER BY id_gobierno DESC`
        );

        const profesoresRes = await db.query(
            `SELECT id_usuario, nombre, apellido FROM usuario WHERE rol = 'profesor' ORDER BY apellido ASC`
        );

        const estudiantesRes = await db.query(
            `SELECT id_usuario, nombre, apellido FROM usuario WHERE rol = 'estudiante' ORDER BY apellido ASC`
        );

        const membresiasRes = await db.query(
            `SELECT m.id_estudiante, m.id_partido, p.gobierno_id, p.nombre AS partido 
             FROM miembro_partido m
             JOIN partido_politico p ON m.id_partido = p.id_partido`
        );

        const partidosRes = await db.query(
            `SELECT 
                p.id_partido, 
                p.nombre, 
                p.descripcion, 
                p.bandera_url,
                g.nombre AS gobierno,
                (SELECT COUNT(*) FROM miembro_partido m WHERE m.id_partido = p.id_partido) AS integrantes,
                (SELECT COUNT(*) FROM propuesta pr WHERE pr.id_partido = p.id_partido) AS propuestas
             FROM partido_politico p
             LEFT JOIN gobierno_estudiantil g ON p.gobierno_id = g.id_gobierno
             ORDER BY p.id_partido DESC`
        );

        res.json({
            baseDeDatos: process.env.DB_NAME || "agora",
            gobiernos: gobiernosRes.rows,
            profesores: profesoresRes.rows,
            estudiantes: estudiantesRes.rows,
            membresias: membresiasRes.rows,
            partidos: partidosRes.rows,
            sinProfesores: profesoresRes.rows.length === 0
        });
    } catch (error) {
        console.error("Error al obtener datos del formulario:", error);
        res.status(500).json({
            error: "Error al obtener datos del formulario desde la base de datos",
            detalle: error.message
        });
    }
});

app.post("/api/partidos", async (req, res) => {
    const { nombre, descripcion, gobierno_id, creador_id, bandera, miembros, propuestas } = req.body;

    if (!nombre || !gobierno_id || !creador_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios para registrar el partido." });
    }

    const client = await (db.getClient ? db.getClient() : null);
    const queryRunner = client || db;

    try {
        if (client) await client.query("BEGIN");

        const banderaUrl = bandera ? bandera.datos : null;

        const partidoRes = await queryRunner.query(
            `INSERT INTO partido_politico (nombre, descripcion, gobierno_id, creador_id, bandera_url)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id_partido, nombre, descripcion, bandera_url`,
            [nombre, descripcion, gobierno_id, creador_id, banderaUrl]
        );

        const nuevoPartido = partidoRes.rows[0];

        if (Array.isArray(miembros)) {
            for (const m of miembros) {
                if (m.id_estudiante) {
                    await queryRunner.query(
                        `INSERT INTO miembro_partido (id_partido, id_estudiante, cargo)
                         VALUES ($1, $2, $3)`,
                        [nuevoPartido.id_partido, m.id_estudiante, m.cargo]
                    );
                }
            }
        }

        if (Array.isArray(propuestas)) {
            for (const p of propuestas) {
                if (p.titulo && p.titulo.trim()) {
                    await queryRunner.query(
                        `INSERT INTO propuesta (id_partido, titulo, descripcion)
                         VALUES ($1, $2, $3)`,
                        [nuevoPartido.id_partido, p.titulo, p.descripcion]
                    );
                }
            }
        }

        if (client) await client.query("COMMIT");

        const miembrosGuardados = await db.query(
            `SELECT m.cargo, u.nombre || ' ' || u.apellido AS nombre 
             FROM miembro_partido m
             JOIN usuario u ON m.id_estudiante = u.id_usuario
             WHERE m.id_partido = $1`,
            [nuevoPartido.id_partido]
        );

        const propuestasGuardadas = await db.query(
            `SELECT titulo, descripcion FROM propuesta WHERE id_partido = $1`,
            [nuevoPartido.id_partido]
        );

        const gobiernoGuardado = await db.query(
            `SELECT nombre FROM gobierno_estudiantil WHERE id_gobierno = $1`,
            [gobierno_id]
        );

        res.status(201).json({
            mensaje: "Partido registrado con éxito.",
            partido: {
                ...nuevoPartido,
                gobierno: gobiernoGuardado.rows[0]?.nombre || `Gobierno ${gobierno_id}`,
                miembros: miembrosGuardados.rows,
                propuestas: propuestasGuardadas.rows
            }
        });

    } catch (error) {
        if (client) await client.query("ROLLBACK");
        console.error("Error al guardar partido político:", error);
        res.status(500).json({
            error: "Error al registrar el partido político.",
            detalle: error.message
        });
    } finally {
        if (client) client.release();
    }
});

app.get("/api/partidos", async (req, res) => {
    try {
        const resultado = await db.query(`
            SELECT 
                id_partido,
                nombre,
                descripcion,
                bandera_url
            FROM partido_politico
            ORDER BY id_partido ASC
        `);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error obteniendo partidos políticos:", error);
        res.status(500).json({
            error: "Error al obtener los partidos políticos",
            detalle: error.message
        });
    }
});

app.get("/api/partidos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const miembrosQuery = `
            SELECT DISTINCT ON (m.id_miembro)
                m.id_miembro,
                m.cargo,
                u.nombre,
                u.apellido,
                c.nombre AS curso_nombre
            FROM miembro_partido m
            JOIN usuario u ON m.id_estudiante = u.id_usuario
            LEFT JOIN usuario_curso uc ON u.id_usuario = uc.usuario_id
            LEFT JOIN curso c ON uc.curso_id = c.id_curso
            WHERE m.id_partido = $1
            ORDER BY m.id_miembro ASC
        `;
        const miembrosRes = await db.query(miembrosQuery, [id]);

        const propuestasQuery = `
            SELECT 
                id_propuesta, 
                titulo, 
                descripcion 
            FROM propuesta 
            WHERE id_partido = $1
            ORDER BY id_propuesta ASC
        `;
        const propuestasRes = await db.query(propuestasQuery, [id]);

        res.json({
            miembros: miembrosRes.rows,
            propuestas: propuestasRes.rows
        });
    } catch (error) {
        console.error("Error obteniendo detalles del partido:", error);
        res.status(500).json({
            error: "Error al obtener detalles del partido",
            detalle: error.message
        });
    }
});

app.post("/api/votar", async (req, res) => {
    const { id_estudiante, id_partido } = req.body;

    if (!id_estudiante || !id_partido) {
        return res.status(400).json({ error: "Faltan datos requeridos para emitir el voto." });
    }

    try {
        const votoPrevio = await db.query(
            "SELECT id_voto FROM voto WHERE id_estudiante = $1",
            [id_estudiante]
        );

        if (votoPrevio.rows.length > 0) {
            return res.status(400).json({ error: "Ya has emitido tu voto anteriormente." });
        }

        await db.query(
            "INSERT INTO voto (id_estudiante, id_partido) VALUES ($1, $2)",
            [id_estudiante, id_partido]
        );

        res.status(201).json({ mensaje: "Voto registrado exitosamente." });
    } catch (error) {
        console.error("Error al registrar voto:", error);
        res.status(500).json({
            error: "Error al guardar el voto en el servidor.",
            detalle: error.message
        });
    }
});

// =========================================================
// PROPUESTAS PARA EL QUIZ DE AFINIDAD
// =========================================================
app.get("/api/propuestas", async (req, res) => {
    try {
        const resultado = await db.query(
            `SELECT id_propuesta, id_partido, titulo, descripcion 
             FROM propuesta 
             ORDER BY id_propuesta ASC`
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener propuestas:", error);
        res.status(500).json({ error: "Error al obtener propuestas de la base de datos", detalle: error.message });
    }
});

// =========================================================
// EVENTOS / CALENDARIO
// =========================================================
app.get("/api/eventos", async (req, res) => {
    try {
        const resultado = await db.query(
            "SELECT id_evento, titulo, descripcion, fecha_inicio, fecha_fin, id_modulo FROM evento ORDER BY fecha_inicio ASC"
        );
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ error: "Error al obtener los eventos.", detalle: error.message });
    }
});

app.post("/api/eventos", async (req, res) => {
    const { titulo, descripcion, fecha_inicio, fecha_fin, id_modulo } = req.body;

    if (!titulo || !fecha_inicio) {
        return res.status(400).json({ error: "El título y la fecha de inicio son requeridos." });
    }

    try {
        const query = `
            INSERT INTO evento (titulo, descripcion, fecha_inicio, fecha_fin, id_modulo)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const valores = [
            titulo,
            descripcion || "",
            fecha_inicio,
            fecha_fin || fecha_inicio,
            id_modulo || null
        ];

        const resultado = await db.query(query, valores);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error("Error al crear evento:", error);
        res.status(500).json({ error: "Error al registrar el evento.", detalle: error.message });
    }
});

app.put("/api/eventos/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_inicio, fecha_fin, id_modulo } = req.body;

    try {
        const query = `
            UPDATE evento
            SET titulo = $1, descripcion = $2, fecha_inicio = $3, fecha_fin = $4, id_modulo = $5
            WHERE id_evento = $6
            RETURNING *;
        `;
        const valores = [
            titulo,
            descripcion || "",
            fecha_inicio,
            fecha_fin || fecha_inicio,
            id_modulo || null,
            id
        ];

        const resultado = await db.query(query, valores);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Evento no encontrado." });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error("Error al actualizar evento:", error);
        res.status(500).json({ error: "Error al actualizar el evento.", detalle: error.message });
    }
});

app.delete("/api/eventos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = await db.query(
            "DELETE FROM evento WHERE id_evento = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Evento no encontrado." });
        }

        res.json({ mensaje: "Evento eliminado correctamente.", evento: resultado.rows[0] });
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        res.status(500).json({ error: "Error al eliminar el evento.", detalle: error.message });
    }
});

// =========================================================
// CUESTIONARIOS Y NOTAS
// =========================================================
const catalogoCuestionarios = require('./quiz-catalog.json');
async function asegurarIntentosEducativos(){
  await db.query(`CREATE TABLE IF NOT EXISTS public.agora_intentos_educativos (
    id_intento BIGSERIAL PRIMARY KEY,
    id_estudiante INTEGER NOT NULL REFERENCES public.usuario(id_usuario),
    id_tema VARCHAR(120) NOT NULL,
    nombre_quiz TEXT NOT NULL,
    aciertos INTEGER NOT NULL,
    total INTEGER NOT NULL,
    porcentaje INTEGER NOT NULL,
    fecha TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
}

app.post('/api/cuestionarios-educativos/entregar', async (req, res) => {
  try {
    const sesion = leerToken(req);
    if (!sesion) return res.status(401).json({ mensaje: 'Inicia sesión para guardar tu calificación.' });
    const usuario = await db.query('SELECT id_usuario,rol,activo FROM public.usuario WHERE id_usuario=$1', [sesion.id]);
    if (!usuario.rows.length || !usuario.rows[0].activo || usuario.rows[0].rol !== 'estudiante') {
      return res.status(403).json({ mensaje: 'Solo estudiantes pueden registrar estos cuestionarios.' });
    }
    const { temaId, respuestas } = req.body || {};
    const tema = catalogoCuestionarios.flatMap(m => m.topics.map(t => ({ ...t, modulo: m.title }))).find(t => t.id === temaId);
    if (!tema || !tema.answers.length) return res.status(404).json({ mensaje: 'Cuestionario no disponible.' });
    if (!Array.isArray(respuestas) || respuestas.length !== tema.answers.length || respuestas.some(x => !Number.isInteger(x) || x < 0)) {
      return res.status(400).json({ mensaje: 'Responde todas las preguntas antes de entregar.' });
    }
    const aciertos = tema.answers.filter((correcta, i) => correcta === respuestas[i]).length;
    const porcentaje = Math.round(100 * aciertos / tema.answers.length);
    await asegurarIntentosEducativos();
    const guardado = await db.query(`INSERT INTO public.agora_intentos_educativos
       (id_estudiante, id_tema, nombre_quiz, aciertos, total, porcentaje)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_intento, fecha`,
       [sesion.id, temaId, `${tema.modulo} · ${tema.title}`, aciertos, tema.answers.length, porcentaje]);
    res.status(201).json({ aciertos, total: tema.answers.length, porcentaje, fecha: guardado.rows[0].fecha });
  } catch (err) {
    console.error('Error al guardar cuestionario educativo:', err);
    res.status(500).json({ mensaje: 'No se pudo guardar la nota. Intenta nuevamente.' });
  }
});

app.get('/api/notas', async (req, res) => {
  try {
    const sesion = leerToken(req);
    if (!sesion) return res.status(401).json({ mensaje: 'Tu sesión ha vencido. Vuelve a iniciar sesión.' });
    const id = Number(sesion.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(401).json({ mensaje: 'Sesión inválida.' });
    const u = await db.query('SELECT id_usuario,rol FROM usuario WHERE id_usuario=$1 AND activo=true', [id]);
    if (!u.rows.length) return res.status(403).json({ mensaje: 'Usuario no autorizado.' });
    const profesor = u.rows[0].rol === 'profesor';
    const existe = await db.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='resultado_quiz'");
    const cols = new Set(existe.rows.map(c => c.column_name));
    let anteriores = [];
    if (cols.has('id_estudiante')) {
      const titulo = await db.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='quiz'");
      const colsQuiz = new Set(titulo.rows.map(c => c.column_name));
      const nombreQuiz = colsQuiz.has('nombre') ? 'nombre' : colsQuiz.has('titulo') ? 'titulo' : null;
      const join = colsQuiz.has('id_quiz') && cols.has('id_quiz');
      const selectQuiz = join && nombreQuiz ? `q.${nombreQuiz} AS quiz` : 'NULL::text AS quiz';
      const sql = `SELECT r.*, u.nombre, u.apellido, u.correo, ${selectQuiz}
        FROM resultado_quiz r JOIN usuario u ON u.id_usuario=r.id_estudiante
        ${join ? 'LEFT JOIN quiz q ON q.id_quiz=r.id_quiz' : ''}
        ${profesor ? '' : 'WHERE r.id_estudiante=$1'}`;
      anteriores = (await db.query(sql, profesor ? [] : [id])).rows;
    }
    await asegurarIntentosEducativos();
    const nuevos = (await db.query(`SELECT a.id_intento, a.id_estudiante, a.nombre_quiz AS quiz,
      a.porcentaje, a.porcentaje AS nota, a.fecha, u.nombre, u.apellido, u.correo,
      (SELECT COUNT(*)::int FROM public.agora_intentos_educativos b
        WHERE b.id_estudiante=a.id_estudiante AND b.id_tema=a.id_tema AND b.fecha<=a.fecha) AS intentos
      FROM public.agora_intentos_educativos a
      JOIN public.usuario u ON u.id_usuario=a.id_estudiante
      ${profesor ? '' : 'WHERE a.id_estudiante=$1'} ORDER BY a.fecha DESC`, profesor ? [] : [id])).rows;
    res.json([...nuevos, ...anteriores]);
  } catch (err) {
    console.error('Error al consultar notas:', err);
    res.status(500).json({ mensaje: 'No se pudieron consultar las calificaciones.' });
  }
});

// =========================================================
// ENDPOINTS PARA LA CAJA DE IDEAS
// =========================================================
app.get("/api/usuarios", async (req, res) => {
    try {
        const resultado = await db.query(`
            SELECT 
                id_usuario,
                nombre,
                apellido,
                correo,
                rol,
                COALESCE(avatar_id, 1) AS avatar_id,
                activo,
                fecha_registro
            FROM usuario
            ORDER BY id_usuario ASC
        `);

        res.json({
            modo: "bd",
            baseDeDatos: process.env.DB_NAME || "agora",
            motivo: "",
            usuarios: resultado.rows
        });
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        res.status(500).json({ error: "Error al obtener los usuarios", detalle: error.message });
    }
});

app.get("/api/ideas", async (req, res) => {
    try {
        const ideasRes = await db.query(`
            SELECT 
                i.id_idea,
                i.id_usuario,
                i.comentario,
                i.fecha,
                u.nombre,
                u.apellido,
                u.rol,
                COALESCE(u.avatar_id, 1) AS avatar_id
            FROM caja_ideas i
            JOIN usuario u ON i.id_usuario = u.id_usuario
            ORDER BY i.fecha DESC
        `);

        res.json({
            modo: "bd",
            baseDeDatos: process.env.DB_NAME || "agora",
            motivo: "",
            ideas: ideasRes.rows
        });
    } catch (error) {
        console.error("Error al obtener ideas:", error);
        res.status(500).json({ error: "Error al obtener las ideas.", detalle: error.message });
    }
});

app.post("/api/ideas", async (req, res) => {
    const { id_usuario, comentario } = req.body;

    if (!id_usuario || !comentario || !comentario.trim()) {
        return res.status(400).json({ error: "El usuario y el comentario son obligatorios." });
    }

    try {
        const resultado = await db.query(
            `INSERT INTO caja_ideas (id_usuario, comentario) 
             VALUES ($1, $2) 
             RETURNING id_idea, id_usuario, comentario, fecha`,
            [id_usuario, comentario.trim()]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error("Error al crear idea:", error);
        res.status(500).json({ error: "Error al guardar la idea.", detalle: error.message });
    }
});

app.delete("/api/ideas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await db.query(
            "DELETE FROM caja_ideas WHERE id_idea = $1 RETURNING id_idea",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: "Idea no encontrada." });
        }

        res.json({ mensaje: "Idea eliminada correctamente.", id_idea: id });
    } catch (error) {
        console.error("Error al eliminar idea:", error);
        res.status(500).json({ error: "Error al eliminar la idea.", detalle: error.message });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});