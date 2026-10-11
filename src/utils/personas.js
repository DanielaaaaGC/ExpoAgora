// Ayudas para mostrar a las personas: nombre, iniciales, color y rol.

export const LIMITE_TEXTO = 500;

export function nombreCompleto(persona) {
  return `${persona.nombre || ""} ${persona.apellido || ""}`.trim();
}

export function iniciales(persona) {
  const letra = (texto) => (texto || "").trim().charAt(0).toUpperCase();
  return letra(persona.nombre) + letra(persona.apellido);
}

// Colores pastel de las banderas; a cada persona le toca siempre el mismo.
const COLORES = ["#c5b3ec", "#bff3e6", "#f6c1dc", "#e2b3ec", "#f9dd8f", "#b9d2f7"];

export function colorDe(persona) {
  return COLORES[(Number(persona.id_usuario) || 0) % COLORES.length];
}

export function esDocente(persona) {
  return persona.rol === "profesor" || persona.rol === "administrador";
}

// "10-1" para estudiantes con curso, "Docente" para profesores.
export function detalleDe(persona) {
  if (esDocente(persona)) return "Docente";
  return persona.curso || "";
}
