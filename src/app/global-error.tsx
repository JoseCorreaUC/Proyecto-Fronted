"use client";

// Solo aparece si falla el propio layout, por ejemplo si GET /textos no responde.
// En ese caso no hay textos de la API, así que este es el único texto fijo del sitio, en los dos idiomas.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0, background: "#f7f7f7", color: "#141414" }}>
        <div role="alert" style={{ textAlign: "center", padding: 24, maxWidth: 420 }}>
          <h1 style={{ fontSize: 20 }}>Algo salió mal · Something went wrong</h1>
          <p style={{ color: "#525252" }}>Revisa tu conexión e inténtalo de nuevo. · Check your connection and try again.</p>
          <button type="button" onClick={reset} style={{ marginTop: 16, padding: "10px 18px", borderRadius: 8, border: 0, background: "#141414", color: "#fff", cursor: "pointer" }}>
            Reintentar · Retry
          </button>
        </div>
      </body>
    </html>
  );
}
