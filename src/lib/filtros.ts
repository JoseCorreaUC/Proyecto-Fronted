// Filtros de la vista Explorar. Viven en la URL para no perderse al recargar o compartir el enlace.
// Este archivo se usa en el servidor (para pedir los eventos) y en el cliente (para cambiar la URL).
import { rangoDeFecha, type RangoFecha } from "./formato";
import { RUTAS } from "./rutas";

export type Orden = "fecha" | "precio" | "popularidad";
export type Fecha = RangoFecha | "rango";

export interface Filtros {
  q?: string;
  categoria?: string;
  ciudad?: string;
  fecha?: Fecha;
  desde?: string; // solo con fecha = "rango"
  hasta?: string;
  precioMax?: number;
  orden?: Orden;
  pagina?: number;
}

export const POR_PAGINA = 9;
const ORDENES: Orden[] = ["fecha", "precio", "popularidad"];
const FECHAS: Fecha[] = ["hoy", "finde", "mes", "rango"];
const DIA = /^\d{4}-\d{2}-\d{2}$/;

type Busqueda = Record<string, string | string[] | undefined>;

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

export function leerFiltros(busqueda: Busqueda): Filtros {
  const entero = (v?: string) => {
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : undefined;
  };
  const fecha = uno(busqueda.fecha) as Fecha | undefined;
  const orden = uno(busqueda.orden) as Orden | undefined;
  const desde = uno(busqueda.desde);
  const hasta = uno(busqueda.hasta);
  return {
    q: uno(busqueda.q)?.slice(0, 80),
    categoria: uno(busqueda.categoria),
    ciudad: uno(busqueda.ciudad),
    fecha: fecha && FECHAS.includes(fecha) ? fecha : undefined,
    desde: desde && DIA.test(desde) ? desde : undefined,
    hasta: hasta && DIA.test(hasta) ? hasta : undefined,
    precioMax: entero(uno(busqueda.precioMax)),
    orden: orden && ORDENES.includes(orden) ? orden : undefined,
    pagina: entero(uno(busqueda.pagina)),
  };
}

/** Arma la URL de Explorar con los filtros (sin los vacíos). */
export function urlExplorar(filtros: Filtros) {
  const p = new URLSearchParams();
  for (const clave of ["q", "categoria", "ciudad", "fecha", "desde", "hasta", "precioMax", "orden", "pagina"] as const) {
    const valor = filtros[clave];
    if (valor === undefined || valor === "") continue;
    if ((clave === "desde" || clave === "hasta") && filtros.fecha !== "rango") continue;
    if (clave === "orden" && valor === "fecha") continue;
    if (clave === "pagina" && valor === 1) continue;
    p.set(clave, String(valor));
  }
  const texto = p.toString();
  return texto ? `${RUTAS.explorar}?${texto}` : RUTAS.explorar;
}

/** Fechas `desde`/`hasta` del filtro: un atajo (hoy, finde, mes) o el rango elegido a mano. */
function fechasDelFiltro(filtros: Filtros): { desde?: string; hasta?: string } {
  if (!filtros.fecha) return {};
  if (filtros.fecha === "rango") return { desde: filtros.desde, hasta: filtros.hasta };
  return rangoDeFecha(filtros.fecha);
}

/** Convierte los filtros de la URL en los parámetros de GET /eventos. */
export function parametrosApi(filtros: Filtros) {
  const rango = fechasDelFiltro(filtros);
  return {
    q: filtros.q,
    categoria: filtros.categoria,
    ciudad: filtros.ciudad,
    ...rango,
    precioMax: filtros.precioMax,
    orden: filtros.orden ?? "fecha",
    pagina: filtros.pagina ?? 1,
    porPagina: POR_PAGINA,
  };
}

/** Extremos y paso del control de precio de Explorar. */
export interface RangoPrecios {
  minimo: number;
  maximo: number;
  paso: number;
}

// Los extremos se redondean a decenas de mil para que el control muestre cifras limpias.
const REDONDEO_PRECIO = 10000;
const PASO_PRECIO = 5000;

/** Calcula el rango a partir de los precios reales de los eventos (null si no hay precios). */
export function rangoDePrecios(precios: number[]): RangoPrecios | null {
  if (precios.length === 0) return null;
  return {
    minimo: Math.floor(Math.min(...precios) / REDONDEO_PRECIO) * REDONDEO_PRECIO,
    maximo: Math.ceil(Math.max(...precios) / REDONDEO_PRECIO) * REDONDEO_PRECIO,
    paso: PASO_PRECIO,
  };
}

export const hayFiltros =(f: Filtros) => Boolean(f.q || f.categoria || f.ciudad || f.fecha || f.precioMax);
