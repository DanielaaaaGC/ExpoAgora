import React, { useState, useEffect } from "react";
import NavbarProfesor from "./NavbarProfesor";
import "./estudiantes.css";

const API_BASE_URL = "http://localhost:3000/api";

export default function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Estado para controlar si el Modal está abierto
  const [modalAbierto, setModalAbierto] = useState(false);

  // ID del estudiante que se está editando (null si es nuevo)
  const [editandoId, setEditandoId] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    rol: "estudiante",
  });

  // Helper para validar respuestas JSON de la API
  const parseResponse = async (res) => {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }
    throw new Error(
      `Respuesta no válida del servidor (${res.status}). Asegúrate de que el backend esté ejecutándose.`
    );
  };

  // 1. CARGAR LISTA DE ESTUDIANTES
  const cargarEstudiantes = async () => {
    setCargando(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/estudiantes`);
      const data = await parseResponse(res);

      if (!res.ok) {
        throw new Error(data.error || "Error al obtener la lista de estudiantes");
      }

      setEstudiantes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar estudiantes:", err);
      setErrorMsg(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  // Manejo de inputs del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Abrir Modal para Nuevo Estudiante
  const abrirModalNuevo = () => {
    setEditandoId(null);
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      rol: "estudiante",
    });
    setModalAbierto(true);
  };

  // Abrir Modal para Editar Estudiante
  const abrirModalEditar = (estudiante) => {
    setEditandoId(estudiante.id_usuario);
    setFormData({
      nombre: estudiante.nombre || "",
      apellido: estudiante.apellido || "",
      correo: estudiante.correo || "",
      contrasena: "",
      rol: estudiante.rol || "estudiante",
    });
    setModalAbierto(true);
  };

  // Cerrar Modal y limpiar
  const cerrarModal = () => {
    setModalAbierto(false);
    setEditandoId(null);
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      contrasena: "",
      rol: "estudiante",
    });
  };

  // 2. CREAR O EDITAR (SUBMIT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const url = editandoId
        ? `${API_BASE_URL}/estudiantes/${editandoId}`
        : `${API_BASE_URL}/usuarios`;

      const method = editandoId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await parseResponse(res);

      if (!res.ok) {
        throw new Error(data.mensaje || data.error || "Error al procesar la solicitud");
      }

      cerrarModal();
      cargarEstudiantes();
    } catch (err) {
      console.error("Error al guardar:", err);
      setErrorMsg(err.message);
    }
  };

  // 3. ELIMINAR ESTUDIANTE
  const eliminarEstudiante = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este estudiante?")) {
      return;
    }

    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
        method: "DELETE",
      });

      const data = await parseResponse(res);

      if (!res.ok) {
        throw new Error(data.error || data.detalle || "Error al eliminar");
      }

      cargarEstudiantes();
    } catch (err) {
      console.error("Error al eliminar:", err);
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <NavbarProfesor />
      
      <div className="estudiantes-container">
        {/* HEADER */}
        <div className="estudiantes-header">
          <div>
            <h1>Estudiantes</h1>
            <p>Gestiona el registro y consulta de los estudiantes del sistema</p>
          </div>
          <button className="btn-agregar-estudiante" onClick={abrirModalNuevo}>
            + Agregar Estudiante
          </button>
        </div>

        {/* ALERTA DE ERROR */}
        {errorMsg && (
          <div style={{ color: "#d9534f", backgroundColor: "#fce8e8", padding: "12px", borderRadius: "12px", marginBottom: "20px" }}>
            {errorMsg}
          </div>
        )}

        {/* TABLA DE ESTUDIANTES */}
        <div className="tabla-contenedor">
          {cargando ? (
            <p style={{ padding: "20px", color: "#6c5a8d" }}>Cargando estudiantes...</p>
          ) : estudiantes.length === 0 ? (
            <p style={{ padding: "20px", color: "#6c5a8d" }}>No hay estudiantes registrados.</p>
          ) : (
            <table className="tabla-estudiantes">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Correo Electrónico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((est) => (
                  <tr key={est.id_usuario}>
                    <td>{est.id_usuario}</td>
                    <td className="estudiante-nombre">
                      {est.nombre} {est.apellido}
                    </td>
                    <td>{est.correo}</td>
                    <td className="acciones-td">
                      <button
                        className="btn-accion btn-editar"
                        onClick={() => abrirModalEditar(est)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-accion btn-eliminar"
                        onClick={() => eliminarEstudiante(est.id_usuario)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* MODAL PARA AGREGAR / EDITAR */}
        {modalAbierto && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <h2>{editandoId ? "Editar Estudiante" : "Agregar Estudiante"}</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-grupo">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ingrese el nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grupo">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Ingrese el apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grupo">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    name="correo"
                    placeholder="ejemplo@correo.com"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grupo">
                  <label>
                    {editandoId
                      ? "Contraseña (déjala en blanco si no la cambiarás)"
                      : "Contraseña"}
                  </label>
                  <input
                    type="password"
                    name="contrasena"
                    placeholder="••••••••"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required={!editandoId}
                  />
                </div>

                <div className="modal-acciones">
                  <button
                    type="button"
                    className="btn-modal-cancelar"
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-modal-guardar">
                    {editandoId ? "Guardar Cambios" : "Guardar Estudiante"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
