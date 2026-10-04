import React, { useState, useEffect, useRef } from 'react';
import './votacion.css';
import agoritaImg from '../assets/agorita.png';

export default function VotacionSection() {
  // Estados de flujo: 'inicio' | 'seleccion' | 'confirmacion' | 'completado'
  const [paso, setPaso] = useState('inicio');
  const [partidos, setPartidos] = useState([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Referencia para desplazar el carrusel
  const carruselRef = useRef(null);

  // ID de estudiante activo
  const idEstudiante = 16; 

  useEffect(() => {
    // 1. Obtener nombre del estudiante
    fetch(`http://localhost:3000/api/estudiantes/${idEstudiante}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.nombre) {
          setNombreEstudiante(data.nombre);
        }
      })
      .catch((err) => console.error('Error al cargar estudiante:', err));

    // 2. Obtener lista de partidos
    fetch('http://localhost:3000/api/partidos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar partidos');
        return res.json();
      })
      .then((data) => setPartidos(data))
      .catch((err) => console.error(err));
  }, [idEstudiante]);

  // Funciones de navegación del carrusel
  const desplazarIzquierda = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const desplazarDerecha = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const iniciarVotacion = () => setPaso('seleccion');

  const seleccionarPartido = (partido) => {
    setPartidoSeleccionado(partido);
    setPaso('confirmacion');
  };

  const volverAtras = () => {
    setPartidoSeleccionado(null);
    setPaso('seleccion');
  };

  const confirmarVoto = () => {
    setCargando(true);

    fetch('http://localhost:3000/api/votar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_estudiante: idEstudiante,
        id_partido: partidoSeleccionado.id_partido
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setCargando(false);
        if (data.error) {
          setErrorMsg(data.error);
        } else {
          setPaso('completado');
        }
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
        setPaso('completado'); 
      });
  };

  return (
    <div className="votacion-container">
      <h1 className="titulo-votacion">
        {nombreEstudiante ? `¡${nombreEstudiante}, ven a votar!` : '¡Ven a votar!'}
      </h1>

      {/* ESTADO 1: CUADRO CON BOTÓN INICIAL */}
      {paso === 'inicio' && (
        <div className="cuadro-inicio">
          <p>!Ven y vota¡ Tu voto es secreto y tu participación importante</p>
          <button className="btn-vota" onClick={iniciarVotacion}>
            Vota
          </button>
        </div>
      )}

      {/* ESTADO 2: SELECCIÓN EN CARRUSEL */}
      {paso === 'seleccion' && (
        <div className="contenedor-carrusel-padre">
          <button className="flecha-carrusel izquierda" onClick={desplazarIzquierda}>
            &#10094;
          </button>

          <div className="carrusel-track" ref={carruselRef}>
            {partidos.map((partido) => {
              const rutaImagen = partido.bandera_url
                ? (partido.bandera_url.startsWith('/') ? partido.bandera_url : `/${partido.bandera_url}`)
                : '/assets/par1.png';

              return (
                <div 
                  key={partido.id_partido} 
                  className="tarjeta-carrusel"
                  onClick={() => seleccionarPartido(partido)}
                >
                  <div className="bandera-wrapper">
                    <img src={rutaImagen} alt={partido.nombre} className="bandera-carrusel" />
                  </div>
                  <h3>{partido.nombre}</h3>
                  <button className="btn-seleccionar">Votar por este</button>
                </div>
              );
            })}
          </div>

          <button className="flecha-carrusel derecha" onClick={desplazarDerecha}>
            &#10095;
          </button>
        </div>
      )}

      {/* ESTADO 3: CONFIRMACIÓN */}
      {paso === 'confirmacion' && partidoSeleccionado && (
        <div className="cuadro-confirmacion">
          <h2>¿Segur@ que este partido?</h2>
          
          <div className="detalle-confirmacion">
            <img 
              src={partidoSeleccionado.bandera_url || '/assets/par1.png'} 
              alt={partidoSeleccionado.nombre} 
              className="bandera-confirmacion" 
            />
            <h3>{partidoSeleccionado.nombre}</h3>
          </div>

          {errorMsg && <p className="error-texto">{errorMsg}</p>}

          <div className="acciones-confirmacion">
            <button className="btn-volver" onClick={volverAtras} disabled={cargando}>
              Volver atrás
            </button>
            <button className="btn-confirmar" onClick={confirmarVoto} disabled={cargando}>
              {cargando ? 'Registrando...' : 'Sí, confirmar'}
            </button>
          </div>
        </div>
      )}
{/* ESTADO 4: AGRADECIMIENTO */}
      {paso === 'completado' && (
        <div className="cuadro-agradecimiento">
          {/* 2. USAR LA VARIABLE IMPORTADA EN EL SRC */}
          <img src={agoritaImg} alt="Agorita" className="agorita-img" />
          <h2>¡Todo listo, gracias por votar!</h2>
          <p>Tu voto ha sido registrado exitosamente.</p>
        </div>
      )}
    </div>
  );
}