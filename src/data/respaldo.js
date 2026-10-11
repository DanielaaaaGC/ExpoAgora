// =====================================================
//  DATOS DE RESPALDO
//  Copia de lo que hay en las tablas partido_politico y
//  propuesta. Solo se usan si la base de datos no responde,
//  y el quiz avisa en pantalla cuando eso pasa.
// =====================================================

export const RESPALDO = {
  partidos: [
    {
      id_partido: 1,
      nombre: "Partido Juventud Unida",
      descripcion:
        "Promovemos la participación activa, el liderazgo estudiantil y la inclusión en todas las actividades académicas y recreativas.",
      bandera_url: "/par1.png",
    },
    {
      id_partido: 2,
      nombre: "Partido Innovación y Futuro",
      descripcion:
        "Impulsamos la tecnología, talleres prácticos, adecuación de espacios de estudio y el desarrollo integral.",
      bandera_url: "/par2.png",
    },
    {
      id_partido: 3,
      nombre: "Partido Fuerza Estudiantil",
      descripcion:
        "Defendemos los derechos de los estudiantes, fomentando la integración deportiva y actividades culturales.",
      bandera_url: "/par3.png",
    },
    {
      id_partido: 4,
      nombre: "Partido Acción Común",
      descripcion:
        "Enfocados en el reciclaje, la sostenibilidad ambiental y mejoras en la convivencia colegial.",
      bandera_url: "/par4.png",
    },
  ],

  propuestas: [
    {
      id_propuesta: 1,
      id_partido: 1,
      titulo: "Mejora del Menú del Comedor",
      descripcion:
        "Incorporación de opciones más nutritivas y variedad de meriendas.",
    },
    {
      id_propuesta: 2,
      id_partido: 1,
      titulo: "Torneos Deportivos Interclases",
      descripcion:
        "Organización de campeonatos relámpago de fútbol, voleibol y ajedrez.",
    },
    {
      id_propuesta: 3,
      id_partido: 2,
      titulo: "Renovación de Equipos Tecnológicos",
      descripcion:
        "Mantenimiento preventivo de computadoras y zonas con cobertura Wi-Fi para estudiantes.",
    },
    {
      id_propuesta: 4,
      id_partido: 2,
      titulo: "Feria de Innovación y Ciencias",
      descripcion:
        "Espacio para exponer proyectos tecnológicos con premiaciones académicas.",
    },
    {
      id_propuesta: 5,
      id_partido: 3,
      titulo: "Talleres del Arte y Expresión",
      descripcion:
        "Creación de clubes vespertinos de música, teatro y pintura.",
    },
    {
      id_propuesta: 6,
      id_partido: 3,
      titulo: "Buzón de Sugerencias Activo",
      descripcion:
        "Canal directo para atender las inquietudes de las y los estudiantes.",
    },
    {
      id_propuesta: 7,
      id_partido: 4,
      titulo: "Campaña de Reciclaje Colegial",
      descripcion:
        "Colocación de puntos de clasificación de residuos en cada pabellón.",
    },
    {
      id_propuesta: 8,
      id_partido: 4,
      titulo: "Zonas Verdes y Sostenibilidad",
      descripcion:
        "Jornadas de embellecimiento de áreas comunales y jardines.",
    },
  ],
};
