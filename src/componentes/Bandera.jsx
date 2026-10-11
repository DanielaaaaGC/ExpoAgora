import { useState } from "react";

// Muestra la bandera de un partido usando la columna bandera_url de la base.
function Bandera({ partido, className = "" }) {
  const [fallo, setFallo] = useState(false);
  
  if (!partido) return null;
  
  const url = (partido.bandera_url || "").trim();

  if (!url || fallo) {
    return <div className={`bandera bandera--vacia ${className}`} aria-hidden="true" />;
  }

  // Compatibilidad con URLs absolutas (http/https) o rutas relativas sin usar `process`
  const src = /^https?:\/\//i.test(url)
    ? url
    : url.startsWith("/") ? url : `/${url}`;

  return (
    <img
      className={`bandera ${className}`}
      src={src}
      alt={`Bandera de ${partido.nombre || "Partido"}`}
      onError={() => setFallo(true)}
    />
  );
}

export default Bandera;