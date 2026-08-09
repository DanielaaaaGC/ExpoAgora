/**
 * Ícones a color, estilo "Flaticon" (paquetes flat/color).
 *
 * IMPORTANTE: por licencia, no podemos descargar ni incluir archivos
 * reales de Flaticon.com dentro del código. Estos son íconos SVG propios
 * dibujados a mano imitando ese estilo (plano, multicolor, esquinas
 * redondeadas) para que la interfaz se vea terminada YA.
 *
 * Para usar tus íconos reales de Flaticon:
 *   1. Descarga el SVG/PNG del ícono en flaticon.com (respetando su licencia
 *      y atribución si aplica).
 *   2. Colócalo en /src/assets/icons/nombre.svg
 *   3. Reemplaza el <svg>...</svg> de aquí por:
 *        import nombreIcon from "../../assets/icons/nombre.svg";
 *        export const Nombre = ({ className }) => <img src={nombreIcon} className={className} alt="" />;
 *   El resto de la app (Sidebar, StatCard, etc.) sigue funcionando igual,
 *   porque todos importan estos componentes por nombre desde este archivo.
 */

const base = (props) => ({
  width: props.size ?? 22,
  height: props.size ?? 22,
  viewBox: "0 0 48 48",
  className: props.className,
});

export const IconInicio = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M6 22 24 7l18 15" stroke="#D66A8D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 20v18a2 2 0 0 0 2 2h6V29a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11h6a2 2 0 0 0 2-2V20" fill="#FBE3BC" stroke="#F4B942" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconEstudiantes = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="17" cy="16" r="7" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" />
    <circle cx="32" cy="18" r="6" fill="#B7E6CC" stroke="#6FC79A" strokeWidth="2" />
    <path d="M6 41c0-6.6 4.9-11 11-11s11 4.4 11 11" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" strokeLinecap="round" />
    <path d="M23 41c0-5.4 3.8-9 9-9s9 3.6 9 9" fill="#B7E6CC" stroke="#6FC79A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconModulo = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 10a3 3 0 0 1 3-3h11v32H11a3 3 0 0 1-3-3z" fill="#C9A2D6" stroke="#7C4F6D" strokeWidth="2" strokeLinejoin="round" />
    <path d="M40 10a3 3 0 0 0-3-3H26v32h11a3 3 0 0 0 3-3z" fill="#F7C873" stroke="#D9971F" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 7v32" stroke="#7C4F6D" strokeWidth="2" />
  </svg>
);

export const IconQuiz = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="6" width="32" height="36" rx="4" fill="#FFFFFF" stroke="#C97C93" strokeWidth="2" />
    <rect x="16" y="3" width="16" height="8" rx="2" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" />
    <path d="M16 22h16M16 29h10" stroke="#B4B1AC" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M15 15l2.5 2.5L23 12" stroke="#6FC79A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconRecursos = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="6" y="12" width="36" height="26" rx="3" fill="#FBE3BC" stroke="#F4B942" strokeWidth="2" />
    <path d="M6 15a3 3 0 0 1 3-3h9l4 5H39a3 3 0 0 1 3 3v2H6z" fill="#F7C873" stroke="#D9971F" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconVotaciones = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="9" y="16" width="30" height="24" rx="3" fill="#B7E6CC" stroke="#6FC79A" strokeWidth="2" />
    <path d="M9 22h30" stroke="#6FC79A" strokeWidth="2" />
    <path d="M18 8h12l4 8H14z" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" strokeLinejoin="round" />
    <path d="M18 29l4 4 8-8" stroke="#D66A8D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPartidos = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M12 5v38" stroke="#8A8783" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 7h22l-6 8 6 8H12z" fill="#D66A8D" stroke="#A85A72" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const IconCalendario = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="6" y="9" width="36" height="33" rx="4" fill="#FFFFFF" stroke="#C9A2D6" strokeWidth="2" />
    <rect x="6" y="9" width="36" height="10" rx="4" fill="#C9A2D6" />
    <path d="M15 5v9M33 5v9" stroke="#7C4F6D" strokeWidth="3" strokeLinecap="round" />
    <rect x="13" y="24" width="6" height="6" rx="1.5" fill="#F3D9E1" />
    <rect x="21" y="24" width="6" height="6" rx="1.5" fill="#B7E6CC" />
    <rect x="29" y="24" width="6" height="6" rx="1.5" fill="#FBE3BC" />
    <rect x="13" y="32" width="6" height="6" rx="1.5" fill="#B7E6CC" />
    <rect x="21" y="32" width="6" height="6" rx="1.5" fill="#F3D9E1" />
  </svg>
);

