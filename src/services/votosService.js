import { apiClient, withFallback } from "../lib/apiClient";
import { mockVotos } from "../mocks/mockData";

/**
 * CRUD sobre `voto`.
 *   GET  /votos?partido_id=...        (conteo/listado)
 *   POST /votos                        { id_estudiante, id_partido }
 *
 * Nota: el TSE real permite un solo voto por persona y elección. Aquí
 * dejamos esa validación (un id_estudiante no puede volver a votar en la
 * misma id_eleccion) para implementarla del lado del backend con una
 * restricción UNIQUE(id_estudiante, id_eleccion) si se agrega esa columna.
 */
export const votosService = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return withFallback(() => apiClient.get(`/votos${qs ? `?${qs}` : ""}`), mockVotos);
  },
  registrar: (data) =>
    withFallback(() => apiClient.post("/votos", data), {
      id_voto: Date.now(),
      fecha_voto: new Date().toISOString(),
      ...data,
    }),
};
