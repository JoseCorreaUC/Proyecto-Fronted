"use client";

import "./globals.css";

// Solo aparece si falla el propio layout, por ejemplo si GET /textos no responde.
// En ese caso no hay textos de la API que mostrar, así que este es el único texto fijo
// del sitio, a propósito y en los dos idiomas. Los colores salen de los tokens de diseño.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="es">
      <body className="error-global-cuerpo">
        <div role="alert" className="error-global-caja">
          <h1 className="error-global-titulo">Algo salió mal · Something went wrong</h1>
          <p className="error-global-descripcion">Revisa tu conexión e inténtalo de nuevo. · Check your connection and try again.</p>
          <button type="button" onClick={reset} className="error-global-boton">
            Reintentar · Retry
          </button>
        </div>
      </body>
    </html>
  );
}
