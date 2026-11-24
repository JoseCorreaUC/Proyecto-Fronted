// Peticiones a la API desde el navegador. Se ven en la pestaña Red de DevTools.
// La dirección base es la misma API_URL del servidor, entregada en la compilación (ver next.config.ts).

const API_PUBLICA = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

/** GET a la API. Lanza un error si la respuesta no es 2xx. */
export async function pedirApi<T>(ruta: string, señal?: AbortSignal): Promise<T> {
  const respuesta = await fetch(API_PUBLICA + ruta, { headers: { Accept: "application/json" }, signal: señal });
  if (!respuesta.ok) throw new Error(`GET ${ruta} respondió ${respuesta.status}`);
  return respuesta.json();
}
