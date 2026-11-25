import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { api, ApiError, ENDPOINTS, type Usuario } from "./api";

// El token de la API vive en una cookie httpOnly de este frontend (nunca en localStorage).
export const COOKIE_TOKEN = "token";

export const getToken = async () => (await cookies()).get(COOKIE_TOKEN)?.value;

export interface Sesion {
  usuario: Usuario | null;
  /** Había un token y la API ya no lo acepta (401). */
  vencida: boolean;
}

/** Estado de la sesión según GET /sesion. */
export const getSesion = cache(async (): Promise<Sesion> => {
  const token = await getToken();
  if (!token) return { usuario: null, vencida: false };
  try {
    const respuesta = await api<{ usuario: Usuario } | Usuario>(ENDPOINTS.sesion, { token });
    return { usuario: "usuario" in respuesta ? respuesta.usuario : respuesta, vencida: false };
  } catch (error) {
    // Si la API falla por otra causa, la navegación se muestra como sin sesión en vez de romper la página.
    return { usuario: null, vencida: error instanceof ApiError && error.estado === 401 };
  }
});
