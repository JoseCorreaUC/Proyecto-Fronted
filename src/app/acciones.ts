"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api, ENDPOINTS } from "@/lib/api";
import { COOKIE_CONSENTIMIENTO, COOKIE_IDIOMA, type Idioma } from "@/lib/textos";
import { COOKIE_TOKEN } from "@/lib/sesion";

const UN_ANIO = 60 * 60 * 24 * 365;

/** Cambia el idioma. Solo se recuerda entre visitas si la persona aceptó las cookies. */
export async function cambiarIdioma(idioma: Idioma) {
  if (idioma !== "es" && idioma !== "en") return;
  const almacen = await cookies();
  const aceptado = almacen.get(COOKIE_CONSENTIMIENTO)?.value === "aceptado";
  almacen.set(COOKIE_IDIOMA, idioma, {
    path: "/",
    sameSite: "lax",
    // Sin consentimiento es una cookie de sesión: se borra al cerrar el navegador.
    ...(aceptado ? { maxAge: UN_ANIO } : {}),
  });
  revalidatePath("/", "layout");
}

export async function guardarConsentimiento(valor: "aceptado" | "rechazado") {
  const almacen = await cookies();
  almacen.set(COOKIE_CONSENTIMIENTO, valor, { path: "/", sameSite: "lax", maxAge: UN_ANIO });
  const idioma = almacen.get(COOKIE_IDIOMA)?.value;
  if (valor === "aceptado" && idioma) {
    almacen.set(COOKIE_IDIOMA, idioma, { path: "/", sameSite: "lax", maxAge: UN_ANIO });
  }
  revalidatePath("/", "layout");
}

export async function cerrarSesion() {
  const almacen = await cookies();
  const token = almacen.get(COOKIE_TOKEN)?.value;
  if (token) {
    await api(ENDPOINTS.sesion, { metodo: "DELETE", token }).catch(() => undefined);
  }
  almacen.delete(COOKIE_TOKEN);
  revalidatePath("/", "layout");
}
