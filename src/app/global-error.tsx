"use client";

import "@/styles/tokens.css";
import estilos from "./global-error.module.css";

// Solo aparece si falla el propio layout, por ejemplo si GET /textos no responde.
// En ese caso no hay textos de la API que mostrar, así que este es el único texto fijo
// del sitio, a propósito y en los dos idiomas. Los colores salen de los tokens de diseño.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="es">
      <body className={estilos.cuerpo}>
        <div role="alert" className={estilos.caja}>
          <h1 className={estilos.titulo}>Algo salió mal · Something went wrong</h1>
          <p className={estilos.descripcion}>Revisa tu conexión e inténtalo de nuevo. · Check your connection and try again.</p>
          <button type="button" onClick={reset} className={estilos.boton}>
            Reintentar · Retry
          </button>
        </div>
      </body>
    </html>
  );
}
