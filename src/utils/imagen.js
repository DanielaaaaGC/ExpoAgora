// =====================================================
//  PREPARAR LA BANDERA
//  Recorta la imagen al centro para que quede cuadrada
//  (como las demás banderas) y la achica si es muy grande.
// =====================================================

const TIPOS = ["image/png", "image/jpeg", "image/webp"];
const PESO_MAXIMO = 5 * 1024 * 1024; // 5 MB
const LADO_MAXIMO = 1000; // píxeles

function cargarImagen(url) {
  return new Promise((resolver, rechazar) => {
    const imagen = new Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = () => rechazar(new Error("No se pudo abrir la imagen. Elige otra."));
    imagen.src = url;
  });
}

// Recibe el archivo elegido y devuelve { datos, nombreArchivo },
// donde "datos" es la imagen lista para mostrar y para enviar al servidor.
export async function prepararBandera(archivo) {
  if (!TIPOS.includes(archivo.type)) {
    throw new Error("La bandera debe ser una imagen PNG, JPG o WebP.");
  }
  if (archivo.size > PESO_MAXIMO) {
    throw new Error("La imagen pesa más de 5 MB. Elige una más liviana.");
  }

  const url = URL.createObjectURL(archivo);
  try {
    const imagen = await cargarImagen(url);
    const ancho = imagen.naturalWidth;
    const alto = imagen.naturalHeight;
    const lado = Math.min(ancho, alto);
    const destino = Math.min(lado, LADO_MAXIMO);

    const lienzo = document.createElement("canvas");
    lienzo.width = destino;
    lienzo.height = destino;
    lienzo
      .getContext("2d")
      .drawImage(imagen, (ancho - lado) / 2, (alto - lado) / 2, lado, lado, 0, 0, destino, destino);

    // Las fotos JPG se quedan en JPG (pesan menos); lo demás va en PNG.
    const datos =
      archivo.type === "image/jpeg"
        ? lienzo.toDataURL("image/jpeg", 0.9)
        : lienzo.toDataURL("image/png");

    return { datos, nombreArchivo: archivo.name };
  } finally {
    URL.revokeObjectURL(url);
  }
}
