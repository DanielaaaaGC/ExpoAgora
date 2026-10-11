import { useState } from "react";
import { colorDe, iniciales } from "../../utils/personas";

// Círculo con la foto del avatar o, si no hay, con las iniciales.
// La foto solo se usa cuando imagen_url es una dirección completa (https://...).
function Avatar({ persona, className = "" }) {
  const [fallo, setFallo] = useState(false);
  const url = (persona.avatar || "").trim();

  if (/^(https?:|data:)/i.test(url) && !fallo) {
    return (
      <img
        className={`avatar ${className}`}
        src={url}
        alt=""
        onError={() => setFallo(true)}
      />
    );
  }

  return (
    <span
      className={`avatar ${className}`}
      style={{ backgroundColor: colorDe(persona) }}
      aria-hidden="true"
    >
      {iniciales(persona)}
    </span>
  );
}

export default Avatar;
