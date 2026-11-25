import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { COOKIE_TOKEN, getSesion } from "@/lib/sesion";
import { RUTAS } from "@/lib/rutas";

/**
 * Cierra una sesión vencida y lleva a ingresar con el aviso. Una página no puede borrar cookies al
 * dibujarse, por eso se hace aquí. El token solo se borra si la API confirma que ya no sirve.
 */
export async function GET(peticion: NextRequest) {
  const { vencida } = await getSesion();
  if (!vencida) redirect(RUTAS.inicio);

  (await cookies()).delete(COOKIE_TOKEN);
  const parametros = new URLSearchParams({ vencida: "1" });
  const siguiente = peticion.nextUrl.searchParams.get("siguiente");
  if (siguiente) parametros.set("siguiente", siguiente);
  redirect(`${RUTAS.ingresar}?${parametros}`);
}
