import { fechaParaArchivo } from "./fechasc";
import { nombreCompleto } from "./personas";

// Descarga las ideas en un archivo .csv que se abre en Excel o Google Sheets,
// por ejemplo para revisarlas en una reunión del gobierno estudiantil.
export function descargarIdeas(ideas) {
  const celda = (valor) => `"${String(valor || "").replace(/"/g, '""')}"`;

  const filas = [
    ["Fecha", "Estudiante", "Curso", "Idea"],
    ...ideas.map((idea) => [
      fechaParaArchivo(idea.fecha),
      nombreCompleto(idea),
      idea.curso || "",
      idea.comentario,
    ]),
  ];

  // Punto y coma: así Excel en español separa bien las columnas.
  // El ﻿ del inicio hace que las tildes se vean bien.
  const texto = "﻿" + filas.map((fila) => fila.map(celda).join(";")).join("\r\n");
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(new Blob([texto], { type: "text/csv;charset=utf-8" }));
  enlace.download = "ideas-de-los-estudiantes.csv";
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
}
