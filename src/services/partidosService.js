import { apiClient, withFallback } from "../lib/apiClient";
import { mockPartidos } from "../mocks/mockData";

/**
 * CRUD sobre `partido_politico`, `miembro_partido`, `propuesta` y
 * lectura agregada de `voto`.
 *   GET    /partidos?gobierno_id=...
 *   POST   /partidos
 *   PUT    /partidos/:id
 *   DELETE /partidos/:id
 *   POST   /partidos/:id/miembros
 *   DELETE /miembros/:id
 *   POST   /partidos/:id/propuestas
 *   DELETE /propuestas/:id
 */
export const partidosService = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return withFallback(() => apiClient.get(`/partidos${qs ? `?${qs}` : ""}`), mockPartidos);
  },
  create: (data) =>
    withFallback(() => apiClient.post("/partidos", data), {
      id_partido: Date.now(), votos: 0, miembros: [], propuestas: [], ...data,
    }),
  update: (id, data) => withFallback(() => apiClient.put(`/partidos/${id}`, data), { id_partido: id, ...data }),
  remove: (id) => withFallback(() => apiClient.delete(`/partidos/${id}`), null),

  agregarMiembro: (idPartido, data) =>
    withFallback(() => apiClient.post(`/partidos/${idPartido}/miembros`, data), { id_miembro: Date.now(), ...data }),
  quitarMiembro: (idMiembro) => withFallback(() => apiClient.delete(`/miembros/${idMiembro}`), null),

  agregarPropuesta: (idPartido, data) =>
    withFallback(() => apiClient.post(`/partidos/${idPartido}/propuestas`, data), { id_propuesta: Date.now(), ...data }),
  quitarPropuesta: (idPropuesta) => withFallback(() => apiClient.delete(`/propuestas/${idPropuesta}`), null),
};
