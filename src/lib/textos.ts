import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { api } from "./api";
import type textosReferencia from "./textos-referencia.json";

// Todos los textos de la interfaz salen de GET /textos (ver CONTRATO.md, sección 2).
// textos-referencia.json es una copia del español que solo se usa para tener tipos en TypeScript.
export type Textos = typeof textosReferencia;
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
  const respuesta = await api<{ idioma: Idioma; textos: Textos }>("/textos", {
    parametros: { idioma },
    revalidar: 3600,
  });
  return respuesta.textos;
});

export const getConsentimiento = cache(async () => {
  const valor = (await cookies()).get(COOKIE_CONSENTIMIENTO)?.value;
  return valor === "aceptado" || valor === "rechazado" ? valor : null;
});
