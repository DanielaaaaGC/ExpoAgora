import React, { useEffect, useState } from 'react';
import './partidos.css';

// Componente Tarjeta Individual
export function Card({ partido, onClick }) {
  if (!partido) return null;

  const rutaImagen = partido.bandera_url
    ? (partido.bandera_url.startsWith('/') ? partido.bandera_url : `/${partido.bandera_url}`)
    : '/assets/par1.png';

  return (
    <div 
      className="card" 
      onClick={() => onClick(partido)}
      style={{ 
        backgroundImage: `url("${rutaImagen}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="contenido">
        <h2 className="titulo">{partido.nombre}</h2>
        <h4 className="sub">Partido Político</h4>
        <p className="descrip">{partido.descripcion}</p>
      </div>
    </div>
  );
}

// Componente Principal
export default function PartidosSection() {
  const [partidos, setPartidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // Estados para el Modal
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const [detallePartido, setDetallePartido] = useState({ miembros: [], propuestas: [] });
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // Cargar lista general de partidos
  useEffect(() => {
    fetch('http://localhost:3000/api/partidos')
      .then((res) => {
        if (!res.ok) throw new Error(`Servidor devolvió status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPartidos(data);
        } else {
          setErrorMsg('Formato de datos no válido.');
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al conectar con la API:', err);
        setErrorMsg(err.message);
        setCargando(false);
      });
  }, []);

  // Abrir Modal y cargar detalles (miembros y propuestas)
  const abrirModal = (partido) => {
    setPartidoSeleccionado(partido);
    setCargandoDetalle(true);

    fetch(`http://localhost:3000/api/partidos/${partido.id_partido}`)
      .then((res) => res.json())
      .then((data) => {
        setDetallePartido({
          miembros: data.miembros || [],
          propuestas: data.propuestas || []
        });
        setCargandoDetalle(false);
      })
      .catch((err) => {
        console.error('Error al obtener detalle del partido:', err);
        setCargandoDetalle(false);
      });
  };

  const cerrarModal = () => {
    setPartidoSeleccionado(null);
    setDetallePartido({ miembros: [], propuestas: [] });
  };

  return (
    <div className="seccion-partidos-container">
      <div className="titulo-principal">
        <h1>Conoce a los partidos políticos</h1>
      </div>
      
      <div className="partidos-grid">
        {cargando ? (
          <p style={{ color: '#4a386d', fontWeight: 'bold' }}>Cargando partidos...</p>
        ) : errorMsg ? (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {errorMsg}</p>
        ) : partidos.length === 0 ? (
          <p style={{ color: '#4a386d' }}>No hay partidos registrados en la base de datos.</p>
        ) : (
          partidos.map((partido) => (
            <Card 
              key={partido.id_partido} 
              partido={partido} 
              onClick={abrirModal} 
            />
          ))
        )}
      </div>

      {/* MODAL WAZAAAAAAAAAAAAA */}
      {partidoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={cerrarModal}>&times;</button>
            
            <div className="modal-header">
              <img 
                src={partidoSeleccionado.bandera_url || '/assets/par1.png'} 
                alt={`Bandera ${partidoSeleccionado.nombre}`} 
                className="modal-bandera"
              />
              <div className="modal-header-info">
                <h2>{partidoSeleccionado.nombre}</h2>
                <p>{partidoSeleccionado.descripcion}</p>
              </div>
            </div>

            <div className="modal-body">
              {cargandoDetalle ? (
                <p className="loading-text">Cargando información del partido...</p>
              ) : (
                <>
                  {/* SECCIÓN DE INTEGRANTES DE LA DIRECTIVA */}
                  <div className="modal-seccion">
                    <h3>Candidatos a la directiva-----</h3>
                    {detallePartido.miembros.length === 0 ? (
                      <p className="empty-text">No hay miembros asignados.</p>
                    ) : (
                      <div className="miembros-grid">
                        {detallePartido.miembros.map((m, index) => (
                          <div key={index} className="miembro-card">
                            <span className="cargo">{m.cargo.replace('_', ' ')}</span>
                            <span className="nombre">{m.nombre} {m.apellido}</span>
                            {m.curso_nombre && <small className="curso">{m.curso_nombre}</small>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN DE PROPUESTAS */}
                  <div className="modal-seccion">
                    <h3>Propuestas---</h3>
                    {detallePartido.propuestas.length === 0 ? (
                      <p className="empty-text">No hay propuestas registradas.</p>
                    ) : (
                      <ul className="propuestas-lista">
                        {detallePartido.propuestas.map((p, index) => (
                          <li key={index} className="propuesta-item">
                            <strong>{p.titulo}</strong>
                            <p>{p.descripcion}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}