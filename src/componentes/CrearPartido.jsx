import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./NavbarProfesor.jsx"; 
import {
  LIMITES,
  formularioVacio,
  nuevaPropuesta,
  nuevoMiembro,
  validar,
  nombreCompleto,
  nombreDeCargo,
} from "../utils/partido";
import { prepararBandera } from "../utils/imagen";
import "./meterpartidos.css";

// Definición de estados para los gobiernos estudiantiles
const ESTADOS = {
  activo: "Activo",
  inscripcion: "En inscripción",
  finalizado: "Finalizado",
  revision: "En revisión"
};

const SIN_SERVIDOR = "No se pudo conectar con el servidor.";

// Se recuerda en este navegador quién registró el último partido.
const CLAVE_PROFESOR = "agora-profesor";
const leerProfesor = () => {
  try {
    return window.localStorage.getItem(CLAVE_PROFESOR) || "";
  } catch (error) {
    return "";
  }
};
const recordarProfesor = (id) => {
  try {
    window.localStorage.setItem(CLAVE_PROFESOR, id);
  } catch (error) {
    // Si el navegador no deja guardar, simplemente no se recuerda.
  }
};

// ==========================================
// 1. COMPONENTE: Bandera
// ==========================================
export function Bandera({ url, nombre, className = "" }) {
  const [fallo, setFallo] = useState(false);
  const limpia = (url || "").trim();

  useEffect(() => {
    setFallo(false);
  }, [limpia]);

  if (!limpia || fallo) {
    return <div className={`bandera bandera--vacia ${className}`} aria-hidden="true" />;
  }

  const src = /^(https?:|data:|blob:)/i.test(limpia)
    ? limpia
    : process.env.PUBLIC_URL + (limpia.startsWith("/") ? limpia : `/${limpia}`);

  return (
    <img
      className={`bandera ${className}`}
      src={src}
      alt={nombre ? `Bandera de ${nombre}` : ""}
      onError={() => setFallo(true)}
    />
  );
}

// ==========================================
// 2. COMPONENTE: Campo y Utilidad Describir
// ==========================================
export function describir(id, error, ayuda) {
  return {
    id,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error || ayuda ? `${id}-mensaje` : undefined,
  };
}

export function Campo({ id, etiqueta, contador, ayuda, error, children }) {
  return (
    <div className={`campo ${error ? "campo--error" : ""}`}>
      <div className="campo-cabecera">
        <label className="campo-etiqueta" htmlFor={id}>
          {etiqueta}
        </label>
        {contador && <span className="campo-contador">{contador}</span>}
      </div>

      {children}

      {error ? (
        <p className="campo-error" id={`${id}-mensaje`}>
          {error}
        </p>
      ) : (
        ayuda && (
          <p className="campo-ayuda" id={`${id}-mensaje`}>
            {ayuda}
          </p>
        )
      )}
    </div>
  );
}

