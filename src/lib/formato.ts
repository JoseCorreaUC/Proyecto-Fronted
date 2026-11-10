// Utilidades de formato. Funcionan en el servidor y en el cliente.

export type Idioma = "es" | "en";
const ZONA = "America/Bogota";
const LOCALE: Record<Idioma, string> = { es: "es-CO", en: "en-US" };

/** Reemplaza {variable} en un texto de la API. */
export function fmt(texto: string, variables: Record<string, string | number> = {}) {
  return texto.replace(/\{(\w+)\}/g, (_, clave) => String(variables[clave] ?? `{${clave}}`));
}

/** Elige la forma singular o plural de un texto de la API. */
export function plural(formas: { uno: string; otro: string }, cantidad: number, variables: Record<string, string | number> = {}) {
  return fmt(cantidad === 1 ? formas.uno : formas.otro, { cantidad, n: cantidad, ...variables });
}

/** Pesos colombianos sin decimales: $95.000 */
export function formatoPrecio(valor: number) {
  return "$" + new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(valor);
}

const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "Sáb 14 nov" / "Sat Nov 14" en hora de Colombia. */
export function formatoDia(iso: string, idioma: Idioma) {
  const partes = new Intl.DateTimeFormat(LOCALE[idioma], {
    timeZone: ZONA,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).formatToParts(new Date(iso));
  const v = (tipo: string) => partes.find((p) => p.type === tipo)?.value.replace(".", "") ?? "";
  return idioma === "es"
    ? `${capitalizar(v("weekday"))} ${v("day")} ${v("month")}`
    : `${v("weekday")} ${v("month")} ${v("day")}`;
}

/** "8:00 p. m." / "8:00 PM" en hora de Colombia. */
export function formatoHora(iso: string, idioma: Idioma) {
  return new Intl.DateTimeFormat(LOCALE[idioma], { timeZone: ZONA, hour: "numeric", minute: "2-digit" })
    .format(new Date(iso))
    .replace(/\s/g, " ");
}

/** Fecha de hoy en Colombia como YYYY-MM-DD. */
export function hoyEnBogota(ahora = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ZONA }).format(ahora);
}

function sumarDias(dia: string, dias: number) {
  const d = new Date(dia + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

export type RangoFecha = "hoy" | "finde" | "mes";

/** Convierte un atajo de fecha en los parámetros `desde` y `hasta` de GET /eventos. */
export function rangoDeFecha(rango: RangoFecha, ahora = new Date()) {
  const hoy = hoyEnBogota(ahora);
  if (rango === "hoy") return { desde: hoy, hasta: hoy };
  if (rango === "finde") {
    const diaSemana = new Date(hoy + "T12:00:00Z").getUTCDay(); // 0 = domingo
    if (diaSemana === 0) return { desde: hoy, hasta: hoy };
    const viernes = diaSemana >= 5 ? hoy : sumarDias(hoy, 5 - diaSemana);
    const domingo = sumarDias(hoy, 7 - diaSemana);
    return { desde: viernes, hasta: domingo };
  }
  const [anio, mes] = hoy.split("-").map(Number);
  const ultimo = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  return { desde: hoy, hasta: `${hoy.slice(0, 8)}${String(ultimo).padStart(2, "0")}` };
}
