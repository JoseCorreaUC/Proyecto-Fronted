"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { api, ApiError, ENDPOINTS, type RespuestaSesion } from "@/lib/api";
import { COOKIE_TOKEN } from "@/lib/sesion";
import { RUTAS } from "@/lib/rutas";

/** Qué le falta a un campo. El formulario elige el texto de /textos según el código. */
export type ErrorCampo = "requerido" | "invalido";

/** Lo que el formulario debe mostrar después de intentar ingresar. */
export type EstadoIngreso =
  | { estado: "inicial" }
  | { estado: "campos"; campos: { correo?: ErrorCampo; clave?: ErrorCampo }; desdeApi?: boolean }
  | { estado: "credenciales" }
  | { estado: "espera"; segundos: number }
  | { estado: "conexion" }
  | { estado: "error"; codigo: string };

// La sesión de la API dura 12 horas (contrato, sección 1). La cookie dura más para que, al vencer
// el token, la API responda 401 y se pueda avisar que la sesión terminó.
const DURACION_COOKIE = 60 * 60 * 24 * 7;

/** Solo se vuelve a direcciones internas del sitio (evita redirigir a otro dominio). */
const destinoSeguro = (valor: FormDataEntryValue | null) => {
  const ruta = typeof valor === "string" ? valor : "";
  return ruta.startsWith("/") && !ruta.startsWith("//") ? ruta : RUTAS.inicio;
};

export async function ingresar(_anterior: EstadoIngreso, datos: FormData): Promise<EstadoIngreso> {
  const correo = String(datos.get("correo") ?? "").trim();
  const clave = String(datos.get("clave") ?? "");
  const mantener = datos.get("mantener") === "on";

  // Campos obligatorios: se revisan antes de llamar a la API.
  const campos: { correo?: ErrorCampo; clave?: ErrorCampo } = {};
  if (!correo) campos.correo = "requerido";
  if (!clave) campos.clave = "requerido";
  if (campos.correo || campos.clave) return { estado: "campos", campos };

  let respuesta: RespuestaSesion;
  try {
    respuesta = await api<RespuestaSesion>(ENDPOINTS.sesion, { metodo: "POST", cuerpo: { correo, clave } });
  } catch (error) {
    if (!(error instanceof ApiError)) return { estado: "error", codigo: "generico" };
    switch (error.codigo) {
      case "credenciales_invalidas":
        // Un solo mensaje: no se dice si falló el correo o la contraseña.
        return { estado: "credenciales" };
      case "validacion":
        return {
          estado: "campos",
          desdeApi: true,
          campos: { correo: error.campos?.correo ? "invalido" : undefined, clave: error.campos?.clave ? "invalido" : undefined },
        };
      case "demasiadas_peticiones":
        return { estado: "espera", segundos: error.reintentarEn ?? 60 };
      case "sin_conexion":
        return { estado: "conexion" };
      default:
        return { estado: "error", codigo: error.codigo };
    }
  }

  // El token vive en una cookie httpOnly de este frontend: el navegador no puede leerlo con JavaScript.
  (await cookies()).set(COOKIE_TOKEN, respuesta.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // "Mantener la sesión iniciada": la cookie sigue aunque se cierre el navegador; si no, es de sesión.
    ...(mantener ? { maxAge: DURACION_COOKIE } : {}),
  });
  revalidatePath("/", "layout");
  redirect(destinoSeguro(datos.get("siguiente")));
}
