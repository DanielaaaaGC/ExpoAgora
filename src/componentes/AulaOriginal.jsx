import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import modulosOriginales from '../data/materialOriginal.js';
import NavbarProfesor from './NavbarProfesor.jsx';
import { NavbarEstudiante } from './indexestudiante.jsx';
import './aulaOriginal.css';

function Cuestionario({ preguntas, temaId, alCompletar }) {
  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState(null);

  const entregar = async () => {
    setGuardando(true);
    setError('');
    try {
      const token = localStorage.getItem('agora_token');
      const res = await fetch('http://localhost:3000/api/cuestionarios-educativos/entregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` },
        body: JSON.stringify({ temaId, respuestas: preguntas.map((_, i) => respuestas[i]) })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'No se pudo guardar la nota.');
      setResultado(data);
      setFinalizado(true);
      if (alCompletar) alCompletar();
    } catch (e) {
      setError(e.message || 'No se pudo guardar la nota.');
    } finally {
      setGuardando(false);
    }
  };

  if (!preguntas.length) return <p className="ag-content-body-text">Este cuestionario todavía no tiene preguntas en el material original.</p>;
  const correctas = preguntas.filter((p, i) => respuestas[i] === p.correctAnswer).length;

  return (
    <div className="ag-aula-quiz">
      {preguntas.map((p, i) => (
        <div key={i} className="ag-quiz-item">
          <h3 className="ag-quiz-question">{i + 1}. {p.question}</h3>
          
          <div className="ag-quiz-options">
            {p.options.map((op, j) => (
              <label key={j}>
                <input
                  type="radio"
                  disabled={finalizado}
                  name={`pregunta-${i}`}
                  checked={respuestas[i] === j}
                  onChange={() => setRespuestas(v => ({ ...v, [i]: j }))}
                />
                {op}
              </label>
            ))}
          </div>
        </div>
      ))}

      {finalizado ? (
        <>
          <h3>Resultado: {resultado?.aciertos ?? correctas} de {preguntas.length} ({resultado?.porcentaje ?? Math.round((correctas / preguntas.length) * 100)}%)</h3>
          <p>Tu calificación se guardó en Notas.</p>
          <button onClick={() => { setFinalizado(false); setRespuestas({}); setResultado(null); setError(''); }}>
            Intentar otra vez
          </button>
        </>
      ) : (
        <>
          <button
            disabled={guardando || Object.keys(respuestas).length !== preguntas.length}
            onClick={entregar}
          >
            {guardando ? "Guardando nota…" : "Comprobar respuestas y guardar nota"}
          </button>
          {error && <p role="alert">{error}</p>}
        </>
      )}
    </div>
  );
}

