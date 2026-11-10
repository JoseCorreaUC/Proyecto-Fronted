import "server-only";

// Cliente de la API de Taquilla. Solo se usa en el servidor (Server Components y Server Actions).

export const API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "https://yanethm-taquilla-api.fly.dev/api/v1";

/** Error con la forma del contrato: `{ error: { codigo, mensaje, campos } }`. */
export class ApiError extends Error {
  constructor(
    public estado: number,
    public codigo: string,
    mensaje: string,
    public campos?: Record<string, string>,
    public reintentarEn?: number,
  ) {
    super(mensaje);
    this.name = "ApiError";
  }
}

function errorDeRed(error: unknown) {
  console.error("[api] Falló la conexión con la API:", error);
  return new ApiError(0, "sin_conexion", "No hay conexión con la API.");
}

type Parametros = Record<string, string | number | undefined | null>;

interface Opciones {
  metodo?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  parametros?: Parametros;
  cuerpo?: unknown;
  token?: string;
  /** Segundos de caché de Next.js. `false` = sin caché. */
  revalidar?: number | false;
}

export async function api<T>(ruta: string, opciones: Opciones = {}): Promise<T> {
  const { metodo = "GET", parametros, cuerpo, token, revalidar = false } = opciones;

  const url = new URL(API_URL + ruta);
  for (const [clave, valor] of Object.entries(parametros ?? {})) {
    if (valor !== undefined && valor !== null && valor !== "") url.searchParams.set(clave, String(valor));
  }

  const cabeceras: Record<string, string> = { Accept: "application/json" };
  if (cuerpo !== undefined) cabeceras["Content-Type"] = "application/json";
  if (token) cabeceras.Authorization = `Bearer ${token}`;
  // Para ver los estados de carga y error en desarrollo (ver CONTRATO.md, sección 1).
  if (process.env.API_SIMULAR_LATENCIA) cabeceras["X-Simular-Latencia"] = process.env.API_SIMULAR_LATENCIA;
  if (process.env.API_SIMULAR_ERROR) cabeceras["X-Simular-Error"] = process.env.API_SIMULAR_ERROR;

  const pedir = () =>
    fetch(url, {
      method: metodo,
      headers: cabeceras,
      body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
      ...(revalidar === false ? { cache: "no-store" as const } : { next: { revalidate: revalidar } }),
    });

  let respuesta: Response;
  try {
    respuesta = await pedir();
  } catch (primerError) {
    // La API se apaga cuando no se usa y la primera conexión puede fallar: los GET se reintentan una vez.
    if (metodo !== "GET") throw errorDeRed(primerError);
    try {
      respuesta = await pedir();
    } catch (error) {
      throw errorDeRed(error);
    }
  }

  if (respuesta.status === 204) return undefined as T;

  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    const error = datos?.error ?? {};
    const reintentar = Number(respuesta.headers.get("Retry-After")) || undefined;
    throw new ApiError(
      respuesta.status,
      error.codigo ?? "error_interno",
      error.mensaje ?? respuesta.statusText,
      error.campos,
      reintentar,
    );
  }
  return datos as T;
}

// ---------- Tipos del contrato ----------

export interface Lista<T> {
  datos: T[];
}

export interface Paginacion {
  pagina: number;
  porPagina: number;
  total: number;
  paginas: number;
}

export interface ListaPaginada<T> extends Lista<T> {
  paginacion: Paginacion;
}

export interface Afiche {
  color1: string;
  color2: string;
  patron: "liso" | "ondas" | "lineas" | "circulos" | "puntos" | "rombos" | string;
}

export interface EventoResumen {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string;
  recinto: { nombre: string; ciudad: string; direccion?: string };
  precioDesde: number;
  afiche: Afiche;
  destacado?: boolean;
  disponibilidad: { disponibles: number; agotado: boolean; ultimasEntradas: boolean };
}

export interface Categoria {
  id: string;
  nombre: string;
  eventos: number;
}

export interface Ciudad {
  nombre: string;
  eventos: number;
}

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  correoVerificado: boolean;
  rol: string;
}

// ---------- Endpoints del Sprint 1 ----------

// Categorías y ciudades cambian poco: se guardan 5 minutos en caché.
export const getCategorias = () => api<Lista<Categoria>>("/categorias", { revalidar: 300 });
export const getCiudades = () => api<Lista<Ciudad>>("/ciudades", { revalidar: 300 });
export const getDestacados = () => api<Lista<EventoResumen>>("/eventos/destacados", { revalidar: 60 });

export interface FiltrosEventos {
  q?: string;
  categoria?: string;
  ciudad?: string;
  desde?: string;
  hasta?: string;
  precioMax?: number;
  orden?: "fecha" | "precio" | "popularidad";
  pagina?: number;
  porPagina?: number;
}

export const getEventos = (filtros: FiltrosEventos) =>
  api<ListaPaginada<EventoResumen>>("/eventos", { parametros: { ...filtros }, revalidar: 30 });
