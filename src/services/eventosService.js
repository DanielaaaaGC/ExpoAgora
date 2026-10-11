const API_URL = "http://localhost:3000/api/eventos";

export const eventosService = {
  // Obtener todos los eventos
  getAll: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener los eventos del servidor");
    return res.json();
  },

  // Crear un evento
  create: async (evento) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    });
    if (!res.ok) throw new Error("Error al guardar el evento");
    return res.json();
  },

  // Actualizar un evento
  update: async (id, evento) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evento),
    });
    if (!res.ok) throw new Error("Error al actualizar el evento");
    return res.json();
  },

  // Eliminar un evento
  remove: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar el evento");
    return res.json();
  },
};