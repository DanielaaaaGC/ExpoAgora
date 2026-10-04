const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const db = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});



app.post("/api/usuarios", async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            contrasena,
            rol
        } = req.body;


     
        if (
            !nombre ||
            !apellido ||
            !correo ||
            !contrasena ||
            !rol
        ) {

            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios."
            });

        }


       

        if (
            rol !== "estudiante" &&
            rol !== "profesor"
        ) {

            return res.status(400).json({
                mensaje: "El rol seleccionado no es válido."
            });

        }


        const usuarioExistente = await db.query(
            `
            SELECT id_usuario
            FROM usuario
            WHERE correo = $1
            `,
            [correo]
        );


        if (usuarioExistente.rows.length > 0) {

            return res.status(409).json({
                mensaje: "Ya existe un usuario con ese correo."
            });

        }


        

        const contrasenaEncriptada = await bcrypt.hash(
            contrasena,
            10
        );



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
            VALUES (
                $1,
                $2,
                $3,
                $4,
                'local',
                $5
            )
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
            [
                nombre,
                apellido,
                correo,
                contrasenaEncriptada,
                rol
            ]
        );


        

        res.status(201).json({
            mensaje: "Usuario registrado correctamente.",
            usuario: resultado.rows[0]
        });


    } catch (error) {

        console.error(
            "Error registrando usuario:",
            error
        );

        res.status(500).json({
            mensaje: "Error al registrar el usuario.",
            detalle: error.message
        });

    }

});




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
            ORDER BY id_usuario
        `);

        res.json(resultado.rows);

    } catch (error) {

        console.error(
            "Error obteniendo estudiantes:",
            error
        );

        res.status(500).json({
            error: "Error al obtener los estudiantes",
            detalle: error.message
        });

    }

});



app.post("/api/registro", async (req, res) => {
    try {

        const {
            nombre,
            apellido,
            correo,
            contrasena,
            rol
        } = req.body;

        // Validar campos
        if (
            !nombre ||
            !apellido ||
            !correo ||
            !contrasena ||
            !rol
        ) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }

        // Validar rol
        if (rol !== "estudiante" && rol !== "profesor") {
            return res.status(400).json({
                error: "El rol debe ser estudiante o profesor"
            });
        }

        // Comprobar si el correo ya existe
        const usuarioExistente = await db.query(
            `SELECT id_usuario
             FROM usuario
             WHERE correo = $1`,
            [correo]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({
                error: "El correo ya está registrado"
            });
        }

        // HASHEAR CONTRASEÑA
        const hash = await bcrypt.hash(contrasena, 10);

        // Guardar usuario
        const resultado = await db.query(
            `INSERT INTO usuario
            (
                nombre,
                apellido,
                correo,
                contrasena,
                rol
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
                id_usuario,
                nombre,
                apellido,
                correo,
                rol,
                fecha_registro`,
            [
                nombre,
                apellido,
                correo,
                hash,
                rol
            ]
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
        // 1. Obtener miembros, sus cargos y el curso en el que están
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

        // 2. Obtener las propuestas del partido
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

        // Responder con la estructura esperada por React
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
        // Verificar si el estudiante ya votó previamente
        const votoPrevio = await db.query(
            "SELECT id_voto FROM voto WHERE id_estudiante = $1",
            [id_estudiante]
        );

        if (votoPrevio.rows.length > 0) {
            return res.status(400).json({ error: "Ya has emitido tu voto anteriormente." });
        }

        // Insertar el voto en la base de datos
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

// ELIMINAR ESTUDIANTE POR ID (CON BORRADO SEGURO DE REGISTROS DEPENDIENTES)
app.delete("/api/estudiantes/:id", async (req, res) => {
    const { id } = req.params;

    // Obtener un cliente del pool para manejar la transacción
    const client = await db.getClient ? await db.getClient() : null;

    try {
        // Iniciar transacción SQL
        if (client) await client.query('BEGIN');

        const queryRunner = client || db;

        // 1. Borrar registros dependientes del usuario en tablas relacionadas
        await queryRunner.query(`DELETE FROM sesion WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM usuario_curso WHERE usuario_id = $1`, [id]);
        await queryRunner.query(`DELETE FROM resultado_quiz WHERE id_estudiante = $1`, [id]);
        await queryRunner.query(`DELETE FROM usuario_recompensa WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM racha WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM caja_ideas WHERE id_usuario = $1`, [id]);
        await queryRunner.query(`DELETE FROM miembro_partido WHERE id_estudiante = $1`, [id]);
        await queryRunner.query(`DELETE FROM voto WHERE id_estudiante = $1`, [id]);
        
        // Mensajes del Chat IA
        await queryRunner.query(`
            DELETE FROM mensaje_chat 
            WHERE conversacion_id IN (SELECT id_conversacion FROM conversacion_chat WHERE usuario = $1)
        `, [id]);
        await queryRunner.query(`DELETE FROM conversacion_chat WHERE usuario = $1`, [id]);

        // 2. Finalmente eliminar al usuario
        const resultado = await queryRunner.query(
            `DELETE FROM usuario 
             WHERE id_usuario = $1 AND rol = 'estudiante' 
             RETURNING id_usuario`,
            [id]
        );

        if (resultado.rows.length === 0) {
            if (client) await client.query('ROLLBACK');
            return res.status(404).json({
                error: "Estudiante no encontrado o no corresponde al rol de estudiante."
            });
        }

        // Confirmar transacción
        if (client) await client.query('COMMIT');

        res.json({
            mensaje: "Estudiante y todos sus registros asociados fueron eliminados con éxito",
            id_usuario: id
        });

    } catch (error) {
        if (client) await client.query('ROLLBACK');
        console.error("Error al eliminar estudiante:", error);
        res.status(500).json({
            error: "Error al intentar eliminar el estudiante de la base de datos.",
            detalle: error.message
        });
    } finally {
        if (client) client.release();
    }
});
app.listen(3000, () => {

    console.log(
        "Servidor funcionando en http://localhost:3000"
    );

});