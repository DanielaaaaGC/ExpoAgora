/**
 * Íconos simplificados para Ágora.
 * Estilo plano, limpio y uniforme con la paleta de colores de la aplicación.
 */

const base = (props) => ({
  width: props.size ?? 22,
  height: props.size ?? 22,
  viewBox: "0 0 48 48",
  className: props.className,
});

export const IconInicio = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 22L24 8L40 22" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 20V38A2 2 0 0 0 14 40H34A2 2 0 0 0 36 38V20" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M20 40V28A2 2 0 0 1 22 26H26A2 2 0 0 1 28 28V40" fill="#7055A6" />
  </svg>
);

export const IconEstudiantes = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="18" cy="16" r="7" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <circle cx="32" cy="18" r="5" fill="#D7A9E3" stroke="#403B68" strokeWidth="2" />
    <path d="M7 40C7 33.4 11.9 29 18 29S29 33.4 29 40" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M23 40C23 35 27 31 32 31S41 35 41 40" fill="#D7A9E3" stroke="#403B68" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconModulo = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 10A3 3 0 0 1 11 7H24V41H11A3 3 0 0 1 8 38Z" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M40 10A3 3 0 0 0 37 7H24V41H37A3 3 0 0 0 40 38Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

export const IconQuiz = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="9" y="7" width="30" height="36" rx="4" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M17 22H31M17 29H25" stroke="#403B68" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 15L20 19L29 11" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconRecursos = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="6" y="14" width="36" height="26" rx="3" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M6 16A3 3 0 0 1 9 13H18L22 18H39A3 3 0 0 1 42 21V25H6Z" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconVotaciones = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="18" width="32" height="22" rx="3" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M8 24H40" stroke="#7055A6" strokeWidth="2" />
    <path d="M18 8H30L34 18H14Z" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2" strokeLinejoin="round" />
    <path d="M19 31L23 35L30 26" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPartidos = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M12 6V42" stroke="#403B68" strokeWidth="3" strokeLinecap="round" />
    <path d="M12 8H34L27 16L34 24H12Z" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

export const IconCalendario = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="6" y="10" width="36" height="32" rx="4" fill="#FFFFFF" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M6 14C6 11.8 7.8 10 10 10H38C40.2 10 42 11.8 42 14V18H6V14Z" fill="#7055A6" />
    <path d="M15 6V12M33 6V12" stroke="#403B68" strokeWidth="3" strokeLinecap="round" />
    <circle cx="15" cy="26" r="2" fill="#D7A9E3" />
    <circle cx="24" cy="26" r="2" fill="#7055A6" />
    <circle cx="33" cy="26" r="2" fill="#D7A9E3" />
    <circle cx="15" cy="34" r="2" fill="#7055A6" />
    <circle cx="24" cy="34" r="2" fill="#D7A9E3" />
  </svg>
);

export const IconIdeas = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 7C17 7 12 12 12 18C12 23 15 26 17 28C18 29 18.5 30.5 18.5 32H29.5C29.5 30.5 30 29 31 28C33 26 36 23 36 18C36 12 31 7 24 7Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M19 37H29M21 41H27" stroke="#403B68" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconReportes = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="8" width="32" height="32" rx="4" fill="#FFFFFF" stroke="#7055A6" strokeWidth="2.5" />
    <rect x="14" y="24" width="5" height="10" rx="1" fill="#D7A9E3" />
    <rect x="21" y="18" width="5" height="16" rx="1" fill="#7055A6" />
    <rect x="28" y="12" width="5" height="22" rx="1" fill="#403B68" />
  </svg>
);

export const IconHistorial = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="24" cy="24" r="17" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M24 14V24L31 28" stroke="#403B68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPerfil = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="24" cy="24" r="18" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <circle cx="24" cy="18" r="6" fill="#7055A6" />
    <path d="M12 37C13.5 31.5 18 28 24 28S34.5 31.5 36 37" fill="#7055A6" />
  </svg>
);

export const IconBusqueda = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="21" cy="21" r="12" stroke="#7055A6" strokeWidth="3" fill="#EBEAF7" />
    <path d="M30 30L39 39" stroke="#7055A6" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const IconCampana = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 7C18 7 15 11.5 15 18V24L11 31H37L33 24V18C33 11.5 30 7 24 7Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M20 35C20 37 21.8 38 24 38C26.2 38 28 37 28 35" stroke="#403B68" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconMegafono = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M6 20V28L15 31V17Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2" strokeLinejoin="round" />
    <path d="M15 15L38 8V32L15 25Z" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M12 31L14 39H19L17 31" fill="#403B68" />
  </svg>
);

export const IconCasa = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 22L24 9L40 22V37A2 2 0 0 1 38 39H28V29H20V39H10A2 2 0 0 1 8 37Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

export const IconMas = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="24" cy="24" r="18" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M24 15V33M15 24H33" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const IconEditar = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M30 8L40 18L18 40H8V30Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M24 14L34 24" stroke="#7055A6" strokeWidth="2.5" />
  </svg>
);

export const IconCamara = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="6" y="14" width="36" height="26" rx="4" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M17 14L20 8H28L31 14" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="24" cy="27" r="7" fill="#FFFFFF" stroke="#7055A6" strokeWidth="2.5" />
  </svg>
);

export const IconSalir = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M20 8H12A3 3 0 0 0 9 11V37A3 3 0 0 0 12 40H20" stroke="#403B68" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 16L37 24L29 32M16 24H35" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFlechaDerecha = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M10 24H38M28 14L38 24L28 34" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCerrar = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M12 12L36 36M36 12L12 36" stroke="#403B68" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const IconRegalo = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="20" width="32" height="20" rx="2" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <rect x="6" y="14" width="36" height="8" rx="2" fill="#D7A9E3" stroke="#7055A6" strokeWidth="2" />
    <path d="M24 14V40" stroke="#7055A6" strokeWidth="2.5" />
  </svg>
);

export const IconBanco = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M6 20L24 8L42 20" stroke="#7055A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="22" width="4" height="14" fill="#7055A6" />
    <rect x="18" y="22" width="4" height="14" fill="#7055A6" />
    <rect x="26" y="22" width="4" height="14" fill="#7055A6" />
    <rect x="34" y="22" width="4" height="14" fill="#7055A6" />
    <rect x="6" y="36" width="36" height="4" rx="1" fill="#403B68" />
  </svg>
);

export const IconBalanza = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 6V40M14 40H34" stroke="#403B68" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 10L10 16L17 28A8 8 0 0 0 31 28L38 16Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconGobierno = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 18L24 7L40 18" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="8" y="18" width="32" height="20" rx="2" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <rect x="14" y="23" width="4" height="11" fill="#7055A6" />
    <rect x="22" y="23" width="4" height="11" fill="#7055A6" />
    <rect x="30" y="23" width="4" height="11" fill="#7055A6" />
  </svg>
);

export const IconLista = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="7" width="32" height="34" rx="4" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" />
    <path d="M14 16H18M14 24H18M14 32H18" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" />
    <path d="M22 16H34M22 24H34M22 32H34" stroke="#403B68" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconMapa = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 6C16.3 6 11 11.8 11 19C11 28.7 24 42 24 42C24 42 37 28.7 37 19C37 11.8 31.7 6 24 6Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="24" cy="18" r="5" fill="#7055A6" />
  </svg>
);

export const IconEscudo = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 5L8 11V22C8 33 16 39.5 24 43C32 39.5 40 33 40 22V11Z" fill="#EBEAF7" stroke="#7055A6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M17 23L22 28L31 17" stroke="#7055A6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);