export const IconIdeas = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 6c-7.2 0-12 5.4-12 12 0 5 2.6 7.8 4.8 10.2 1.3 1.4 1.7 2.4 1.7 3.8h11c0-1.4.4-2.4 1.7-3.8 2.2-2.4 4.8-5.2 4.8-10.2C36 11.4 31.2 6 24 6z" fill="#FBE3BC" stroke="#F4B942" strokeWidth="2" strokeLinejoin="round" />
    <path d="M18.5 36h11M20 40h8" stroke="#8A8783" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 12v10M20 18l4 4 4-4" stroke="#D9971F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconReportes = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="7" y="7" width="34" height="34" rx="4" fill="#FFFFFF" stroke="#6FC79A" strokeWidth="2" />
    <rect x="13" y="26" width="5" height="9" rx="1" fill="#F3D9E1" />
    <rect x="21" y="20" width="5" height="15" rx="1" fill="#F7C873" />
    <rect x="29" y="14" width="5" height="21" rx="1" fill="#6FC79A" />
  </svg>
);

export const IconHistorial = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="24" cy="24" r="17" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" />
    <path d="M24 14v10l7 5" stroke="#A85A72" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPerfil = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="24" cy="24" r="18" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" />
    <circle cx="24" cy="19" r="6" fill="#C97C93" />
    <path d="M12 37c1.6-5.6 6.4-9 12-9s10.4 3.4 12 9" fill="#C97C93" />
  </svg>
);

export const IconBusqueda = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="21" cy="21" r="12" fill="#F5F4F2" stroke="#B4B1AC" strokeWidth="2.5" />
    <path d="M30 30l9 9" stroke="#B4B1AC" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const IconCampana = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 6c-6 0-9 4.6-9 11v6l-4 7h26l-4-7v-6c0-6.4-3-11-9-11z" fill="#FBE3BC" stroke="#F4B942" strokeWidth="2" strokeLinejoin="round" />
    <path d="M19 34a5 5 0 0 0 10 0" fill="#F4B942" />
  </svg>
);

export const IconMegafono = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M6 20v8l10 3V17z" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 15 38 8v32L16 33z" fill="#D66A8D" stroke="#A85A72" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 31l3 8h5l-2.5-7.5" fill="#B4B1AC" stroke="#8A8783" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const IconCasa = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 22 24 9l16 13v15a2 2 0 0 1-2 2h-8V29h-12v10h-8a2 2 0 0 1-2-2z" fill="#F7C873" stroke="#D9971F" strokeWidth="2" strokeLinejoin="round" />
    <path d="M18 4h4v6h-4z" fill="#D66A8D" />
  </svg>
);

export const IconMas = (p) => (
  <svg {...base(p)} fill="none">
    <circle cx="24" cy="24" r="18" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" />
    <path d="M24 15v18M15 24h18" stroke="#A85A72" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const IconEditar = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M30 8l10 10-22 22H8V30z" fill="#FBE3BC" stroke="#F4B942" strokeWidth="2" strokeLinejoin="round" />
    <path d="M26 12l10 10" stroke="#D9971F" strokeWidth="2" />
  </svg>
);