// ==========================================
// 3. COMPONENTE: VistaPrevia
// ==========================================
export function VistaPrevia({ formulario, estudiantes }) {
  const nombre = formulario.nombre.trim();
  const descripcion = formulario.descripcion.trim();

  const integrantes = formulario.miembros
    .filter((fila) => fila.id_estudiante)
    .map((fila) => {
      const estudiante = estudiantes.find(
        (uno) => String(uno.id_usuario) === fila.id_estudiante
      );
      return { clave: fila.clave, cargo: fila.cargo, estudiante };
    })
    .filter((fila) => fila.estudiante);

  const propuestas = formulario.propuestas.filter((fila) => fila.titulo.trim());

  return (
    <aside className="previa" aria-label="Vista previa del partido">
      <p className="previa-etiqueta">Vista previa</p>

      <Bandera
        url={formulario.bandera ? formulario.bandera.datos : ""}
        className="previa-bandera"
      />

      <p className={`previa-nombre ${nombre ? "" : "previa--pendiente"}`}>
        {nombre || "Nombre del partido"}
      </p>
      <p className={`previa-descripcion ${descripcion ? "" : "previa--pendiente"}`}>
        {descripcion || "Aquí va la descripción que verán las y los estudiantes."}
      </p>

      {integrantes.length > 0 && (
        <>
          <p className="previa-subtitulo">Integrantes</p>
          <ul className="previa-lista">
            {integrantes.map((fila) => (
              <li key={fila.clave}>
                <span className="previa-cargo">{nombreDeCargo(fila.cargo)}</span>
                {nombreCompleto(fila.estudiante)}
              </li>
            ))}
          </ul>
        </>
      )}

      {propuestas.length > 0 && (
        <>
          <p className="previa-subtitulo">Propuestas</p>
          <ul className="previa-lista">
            {propuestas.map((fila) => (
              <li key={fila.clave}>{fila.titulo.trim()}</li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}

// ==========================================
// 4. COMPONENTE: SubirBandera
// ==========================================
export function SubirBandera({ bandera, error, onCambiar, onError }) {
  const entrada = useRef(null);
  const [encima, setEncima] = useState(false);
  const [preparando, setPreparando] = useState(false);

  const elegir = async (archivo) => {
    if (!archivo) return;
    setPreparando(true);
    try {
      onCambiar(await prepararBandera(archivo));
    } catch (problema) {
      onError(problema.message);
    } finally {
      setPreparando(false);
      if (entrada.current) entrada.current.value = "";
    }
  };

  const clases = ["subir"];
  if (encima) clases.push("subir--encima");
  if (error) clases.push("subir--error");

  return (
    <div>
      <div
        className={clases.join(" ")}
        onDragOver={(evento) => {
          evento.preventDefault();
          setEncima(true);
        }}
        onDragLeave={() => setEncima(false)}
        onDrop={(evento) => {
          evento.preventDefault();
          setEncima(false);
          elegir(evento.dataTransfer.files[0]);
        }}
      >
        <Bandera url={bandera ? bandera.datos : ""} className="subir-muestra" />

        <div className="subir-texto">
          <p className="subir-titulo">
            {preparando
              ? "Preparando la imagen…"
              : bandera
              ? bandera.nombreArchivo
              : "Arrastra aquí la imagen de la bandera"}
          </p>
          <p className="subir-ayuda" id="bandera-mensaje">
            PNG, JPG o WebP de hasta 5 MB. Se recorta al centro para que quede
            cuadrada, como las demás banderas.
          </p>

          <div className="subir-acciones">
            <button
              type="button"
              className="boton-secundario"
              aria-describedby="bandera-mensaje"
              onClick={() => entrada.current.click()}
            >
              {bandera ? "Cambiar imagen" : "Elegir imagen"}
            </button>
            {bandera && (
              <button type="button" className="boton-texto" onClick={() => onCambiar(null)}>
                Quitar
              </button>
            )}
          </div>
        </div>

        <input
          ref={entrada}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={(evento) => elegir(evento.target.files[0])}
        />
      </div>

      {error && (
        <p className="campo-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ==========================================
// 5. COMPONENTE: Propuestas
// ==========================================
export function Propuestas({ propuestas, errores, onCambiar, onAgregar, onQuitar }) {
  return (
    <div className="propuestas">
      {propuestas.map((fila, indice) => {
        const idTitulo = `propuesta-${fila.clave}-titulo`;
        const idDetalle = `propuesta-${fila.clave}-descripcion`;
        const errorTitulo = errores[`propuestas.${indice}.titulo`];
        const errorDetalle = errores[`propuestas.${indice}.descripcion`];

        return (
          <fieldset key={fila.clave} className="propuesta">
            <legend className="propuesta-numero">Propuesta {indice + 1}</legend>

            {propuestas.length > 1 && (
              <button
                type="button"
                className="boton-quitar propuesta-quitar"
                aria-label={`Quitar la propuesta ${indice + 1}`}
                onClick={() => onQuitar(indice)}
              >
                Quitar
              </button>
            )}

            <Campo
              id={idTitulo}
              etiqueta="Título"
              contador={`${fila.titulo.length}/${LIMITES.tituloPropuesta}`}
              error={errorTitulo}
            >
              <input
                {...describir(idTitulo, errorTitulo)}
                className="campo-control"
                type="text"
                maxLength={LIMITES.tituloPropuesta}
                placeholder="Ej.: Torneos deportivos interclases"
                value={fila.titulo}
                onChange={(evento) => onCambiar(indice, "titulo", evento.target.value)}
              />
            </Campo>

            <Campo id={idDetalle} etiqueta="Descripción" error={errorDetalle}>
              <textarea
                {...describir(idDetalle, errorDetalle)}
                className="campo-control"
                rows={2}
                maxLength={LIMITES.descripcionPropuesta}
                placeholder="Explica en una o dos frases en qué consiste."
                value={fila.descripcion}
                onChange={(evento) => onCambiar(indice, "descripcion", evento.target.value)}
              />
            </Campo>
          </fieldset>
        );
      })}

      {propuestas.length < LIMITES.propuestas && (
        <button type="button" className="boton-texto" onClick={onAgregar}>
          Agregar otra propuesta
        </button>
      )}
    </div>
  );
}

// ==========================================
// 6. COMPONENTE: PartidoCreado
// ==========================================
export function PartidoCreado({ partido, onCrearOtro }) {
  return (
    <section className="creado" aria-live="polite">
      <div className="creado-cabecera">
        <Bandera url={partido.bandera_url} nombre={partido.nombre} className="creado-bandera" />

        <div>
          <p className="creado-entrada">Partido creado</p>
          <h1 className="creado-nombre">{partido.nombre}</h1>
          <p className="creado-guardado">
            Quedó guardado en la base de datos, en {partido.gobierno}.
          </p>
          <p className="creado-descripcion">{partido.descripcion}</p>
        </div>
      </div>

      <div className="creado-detalle">
        <div>
          <h2 className="creado-subtitulo">Integrantes</h2>
          {partido.miembros.length === 0 ? (
            <p className="seccion-vacia">Se creó sin integrantes.</p>
          ) : (
            <ul className="creado-lista">
              {partido.miembros.map((miembro, indice) => (
                <li key={indice}>
                  <span className="creado-cargo">{nombreDeCargo(miembro.cargo)}</span>
                  <span className="creado-persona">{miembro.nombre}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="creado-subtitulo">Propuestas</h2>
          {partido.propuestas.length === 0 ? (
            <p className="seccion-vacia">Se creó sin propuestas.</p>
          ) : (
            <ul className="creado-lista">
              {partido.propuestas.map((propuesta, indice) => (
                <li key={indice}>
                  <span className="creado-propuesta">{propuesta.titulo}</span>
                  {propuesta.descripcion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button type="button" className="boton" onClick={onCrearOtro}>
        Crear otro partido
      </button>
    </section>
  );
}

// ==========================================
// 8. COMPONENTE: Integrantes
// ==========================================
export function Integrantes({
  miembros,
  estudiantes,
  ocupados,
  errores,
  onCambiar,
  onAgregarVocal,
  onQuitar,
}) {
  if (estudiantes.length === 0) {
    return (
      <p className="seccion-vacia">
        Todavía no hay estudiantes registrados en la base de datos. Puedes crear
        el partido sin integrantes.
      </p>
    );
  }

  const elegidos = miembros.map((fila) => fila.id_estudiante).filter(Boolean);

  return (
    <div className="integrantes">
      {miembros.map((fila, indice) => {
        const id = `miembro-${fila.clave}`;
        const error = errores[`miembros.${indice}`];

        return (
          <div key={fila.clave} className={`integrante ${error ? "campo--error" : ""}`}>
            <label className="integrante-cargo" htmlFor={id}>
              {nombreDeCargo(fila.cargo)}
            </label>

            <div className="integrante-control">
              <select
                id={id}
                className="campo-control"
                value={fila.id_estudiante}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? `${id}-mensaje` : undefined}
                onChange={(evento) => onCambiar(indice, evento.target.value)}
              >
                <option value="">Sin asignar</option>
                {estudiantes.map((estudiante) => {
                  const valor = String(estudiante.id_usuario);
                  const otroPartido = ocupados.get(estudiante.id_usuario);
                  const enOtraFila =
                    valor !== fila.id_estudiante && elegidos.includes(valor);

                  let etiqueta = `${estudiante.apellido}, ${estudiante.nombre}`;
                  if (estudiante.curso) etiqueta += ` (${estudiante.curso})`;
                  if (otroPartido) etiqueta += `, ya está en ${otroPartido}`;

                  return (
                    <option
                      key={valor}
                      value={valor}
                      disabled={Boolean(otroPartido) || enOtraFila}
                    >
                      {etiqueta}
                    </option>
                  );
                })}
              </select>

              {fila.extra && (
                <button
                  type="button"
                  className="boton-quitar"
                  aria-label="Quitar esta vocalía"
                  onClick={() => onQuitar(indice)}
                >
                  Quitar
                </button>
              )}
            </div>

            {error && (
              <p className="campo-error integrante-error" id={`${id}-mensaje`}>
                {error}
              </p>
            )}
          </div>
        );
      })}

      <button type="button" className="boton-texto" onClick={onAgregarVocal}>
        Agregar otra vocalía
      </button>
    </div>
  );
}

// ==========================================
// 9. COMPONENTE PRINCIPAL: CrearPartido
// ==========================================
export default function CrearPartido() {
  const [carga, setCarga] = useState({ estado: "cargando", datos: null, aviso: "" });
  const [formulario, setFormulario] = useState(() => formularioVacio());
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [creado, setCreado] = useState(null);
  const form = useRef(null);

  const cargar = useCallback(async () => {
    setCarga((anterior) => ({ ...anterior, estado: "cargando" }));

    try {
      const respuesta = await fetch("/api/formulario");
      const cuerpo = await respuesta.json().catch(() => null);

      if (!respuesta.ok || !cuerpo || !Array.isArray(cuerpo.gobiernos)) {
        throw new Error((cuerpo && cuerpo.error) || SIN_SERVIDOR);
      }

      setCarga({ estado: "lista", datos: cuerpo, aviso: "" });

      setFormulario((actual) => {
        const siguiente = { ...actual };
        const hay = (lista, clave, valor) =>
          lista.some((fila) => String(fila[clave]) === valor);

        if (!hay(cuerpo.gobiernos, "id_gobierno", actual.gobierno_id)) {
          siguiente.gobierno_id = cuerpo.gobiernos.length
            ? String(cuerpo.gobiernos[0].id_gobierno)
            : "";
        }

        if (!hay(cuerpo.profesores, "id_usuario", actual.creador_id)) {
          const recordado = leerProfesor();
          if (hay(cuerpo.profesores, "id_usuario", recordado)) {
            siguiente.creador_id = recordado;
          } else if (cuerpo.profesores.length === 1) {
            siguiente.creador_id = String(cuerpo.profesores[0].id_usuario);
          } else {
            siguiente.creador_id = "";
          }
        }

        return siguiente;
      });
    } catch (error) {
      setCarga((anterior) => ({
        estado: "error",
        datos: anterior.datos,
        aviso: error instanceof TypeError ? SIN_SERVIDOR : error.message,
      }));
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const datos = carga.datos;
  const gobiernos = datos ? datos.gobiernos : [];
  const profesores = datos ? datos.profesores : [];
  const estudiantes = datos ? datos.estudiantes : [];

  const ocupados = useMemo(() => {
    const mapa = new Map();
    (datos ? datos.membresias : []).forEach((fila) => {
      if (String(fila.gobierno_id) === formulario.gobierno_id) {
        mapa.set(fila.id_estudiante, fila.partido);
      }
    });
    return mapa;
  }, [datos, formulario.gobierno_id]);

  let bloqueo = "";
  if (!datos) {
    bloqueo = carga.estado === "cargando" ? "Cargando datos de la base…" : "";
  } else if (gobiernos.length === 0) {
    bloqueo =
      "No hay ningún gobierno estudiantil registrado. Agrega uno en la tabla gobierno_estudiantil para poder crear partidos.";
  } else if (profesores.length === 0) {
    bloqueo =
      "No hay usuarios registrados en la base de datos. Agrega al menos un profesor en la tabla usuario para poder crear partidos.";
  }
  const sinConexion = carga.estado === "error";
  const puedeEnviar = Boolean(datos) && !bloqueo && !sinConexion && !enviando;

  const quitarError = (clave) => {
    setErrores((actuales) => {
      if (!(clave in actuales)) return actuales;
      const copia = { ...actuales };
      delete copia[clave];
      return copia;
    });
  };

  const cambiar = (campo, valor) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
    quitarError(campo);
  };

  const cambiarMiembro = (indice, id_estudiante) => {
    setFormulario((actual) => ({
      ...actual,
      miembros: actual.miembros.map((fila, i) =>
        i === indice ? { ...fila, id_estudiante } : fila
      ),
    }));
    setErrores((actuales) =>
      Object.fromEntries(
        Object.entries(actuales).filter(([clave]) => !clave.startsWith("miembros."))
      )
    );
  };

  const agregarVocal = () => {
    setFormulario((actual) => ({
      ...actual,
      miembros: [...actual.miembros, nuevoMiembro("vocal", true)],
    }));
  };

  const quitarFila = (lista, indice) => {
    setFormulario((actual) => ({
      ...actual,
      [lista]: actual[lista].filter((fila, i) => i !== indice),
    }));
    setErrores((actuales) =>
      Object.fromEntries(
        Object.entries(actuales).filter(([clave]) => !clave.startsWith(`${lista}.`))
      )
    );
  };

  const cambiarPropuesta = (indice, campo, valor) => {
    setFormulario((actual) => ({
      ...actual,
      propuestas: actual.propuestas.map((fila, i) =>
        i === indice ? { ...fila, [campo]: valor } : fila
      ),
    }));
    quitarError(`propuestas.${indice}.${campo}`);
  };

  const agregarPropuesta = () => {
    setFormulario((actual) => ({
      ...actual,
      propuestas: [...actual.propuestas, nuevaPropuesta()],
    }));
  };

  const irAlPrimerError = () => {
    window.setTimeout(() => {
      const campo = form.current && form.current.querySelector('[aria-invalid="true"]');
      if (campo) {
        campo.focus({ preventScroll: true });
        campo.scrollIntoView({ block: "center" });
      }
    }, 0);
  };

  const enviar = async (evento) => {
    evento.preventDefault();
    if (!puedeEnviar) return;

    const encontrados = validar(formulario);
    setErrores(encontrados);
    setErrorGeneral("");

    if (Object.keys(encontrados).length > 0) {
      irAlPrimerError();
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch("/api/partidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formulario.nombre,
          descripcion: formulario.descripcion,
          gobierno_id: formulario.gobierno_id,
          creador_id: formulario.creador_id,
          bandera: formulario.bandera ? { datos: formulario.bandera.datos } : null,
          miembros: formulario.miembros.map((fila) => ({
            cargo: fila.cargo,
            id_estudiante: fila.id_estudiante,
          })),
          propuestas: formulario.propuestas.map((fila) => ({
            titulo: fila.titulo,
            descripcion: fila.descripcion,
          })),
        }),
      });
      const cuerpo = await respuesta.json().catch(() => null);

      if (cuerpo && cuerpo.campos) {
        setErrores(cuerpo.campos);
        irAlPrimerError();
        return;
      }

      if (!respuesta.ok || !cuerpo || !cuerpo.partido) {
        throw new Error((cuerpo && cuerpo.error) || SIN_SERVIDOR);
      }

      recordarProfesor(formulario.creador_id);
      setCreado(cuerpo.partido);
      setFormulario(formularioVacio(formulario));
      setErrores({});
      window.scrollTo(0, 0);
      cargar();
    } catch (error) {
      setErrorGeneral(error instanceof TypeError ? SIN_SERVIDOR : error.message);
    } finally {
      setEnviando(false);
    }
  };

  const pendientes = Object.keys(errores).length;
  let mensajeDeError = errorGeneral;
  if (pendientes === 1) mensajeDeError = "Hay 1 dato por corregir. Está marcado arriba.";
  if (pendientes > 1) {
    mensajeDeError = `Hay ${pendientes} datos por corregir. Están marcados arriba.`;
  }

  const ayudaProfesor =
    datos && datos.sinProfesores
      ? "No hay usuarios con rol de profesor en la base, por eso aparecen todos."
      : "Profesor o profesora responsable del registro.";

  return (
    <>
      <Navbar />

      <main className="partidos-pagina">
        {creado ? (
          <PartidoCreado
            partido={creado}
            onCrearOtro={() => {
              setCreado(null);
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <>
            <header className="encabezado">
              <h1 className="encabezado-titulo">Crear un partido</h1>
              <p className="encabezado-texto">
                Completa los datos del partido, sube su bandera y agrega a sus
                integrantes y propuestas.
              </p>

              {datos && !sinConexion && (
                <p className="estado-bd">
                  <span className="estado-bd-punto" aria-hidden="true" />
                  Conectado a la base de datos
                  {datos.baseDeDatos ? ` «${datos.baseDeDatos}»` : ""}
                </p>
              )}
            </header>

            {sinConexion && (
              <div className="aviso" role="status">
                <p>
                  <strong>Sin conexión con la base de datos.</strong> {carga.aviso}{" "}
                  No se puede guardar hasta que la conexión funcione.
                </p>
                <button type="button" className="aviso-boton" onClick={cargar}>
                  Reintentar
                </button>
              </div>
            )}

            {datos && bloqueo && (
              <div className="aviso" role="status">
                <p>{bloqueo}</p>
              </div>
            )}

            <div className="distribucion">
              <form ref={form} className="formulario" noValidate onSubmit={enviar}>
                <section className="seccion">
                  <h2 className="seccion-titulo">Datos del partido</h2>

                  <Campo
                    id="nombre"
                    etiqueta="Nombre del partido"
                    contador={`${formulario.nombre.length}/${LIMITES.nombre}`}
                    error={errores.nombre}
                  >
                    <input
                      {...describir("nombre", errores.nombre)}
                      className="campo-control"
                      type="text"
                      maxLength={LIMITES.nombre}
                      autoComplete="off"
                      placeholder="Ej.: Partido Juventud Unida"
                      value={formulario.nombre}
                      onChange={(evento) => cambiar("nombre", evento.target.value)}
                    />
                  </Campo>

                  <Campo
                    id="descripcion"
                    etiqueta="Descripción"
                    contador={`${formulario.descripcion.length}/${LIMITES.descripcion}`}
                    ayuda="En una o dos frases: qué defiende el partido y qué quiere lograr."
                    error={errores.descripcion}
                  >
                    <textarea
                      {...describir("descripcion", errores.descripcion, true)}
                      className="campo-control"
                      rows={3}
                      maxLength={LIMITES.descripcion}
                      value={formulario.descripcion}
                      onChange={(evento) => cambiar("descripcion", evento.target.value)}
                    />
                  </Campo>

                  <div className="campos-dos">
                    <Campo
                      id="gobierno_id"
                      etiqueta="Gobierno estudiantil"
                      ayuda="El periodo en el que va a participar."
                      error={errores.gobierno_id}
                    >
                      <select
                        {...describir("gobierno_id", errores.gobierno_id, true)}
                        className="campo-control"
                        value={formulario.gobierno_id}
                        onChange={(evento) => cambiar("gobierno_id", evento.target.value)}
                      >
                        <option value="">Elige un gobierno</option>
                        {gobiernos.map((gobierno) => (
                          <option key={gobierno.id_gobierno} value={String(gobierno.id_gobierno)}>
                            {gobierno.nombre || `Gobierno ${gobierno.id_gobierno}`}
                            {gobierno.estado ? ` (${ESTADOS[gobierno.estado] || gobierno.estado})` : ""}
                          </option>
                        ))}
                      </select>
                    </Campo>

                    <Campo
                      id="creador_id"
                      etiqueta="Registrado por"
                      ayuda={ayudaProfesor}
                      error={errores.creador_id}
                    >
                      <select
                        {...describir("creador_id", errores.creador_id, true)}
                        className="campo-control"
                        value={formulario.creador_id}
                        onChange={(evento) => cambiar("creador_id", evento.target.value)}
                      >
                        <option value="">Elige tu nombre</option>
                        {profesores.map((profesor) => (
                          <option key={profesor.id_usuario} value={String(profesor.id_usuario)}>
                            {profesor.apellido}, {profesor.nombre}
                          </option>
                        ))}
                      </select>
                    </Campo>
                  </div>
                </section>

                <section className="seccion">
                  <h2 className="seccion-titulo">Bandera</h2>
                  <SubirBandera
                    bandera={formulario.bandera}
                    error={errores.bandera}
                    onCambiar={(bandera) => cambiar("bandera", bandera)}
                    onError={(mensaje) =>
                      setErrores((actuales) => ({ ...actuales, bandera: mensaje }))
                    }
                  />
                </section>

                <section className="seccion">
                  <h2 className="seccion-titulo">Integrantes</h2>
                  <p className="seccion-texto">
                    Elige a la persona de cada cargo. Quien ya está en otro partido
                    de este gobierno no se puede elegir.
                  </p>
                  <Integrantes
                    miembros={formulario.miembros}
                    estudiantes={estudiantes}
                    ocupados={ocupados}
                    errores={errores}
                    onCambiar={cambiarMiembro}
                    onAgregarVocal={agregarVocal}
                    onQuitar={(indice) => quitarFila("miembros", indice)}
                  />
                  {errores.miembros && <p className="campo-error">{errores.miembros}</p>}
                </section>

                <section className="seccion">
                  <h2 className="seccion-titulo">Propuestas</h2>
                  <p className="seccion-texto">
                    Son las que las y los estudiantes van a leer en el quiz de
                    afinidad. Las que queden vacías no se guardan.
                  </p>
                  <Propuestas
                    propuestas={formulario.propuestas}
                    errores={errores}
                    onCambiar={cambiarPropuesta}
                    onAgregar={agregarPropuesta}
                    onQuitar={(indice) => quitarFila("propuestas", indice)}
                  />
                  {errores.propuestas && <p className="campo-error">{errores.propuestas}</p>}
                </section>

                <div className="enviar">
                  {mensajeDeError && (
                    <p className="enviar-error" role="alert">
                      {mensajeDeError}
                    </p>
                  )}
                  <button type="submit" className="boton" disabled={!puedeEnviar}>
                    {enviando ? "Creando partido…" : "Crear partido"}
                  </button>
                </div>
              </form>

              <VistaPrevia formulario={formulario} estudiantes={estudiantes} />
            </div>
          </>
        )}
      </main>
    </>
  );
}