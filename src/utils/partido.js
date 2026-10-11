// =====================================================
//  REGLAS DEL FORMULARIO
//  Los cargos, los límites de texto y la revisión de los
//  datos antes de enviarlos. El servidor revisa lo mismo.
// =====================================================

// Los valores son los del ENUM cargo_partido de la base de datos.
export const CARGOS = [
  { valor: "presidente", nombre: "Presidencia" },
  { valor: "vicepresidente", nombre: "Vicepresidencia" },
  { valor: "secretario", nombre: "Secretaría" },
  { valor: "tesorero", nombre: "Tesorería" },
  { valor: "vocal", nombre: "Vocalía" },
];

export const LIMITES = {
  nombre: 80,
  descripcion: 500,
  tituloPropuesta: 100,
  descripcionPropuesta: 500,
  propuestas: 20,
};

export function nombreDeCargo(valor) {
  const cargo = CARGOS.find((opcion) => opcion.valor === valor);
  return cargo ? cargo.nombre : valor;
}

// Cada fila necesita una clave propia para que React no las confunda.
let contador = 0;
const nuevaClave = () => `fila-${++contador}`;

export const nuevoMiembro = (cargo, extra = false) => ({
  clave: nuevaClave(),
  cargo,
  id_estudiante: "",
  extra,
});

export const nuevaPropuesta = () => ({
  clave: nuevaClave(),
  titulo: "",
  descripcion: "",
});

export function formularioVacio(anterior) {
  return {
    nombre: "",
    descripcion: "",
    // Al crear otro partido se conservan el gobierno y quien lo registra.
    gobierno_id: anterior ? anterior.gobierno_id : "",
    creador_id: anterior ? anterior.creador_id : "",
    bandera: null,
    miembros: CARGOS.map((cargo) => nuevoMiembro(cargo.valor)),
    propuestas: [nuevaPropuesta(), nuevaPropuesta()],
  };
}

export function nombreCompleto(persona) {
  return `${persona.nombre} ${persona.apellido}`.trim();
}

// Devuelve un objeto con un mensaje por cada campo que está mal.
// Si está vacío, el formulario se puede enviar.
export function validar(formulario) {
  const errores = {};

  const nombre = formulario.nombre.trim();
  if (!nombre) errores.nombre = "Escribe el nombre del partido.";
  else if (nombre.length > LIMITES.nombre) {
    errores.nombre = `El nombre puede tener hasta ${LIMITES.nombre} caracteres.`;
  }

  const descripcion = formulario.descripcion.trim();
  if (!descripcion) errores.descripcion = "Escribe una descripción del partido.";
  else if (descripcion.length > LIMITES.descripcion) {
    errores.descripcion = `La descripción puede tener hasta ${LIMITES.descripcion} caracteres.`;
  }

  if (!formulario.gobierno_id) errores.gobierno_id = "Elige el gobierno estudiantil.";
  if (!formulario.creador_id) errores.creador_id = "Elige quién registra el partido.";

  const vistos = new Set();
  formulario.miembros.forEach((fila, indice) => {
    if (!fila.id_estudiante) return;
    if (vistos.has(fila.id_estudiante)) {
      errores[`miembros.${indice}`] = "Esta persona ya tiene otro cargo en el partido.";
    }
    vistos.add(fila.id_estudiante);
  });

  formulario.propuestas.forEach((fila, indice) => {
    const titulo = fila.titulo.trim();
    const detalle = fila.descripcion.trim();
    if (!titulo && !detalle) return;

    if (!titulo) {
      errores[`propuestas.${indice}.titulo`] = "Ponle un título a esta propuesta.";
    } else if (titulo.length > LIMITES.tituloPropuesta) {
      errores[`propuestas.${indice}.titulo`] =
        `El título puede tener hasta ${LIMITES.tituloPropuesta} caracteres.`;
    }
    if (detalle.length > LIMITES.descripcionPropuesta) {
      errores[`propuestas.${indice}.descripcion`] =
        `La descripción puede tener hasta ${LIMITES.descripcionPropuesta} caracteres.`;
    }
  });

  return errores;
}