export const IconCamara = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="6" y="14" width="36" height="26" rx="4" fill="#C9A2D6" stroke="#7C4F6D" strokeWidth="2" />
    <path d="M17 14l3-6h8l3 6" fill="#C9A2D6" stroke="#7C4F6D" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="24" cy="27" r="8" fill="#F5F4F2" stroke="#7C4F6D" strokeWidth="2" />
  </svg>
);

export const IconSalir = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M20 8h-8a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h8" stroke="#D66A8D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 16l9 8-9 8M17 24h21" stroke="#D66A8D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFlechaDerecha = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M11 24h24M25 14l10 10-10 10" stroke="#8A8783" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCerrar = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M12 12l24 24M36 12 12 36" stroke="#8A8783" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const IconRegalo = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="20" width="32" height="20" rx="2" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" />
    <rect x="8" y="14" width="32" height="8" rx="2" fill="#D66A8D" stroke="#A85A72" strokeWidth="2" />
    <path d="M24 14v26" stroke="#A85A72" strokeWidth="2" />
    <path d="M24 14c0-5-8-8-8-2 0 3 4 2 8 2zM24 14c0-5 8-8 8-2 0 3-4 2-8 2z" fill="#F7C873" stroke="#D9971F" strokeWidth="1.5" />
  </svg>
);

export const IconBanco = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M6 20 24 8l18 12" fill="#F3D9E1" stroke="#C97C93" strokeWidth="2" strokeLinejoin="round" />
    <rect x="9" y="20" width="4" height="16" fill="#C97C93" />
    <rect x="17" y="20" width="4" height="16" fill="#C97C93" />
    <rect x="27" y="20" width="4" height="16" fill="#C97C93" />
    <rect x="35" y="20" width="4" height="16" fill="#C97C93" />
    <rect x="6" y="36" width="36" height="4" rx="1" fill="#A85A72" />
    <rect x="6" y="17" width="36" height="4" rx="1" fill="#A85A72" />
  </svg>
);

export const IconBalanza = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 6v34M14 40h20" stroke="#4E8A67" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 10 10 16l7 12a8 8 0 0 0 14 0l7-12z" fill="#B7E6CC" stroke="#4E8A67" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="24" cy="9" r="3" fill="#4E8A67" />
  </svg>
);

export const IconGobierno = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M8 18 24 7l16 11" fill="#A9E0D3" stroke="#2E7C63" strokeWidth="2" strokeLinejoin="round" />
    <rect x="8" y="18" width="32" height="20" rx="2" fill="#A9E0D3" stroke="#2E7C63" strokeWidth="2" />
    <rect x="13" y="23" width="4" height="11" fill="#2E7C63" />
    <rect x="22" y="23" width="4" height="11" fill="#2E7C63" />
    <rect x="31" y="23" width="4" height="11" fill="#2E7C63" />
  </svg>
);

export const IconLista = (p) => (
  <svg {...base(p)} fill="none">
    <rect x="8" y="7" width="32" height="34" rx="4" fill="#BFD9F2" stroke="#3E6FA6" strokeWidth="2" />
    <path d="M15 16h4M15 24h4M15 32h4" stroke="#3E6FA6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M23 16h10M23 24h10M23 32h10" stroke="#3E6FA6" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconMapa = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 5c-7.7 0-13 5.8-13 13 0 9.7 13 25 13 25s13-15.3 13-25c0-7.2-5.3-13-13-13z" fill="#FBE3BC" stroke="#D9971F" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="24" cy="18" r="6" fill="#FFFFFF" stroke="#D9971F" strokeWidth="2" />
  </svg>
);

export const IconEscudo = (p) => (
  <svg {...base(p)} fill="none">
    <path d="M24 5 8 11v11c0 11 8 17.5 16 21 8-3.5 16-10 16-21V11z" fill="#FFD9A8" stroke="#C97A1F" strokeWidth="2" strokeLinejoin="round" />
    <path d="M17 24l5 5 9-10" stroke="#C97A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
