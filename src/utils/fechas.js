export const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const DIAS_CORTOS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function claveDeDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function claveFecha(year, monthIndex, day) {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function dateDeClave(clave) {
  const [y, m, d] = clave.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function hoyClave() {
  return claveDeDate(new Date());
}

export function parseTimestamp(ts) {
  return new Date(ts);
}

export function formatoHora(date) {
  const d = new Date(date);
  const hrs = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${hrs}:${mins}`;
}

export function formatoFechaCorta(date) {
  const d = new Date(date);
  return `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}`;
}

export function formatoFechaLarga(clave) {
  const d = dateDeClave(clave);
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return `${diasSemana[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

export function rangoClaves(inicio, fin) {
  const claves = [];
  let actual = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
  const limite = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());

  while (actual <= limite) {
    claves.push(claveDeDate(actual));
    actual.setDate(actual.getDate() + 1);
  }
  return claves;
}