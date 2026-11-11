import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { api, ENDPOINTS } from "./api";
import type { Textos } from "./textos.tipos";

// Todos los textos de la interfaz salen de GET /textos (ver CONTRATO.md, sección 2).
// textos.tipos.ts solo describe sus claves para TypeScript (se genera con `npm run tipos:textos`).
export type { Textos };
export type Idioma = "es" | "en";

export const IDIOMAS: Idioma[] = ["es", "en"];
export const COOKIE_IDIOMA = "idioma";
export const COOKIE_CONSENTIMIENTO = "consentimiento";

export const getIdioma = cache(async (): Promise<Idioma> => {
  const valor = (await cookies()).get(COOKIE_IDIOMA)?.value;
  return valor === "en" ? "en" : "es";
});

export const getTextos = cache(async (): Promise<Textos> => {
  const idioma = await getIdioma();
  const respuesta = await api<{ idioma: Idioma; textos: Textos }>(ENDPOINTS.textos, {
    parametros: { idioma },
    revalidar: 3600,
  });
  return respuesta.textos;
});

export const getConsentimiento = cache(async () => {
  const valor = (await cookies()).get(COOKIE_CONSENTIMIENTO)?.value;
  return valor === "aceptado" || valor === "rechazado" ? valor : null;
});
