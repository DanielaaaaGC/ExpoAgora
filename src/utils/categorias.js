export const CATEGORIAS = {
  civico: { etiqueta: "Cívico / Efemérides", color: "#8D7BE8" },
  elecciones: { etiqueta: "Elecciones", color: "#E05375" },
  institucional: { etiqueta: "Actividad Institucional", color: "#2B93B0" },
  general: { etiqueta: "General", color: "#F0A202" },
};

export const ORDEN_CATEGORIAS = ["civico", "elecciones", "institucional", "general"];

export function inferirCategoria(titulo = "", descripcion = "", id_modulo) {
  const texto = `${titulo} ${descripcion}`.toLowerCase();

  if (texto.includes("voto") || texto.includes("eleccion") || texto.includes("partido") || texto.includes("campaña")) {
    return "elecciones";
  }
  if (texto.includes("independencia") || texto.includes("patria") || texto.includes("batalla") || texto.includes("anexión")) {
    return "civico";
  }
  if (id_modulo || texto.includes("feria") || texto.includes("charla") || texto.includes("taller")) {
    return "institucional";
  }
  return "general";
}