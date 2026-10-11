// Ayudas para mostrar las fechas de las ideas.

const HORA = new Intl.DateTimeFormat("es-CR", { hour: "numeric", minute: "2-digit" });
const DIA = new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "long" });
const DIA_CON_ANIO = new Intl.DateTimeFormat("es-CR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function aFecha(valor) {
  const fecha = valor ? new Date(valor) : null;
  return fecha && !Number.isNaN(fecha.getTime()) ? fecha : null;
}

const mismoDia = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// "Hoy, 8:45 p. m.", "Ayer, 7:10 p. m.", "3 de octubre" o "3 de octubre de 2025"
export function fechaLegible(valor) {
  const fecha = aFecha(valor);
  if (!fecha) return "";

  const hoy = new Date();
  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);

  if (mismoDia(fecha, hoy)) return `Hoy, ${HORA.format(fecha)}`;
  if (mismoDia(fecha, ayer)) return `Ayer, ${HORA.format(fecha)}`;
  if (fecha.getFullYear() !== hoy.getFullYear()) return DIA_CON_ANIO.format(fecha);
  return DIA.format(fecha);
}

// "2026-10-06 20:45" (para el archivo que se descarga)
export function fechaParaArchivo(valor) {
  const fecha = aFecha(valor);
  if (!fecha) return "";
  const dos = (numero) => String(numero).padStart(2, "0");
  return (
    `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())} ` +
    `${dos(fecha.getHours())}:${dos(fecha.getMinutes())}`
  );
}

// true si la fecha es de los últimos 7 días
export function esDeEstaSemana(valor) {
  const fecha = aFecha(valor);
  return Boolean(fecha) && Date.now() - fecha.getTime() < 7 * 24 * 60 * 60 * 1000;
}
