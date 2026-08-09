import { apiClient, withFallback } from "../lib/apiClient";
import { mockModulosVotacion } from "../mocks/mockData";

/**
 * Contenido educativo del recorrido "Aprende a votar". Se puede modelar
 * en el backend como filas de `clase` asociadas a un `modulo` llamado
 * "Simulacro de votaciones", o como tabla propia si prefieres separarlo.
 *   GET /modulos-votacion
 */
export const modulosVotacionService = {
  getAll: () => withFallback(() => apiClient.get("/modulos-votacion"), mockModulosVotacion),
};
