import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./calendario.css";
import logoA from "../assets/logoA.png";
import agoritaImg from "../assets/agorita.png";

import { eventosService } from "../services/eventosService";
import { fechasCivicasDelAnio } from "../data/fechasCivicas";
import { CATEGORIAS, inferirCategoria } from "../utils/categorias";
import {
  MESES, DIAS_CORTOS, claveDeDate, claveFecha, dateDeClave, formatoFechaCorta,
  formatoFechaLarga, formatoHora, hoyClave, parseTimestamp, rangoClaves,
} from "../utils/fechas";

function NavbarProfesor() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const scriptId = "animated-icons-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://animatedicons.co/scripts/embed-animated-icons.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const attrString =
    '{"variationThumbColour":"#8D7BE8","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#8D7BE8","group-2":"#000000","background":"#FFFFFF00"}}';

  const setIconAttrs = useCallback((node) => {
    if (node) {
      node.setAttribute("attributes", attrString);
    }
  }, []);

  return (
    <nav className="navbar-estudiante">
      <div className="navbar-logo">
        <img src={logoA} alt="Logo de Ágora" />
        <span>Ágora</span>
      </div>

      <button
        className={`hamburger-btn ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <Link to="/indexprofesor" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Thank%20you&style=minimalistic&token=eb0b9e1a-e71e-4b20-a7dc-7c38f678e237"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Inicio</span>
        </Link>

        <Link to="/estudiantes" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Hire&style=minimalistic&token=ca71a3a4-a898-457d-b398-fae965c6ceb9"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Estudiantes</span>
        </Link>

        <Link to="/modulos" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=checklist&style=minimalistic&token=0d874aa3-6ae4-45c8-9949-aca91ae5739d"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Módulos</span>
        </Link>

        <Link to="/calendario-profesor" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=calendar%20V3&style=minimalistic&token=4c41ae18-3a92-43bc-b097-59c6f2c21510"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Calendario</span>
        </Link>

        <Link to="/comunidad" className="nav-item" onClick={closeMenu}>
          <animated-icons
            ref={setIconAttrs}
            src="https://animatedicons.co/get-icon?name=Audience%20Reach&style=minimalistic&token=a566e2c2-ed78-4e8f-9adb-3283a20f035c"
            trigger="loop-on-hover"
            height="45"
            width="45"
          ></animated-icons>
          <span>Comunidad</span>
        </Link>
      </div>
    </nav>
  );
}

const FORM_VACIO = (fecha) => ({ id: null, titulo: "", descripcion: "", fecha, hora: "08:00", fechaFin: "" });

function normalizar(row) {
  const inicio = parseTimestamp(row.fecha_inicio);
  const fin = row.fecha_fin ? parseTimestamp(row.fecha_fin) : inicio;
  return {
    id: `db-${row.id_evento}`,
    idDb: row.id_evento,
    titulo: row.titulo,
    descripcion: row.descripcion || "",
    inicio,
    fin,
    origen: "db",
    todoElDia: false,
    categoria: inferirCategoria(row.titulo, row.descripcion || "", row.id_modulo) || "general",
  };
}

export default function CalendarioProfesor() {
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());
  const [seleccion, setSeleccion] = useState(hoyClave());
  const [eventosDb, setEventosDb] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [direccion, setDireccion] = useState(1);

  // Estados del Formulario de Creación / Edición
  const [form, setForm] = useState(null);
  const [errorForm, setErrorForm] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const filas = await eventosService.getAll();
      if (Array.isArray(filas)) {
        setEventosDb(filas.map(normalizar));
      }
      setErrorCarga("");
    } catch (e) {
      setErrorCarga(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const todos = useMemo(() => {
    const civicos = [anio - 1, anio, anio + 1].flatMap(fechasCivicasDelAnio);
    return [...civicos, ...eventosDb];
  }, [anio, eventosDb]);

  const porDia = useMemo(() => {
    const mapa = new Map();
    for (const ev of todos) {
      for (const clave of rangoClaves(ev.inicio, ev.fin)) {
        if (!mapa.has(clave)) mapa.set(clave, []);
        mapa.get(clave).push(ev);
      }
    }
    for (const lista of mapa.values()) lista.sort((a, b) => a.inicio - b.inicio);
    return mapa;
  }, [todos]);

  const celdas = useMemo(() => {
    const offset = (new Date(anio, mes, 1).getDay() + 6) % 7;
    const diasMes = new Date(anio, mes + 1, 0).getDate();
    const filas = Math.ceil((offset + diasMes) / 7);
    return Array.from({ length: filas * 7 }, (_, i) => {
      const d = new Date(anio, mes, 1 - offset + i);
      return { clave: claveDeDate(d), dia: d.getDate(), fuera: d.getMonth() !== mes };
    });
  }, [anio, mes]);

  const eventosDelDia = porDia.get(seleccion) || [];
  const fechaSel = dateDeClave(seleccion);
  const hoyK = hoyClave();

  function irA(clave) {
    const d = dateDeClave(clave);
    setAnio(d.getFullYear());
    setMes(d.getMonth());
    setSeleccion(clave);
  }

  function cambiarMes(delta) {
    setDireccion(delta);
    const d = new Date(anio, mes + delta, 1);
    setAnio(d.getFullYear());
    setMes(d.getMonth());
    const esMesActual = d.getFullYear() === hoy.getFullYear() && d.getMonth() === hoy.getMonth();
    setSeleccion(esMesActual ? hoyK : claveFecha(d.getFullYear(), d.getMonth(), 1));
  }

  // Funciones CRUD para Profesor
  function abrirNuevo() {
    setErrorForm("");
    setForm(FORM_VACIO(seleccion));
  }

  function abrirEdicion(ev) {
    setErrorForm("");
    setForm({
      id: ev.idDb,
      titulo: ev.titulo,
      descripcion: ev.descripcion,
      fecha: claveDeDate(ev.inicio),
      hora: formatoHora(ev.inicio),
      fechaFin: claveDeDate(ev.fin) !== claveDeDate(ev.inicio) ? claveDeDate(ev.fin) : "",
    });
  }

  async function guardar(e) {
    e.preventDefault();
    setErrorForm("");
    if (!form.titulo.trim()) return setErrorForm("Escribe un título para el evento.");
    if (!form.fecha) return setErrorForm("Elige una fecha.");
    if (form.fechaFin && form.fechaFin < form.fecha) return setErrorForm("La fecha final no puede ser antes de la inicial.");

    const hora = form.hora || "00:00";
    const cuerpo = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      fecha_inicio: `${form.fecha}T${hora}:00`,
      fecha_fin: `${form.fechaFin || form.fecha}T${hora}:00`,
    };

    setGuardando(true);
    try {
      const fila = form.id ? await eventosService.update(form.id, cuerpo) : await eventosService.create(cuerpo);
      const ev = normalizar(fila);
      setEventosDb((prev) => (form.id ? prev.map((x) => (x.idDb === ev.idDb ? ev : x)) : [...prev, ev]));
      setForm(null);
      irA(form.fecha);
    } catch (err) {
      setErrorForm(err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(ev) {
    if (!window.confirm(`¿Eliminar "${ev.titulo}"?`)) return;
    try {
      await eventosService.remove(ev.idDb);
      setEventosDb((prev) => prev.filter((x) => x.idDb !== ev.idDb));
    } catch (err) {
      window.alert(err.message);
    }
  }

  const horaTexto = (ev) => (ev.todoElDia ? "Todo el día" : formatoHora(ev.inicio));
  const rangoTexto = (ev) =>
    claveDeDate(ev.inicio) !== claveDeDate(ev.fin)
      ? `${formatoFechaCorta(ev.inicio)} – ${formatoFechaCorta(ev.fin)}`
      : null;

  const variantesPagina = {
    initial: (dir) => ({
      y: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.95,
      rotateX: dir > 0 ? -15 : 15,
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: (dir) => ({
      y: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.9,
      rotateX: dir > 0 ? 15 : -15,
      transition: { duration: 0.25 },
    }),
  };

  return (
    <div className="pagina-calendario-estudiante">
      <NavbarProfesor />

      <div className="calendario-vista-card calendario-real-efecto">
        {/* Anillas superiores */}
        <div className="cal-anillas">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="cal-anilla"></span>
          ))}
        </div>

        <div className="calendario-encabezado-superior">
          <h1 className="titulo-calendario-spartan">Gestión de Calendario</h1>
          <p className="subtitulo-calendario">
            Agrega y administra los eventos institucionales e itinerario de actividades del colegio
          </p>
        </div>

        <main className="cal">
          {errorCarga && (
            <div className="cal-aviso" role="alert">
              <span>No hay conexión con el servidor. Se muestran únicamente las fechas cívicas.</span>
              <button type="button" onClick={cargar}>Reintentar</button>
            </div>
          )}

          <div className="cal-layout">
            {/* COLUMNA IZQUIERDA: CALENDARIO */}
            <section className="cal-principal" aria-label="Calendario">
              <header className="cal-cabecera">
                <div>
                  <h2 className="cal-titulo">{MESES[mes]} <span>{anio}</span></h2>
                </div>
                <div className="cal-nav">
                  <button type="button" className="cal-btn-hoy" onClick={() => irA(hoyK)}>Hoy</button>
                  <button type="button" className="cal-btn-icono" onClick={() => cambiarMes(-1)} aria-label="Mes anterior">‹</button>
                  <button type="button" className="cal-btn-icono" onClick={() => cambiarMes(1)} aria-label="Mes siguiente">›</button>
                </div>
              </header>

              <div className="cal-semana">
                {DIAS_CORTOS.map((d) => <span key={d}>{d}</span>)}
              </div>

              <div className="cal-hoja-contenedor">
                <AnimatePresence mode="wait" custom={direccion}>
                  <motion.div
                    key={`${anio}-${mes}`}
                    custom={direccion}
                    variants={variantesPagina}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`cal-grid ${cargando ? "cal-grid--cargando" : ""}`}
                  >
                    {celdas.map((c, idx) => {
                      const evs = porDia.get(c.clave) || [];
                      const clases = [
                        "cal-celda",
                        c.fuera && "cal-celda--fuera",
                        c.clave === hoyK && "cal-celda--hoy",
                        c.clave === seleccion && "cal-celda--sel",
                      ].filter(Boolean).join(" ");
                      return (
                        <button
                          key={c.clave}
                          type="button"
                          className={clases}
                          onClick={() => irA(c.clave)}
                          aria-label={`${formatoFechaLarga(c.clave)}${evs.length ? `, ${evs.length} evento(s)` : ""}`}
                          aria-pressed={c.clave === seleccion}
                        >
                          <span className="cal-num">{c.dia}</span>
                          <span className="cal-chips">
                            {evs.slice(0, 2).map((ev) => {
                              const continua = claveDeDate(ev.inicio) !== c.clave && idx % 7 !== 0;
                              const colorCat = (CATEGORIAS[ev.categoria] && CATEGORIAS[ev.categoria].color) || "#8D7BE8";
                              return (
                                <span
                                  key={ev.id}
                                  className={`cal-chip ${continua ? "cal-chip--cont" : ""}`}
                                  style={{ "--c": colorCat }}
                                  title={ev.titulo}
                                >
                                  {continua ? "\u00a0" : ev.titulo}
                                </span>
                              );
                            })}
                            {evs.length > 2 && <span className="cal-mas">+{evs.length - 2} más</span>}
                          </span>
                          <span className="cal-puntos" aria-hidden="true">
                            {evs.slice(0, 3).map((ev) => {
                              const colorCat = (CATEGORIAS[ev.categoria] && CATEGORIAS[ev.categoria].color) || "#8D7BE8";
                              return <i key={ev.id} style={{ "--c": colorCat }} />;
                            })}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            {/* COLUMNA DERECHA: AGENDA, FORMULARIO Y ÁGORITA ABAJO */}
            <div className="cal-columna-derecha">
              <aside className="cal-lateral" aria-label="Agenda del día">
                <div className="cal-dia">
                  <p className="cal-dia-num">{String(fechaSel.getDate()).padStart(2, "0")}</p>
                  <p className="cal-dia-texto">
                    {formatoFechaLarga(seleccion).split(" ")[0]}
                    <span>{MESES[fechaSel.getMonth()]} {fechaSel.getFullYear()}</span>
                  </p>
                </div>

                <ul className="cal-lista">
                  {eventosDelDia.length === 0 && <li className="cal-vacio">No hay eventos este día.</li>}
                  {eventosDelDia.map((ev) => {
                    const colorCat = (CATEGORIAS[ev.categoria] && CATEGORIAS[ev.categoria].color) || "#8D7BE8";
                    const etiquetaCat = (CATEGORIAS[ev.categoria] && CATEGORIAS[ev.categoria].etiqueta) || "General";
                    return (
                      <li key={ev.id} className="cal-evento" style={{ "--c": colorCat }}>
                        <div className="cal-evento-top">
                          <p className="cal-evento-titulo">{ev.titulo}</p>
                          {ev.origen === "db" && (
                            <span className="cal-acciones">
                              <button type="button" onClick={() => abrirEdicion(ev)}>Editar</button>
                              <button type="button" onClick={() => eliminar(ev)}>Eliminar</button>
                            </span>
                          )}
                        </div>
                        <p className="cal-evento-meta">
                          {etiquetaCat} · {horaTexto(ev)}{rangoTexto(ev) ? ` · ${rangoTexto(ev)}` : ""}
                        </p>
                        {ev.descripcion && <p className="cal-evento-desc">{ev.descripcion}</p>}
                      </li>
                    );
                  })}
                </ul>

                {/* FORMULARIO DE AGREGAR / EDITAR EVENTO */}
                {form ? (
                  <form className="cal-form" onSubmit={guardar}>
                    
                    <label>
                      Título
                      <input
                        autoFocus
                        maxLength={100}
                        value={form.titulo}
                        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                        placeholder="EjM Día de debates"
                      />
                    </label>
                    <label>
                      Descripción
                      <textarea
                        rows={3}
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                        placeholder="..."
                      />
                    </label>
                    <div className="cal-form-fila">
                      <label>
                        Fecha
                        <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
                      </label>
                      <label>
                        Hora
                        <input type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} />
                      </label>
                    </div>
                    <label>
                      Hasta (opcional)
                      <input type="date" min={form.fecha} value={form.fechaFin} onChange={(e) => setForm({ ...form, fechaFin: e.target.value })} />
                    </label>
                    {errorForm && <p className="cal-error" role="alert">{errorForm}</p>}
                    <div className="cal-form-botones">
                      <button type="submit" className="cal-primario" disabled={guardando}>
                        {guardando ? "Guardando…" : "Guardar"}
                      </button>
                      <button type="button" className="cal-secundario" onClick={() => setForm(null)}>Cancelar</button>
                    </div>
                  </form>
                ) : (
                  <button type="button" className="cal-primario cal-agregar" onClick={abrirNuevo} disabled={!!errorCarga}>
                    + Agregar evento
                  </button>
                )}
              </aside>

              {/* ÁGORITA ABAJO DE LA TARJETA */}
              <div className="cal-agorita-contenedor">
                <img src={agoritaImg} alt="Ágorita Asistente Virtual" className="cal-agorita-img" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}