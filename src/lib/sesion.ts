import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { api, ApiError, ENDPOINTS, type Usuario } from "./api";

// El token de la API vive en una cookie httpOnly de este frontend (nunca en localStorage).
export const COOKIE_TOKEN = "token";

export const getToken = async () => (await cookies()).get(COOKIE_TOKEN)?.value;

/** Usuario de la sesión, o null si no hay sesión o ya venció. */
export const getUsuario = cache(async (): Promise<Usuario | null> => {
  const token = await getToken();
  if (!token) return null;
  try {
    const respuesta = await api<{ usuario: Usuario } | Usuario>(ENDPOINTS.sesion, { token });
    return "usuario" in respuesta ? respuesta.usuario : respuesta;
  } catch (error) {
    if (error instanceof ApiError && error.estado === 401) return null;
    // Si la API falla, la navegación se muestra como sin sesión en vez de romper la página.
    return null;
  }
});