export default function AulaOriginal() {
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem('usuario') || 'null');
    } catch {
      return null;
    }
  })();

  const [indiceModulo, setIndiceModulo] = useState(0);
  const [indiceTema, setIndiceTema] = useState(0);
  const [girada, setGirada] = useState({});
  const [completados, setCompletados] = useState({});

  // Obtenemos dinámicamente el módulo y tema actual
  const moduloActual = modulosOriginales[indiceModulo] || modulosOriginales[0];
  const temaActual = moduloActual.topics[indiceTema] || moduloActual.topics[0];

  const totalTemas = modulosOriginales.reduce((acc, m) => acc + m.topics.length, 0);
  const temasCompletadosCount = Object.keys(completados).length;
  const porcentajeProgreso = Math.round((temasCompletadosCount / totalTemas) * 100);

  // Cambia el módulo e inmediatamente reinicia al primer tema (0)
  const cambiarModulo = (indexModulo) => {
    setIndiceModulo(indexModulo);
    setIndiceTema(0);
    setGirada({});
  };

  // Cambia el tema específico dentro del módulo actual
  const cambiarTema = (indexTema) => {
    setIndiceTema(indexTema);
    setGirada({});
  };

  const marcarActualCompletado = () => {
    const temaClave = `${moduloActual.id}-${temaActual.id}`;
    setCompletados(prev => ({ ...prev, [temaClave]: true }));
  };

  const irSiguiente = () => {
    marcarActualCompletado();
    if (indiceTema < moduloActual.topics.length - 1) {
      cambiarTema(indiceTema + 1);
    } else if (indiceModulo < modulosOriginales.length - 1) {
      cambiarModulo(indiceModulo + 1);
    }
  };

  const irAnterior = () => {
    if (indiceTema > 0) {
      cambiarTema(indiceTema - 1);
    } else if (indiceModulo > 0) {
      const nuevoModuloIdx = indiceModulo - 1;
      const ultimoTemaIdx = modulosOriginales[nuevoModuloIdx].topics.length - 1;
      setIndiceModulo(nuevoModuloIdx);
      setIndiceTema(ultimoTemaIdx);
      setGirada({});
    }
  };

  return (
    <>
      {usuario?.rol === 'profesor' ? <NavbarProfesor /> : <NavbarEstudiante />}
      
      <div className="ag-aula-wrapper">
        <main className="ag-modules ag-aula">
          
          <Link className="ag-back" to="/modulos">← Volver a las tarjetas de módulos</Link>

          {/* Muestra dinámicamente el título y descripción del módulo que selecciones */}
          <div className="ag-aula-header-title">
            <h1>{moduloActual.title}</h1>
            <p>{moduloActual.description}</p>
          </div>

          <div className="ag-aula-progress-bar" title={`Progreso total: ${porcentajeProgreso}%`}>
            <div className="ag-aula-progress-fill" style={{ width: `${porcentajeProgreso}%` }} />
          </div>

          <div className="ag-aula-layout">
            <aside>
              {modulosOriginales.map((m, i) => {
                const moduloCompleto = m.topics.every(t => completados[`${m.id}-${t.id}`]);
                const esModuloActivo = i === indiceModulo;

                return (
                  <div key={m.id}>
                    {/* Botón principal del Módulo */}
                    <button
                      className={`${esModuloActivo ? 'activo' : ''} ${moduloCompleto ? 'completado' : ''}`}
                      onClick={() => cambiarModulo(i)}
                    >
                      {m.title}
                    </button>

                    {/* Despliega los temas únicamente del módulo activo */}
                    {esModuloActivo &&
                      m.topics.map((t, j) => {
                        const temaCompleto = completados[`${m.id}-${t.id}`];
                        const esTemaActivo = j === indiceTema;

                        return (
                          <button
                            key={t.id}
                            className={`${esTemaActivo ? 'activo tema' : 'tema'} ${temaCompleto ? 'completado' : ''}`}
                            onClick={() => cambiarTema(j)}
                          >
                            {t.title}
                          </button>
                        );
                      })}
                  </div>
                );
              })}
            </aside>

            <section className="ag-aula-content">
              <div>
                <span className="ag-eyebrow">{moduloActual.title}</span>
                <h2>{temaActual.title}</h2>

                {temaActual.type === 'quiz' ? (
                  <Cuestionario key={temaActual.id} temaId={temaActual.id} preguntas={temaActual.questions || []} alCompletar={marcarActualCompletado} />
                ) : (
                  <>
                    <p>{temaActual.content}</p>
                    {Array.isArray(temaActual.cards) && temaActual.cards.length > 0 && (
                      <div className="ag-aula-cards">
                        {temaActual.cards.map((c, j) => (
                          <div 
                            key={c.id || j} 
                            className={`ag-flip-card ${girada[j] ? 'is-flipped' : ''}`}
                            onClick={() => setGirada(g => ({ ...g, [j]: !g[j] }))}
                          >
                            <div className="ag-flip-card-inner">
                              <div className="ag-card-front">
                                <div>
                                  <strong>{c.title}</strong>
                                  <p>{c.frontText}</p>
                                </div>
                                <small>Haz clic para girar</small>
                              </div>
                              <div className="ag-card-back">
                                <div>
                                  <strong>{c.title}</strong>
                                  <p>{c.backText}</p>
                                </div>
                                <small>Haz clic para volver</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="ag-aula-next">
                <button disabled={indiceTema === 0 && indiceModulo === 0} onClick={irAnterior}>
                  Anterior
                </button>

                <button
                  disabled={indiceModulo === modulosOriginales.length - 1 && indiceTema === moduloActual.topics.length - 1}
                  onClick={irSiguiente}
                >
                  Siguiente
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}