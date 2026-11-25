// Rutas internas del sitio (páginas del frontend, no de la API).
// Se usan desde aquí para que un cambio de ruta se haga en un solo lugar
// y no se confunda con las rutas de la API (ver ENDPOINTS en src/lib/api.ts).

export const RUTAS = {
  inicio: "/",
  explorar: "/explorar",
  ingresar: "/ingresar",
  registro: "/registro",
  /** Borra el token vencido y lleva a ingresar con el aviso. */
  sesionVencida: "/sesion-vencida",
  /** Recuperar la contraseña (pantallas del Sprint 3). */
  recuperarClave: "/recuperar-clave",
  terminos: "/terminos",
  accesibilidad: "/accesibilidad",
  /** Detalle de un evento. */
  evento: (slug: string) => `/eventos/${encodeURIComponent(slug)}`,
  /** Ruta antigua de Explorar; redirige a RUTAS.explorar. */
  eventosAntigua: "/eventos",
} as const;
