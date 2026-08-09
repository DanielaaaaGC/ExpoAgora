/**
 * Cliente HTTP genérico para el CRUD de Ágora.
 *
 * Apunta a VITE_API_URL (definir en un archivo .env, ej:
 * VITE_API_URL=http://localhost:4000/api). Mientras el backend no esté
 * disponible, cada servicio en /src/services cae automáticamente a datos
 * de ejemplo (/src/mocks) para que la interfaz funcione igual.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${path}: ${text || res.statusText}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const apiClient = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

/**
 * Helper para que cada servicio pueda "degradar" a datos mock cuando el
 * backend real todavía no responde (útil durante el desarrollo del CRUD).
 */
export async function withFallback(promiseFn, fallbackValue) {
  try {
    return await promiseFn();
  } catch (err) {
    console.warn("[Ágora] Backend no disponible, usando datos de ejemplo:", err.message);
    return fallbackValue;
  }
}
