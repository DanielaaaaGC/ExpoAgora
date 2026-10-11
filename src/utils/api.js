// Hace una petición al servidor y devuelve la respuesta ya leída.
// Si algo sale mal lanza un Error con un mensaje para mostrar.

const SIN_SERVIDOR =
  "El servidor de la caja de ideas no respondió. Revisa que la terminal siga abierta con npm start.";

export async function pedir(url, metodo = "GET", cuerpo) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      method: metodo,
      headers: cuerpo ? { "Content-Type": "application/json" } : undefined,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch (problema) {
    throw new Error(SIN_SERVIDOR);
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok || !datos) {
    const error = new Error((datos && datos.error) || SIN_SERVIDOR);
    error.codigo = datos ? datos.codigo : "";
    throw error;
  }
  return datos;
}
