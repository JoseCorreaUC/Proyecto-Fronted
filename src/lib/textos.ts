import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { api, ENDPOINTS, getListaIdiomas } from "./api";
import type { Idioma } from "./formato";
import type { Textos } from "./textos.tipos";

// Todos los textos de la interfaz salen de GET /textos y los idiomas disponibles de GET /idiomas
// (ver CONTRATO.md, sección 2). En el código no hay ninguna lista fija de idiomas.
// textos.tipos.ts solo describe las claves de los textos para TypeScript (`npm run tipos:textos`).
export type { Textos, Idioma };

export const COOKIE_IDIOMA = "idioma";
export const COOKIE_CONSENTIMIENTO = "consentimiento";

/** Idiomas de la interfaz y el predeterminado, tal como los entrega la API. */
export const getIdiomas = cache(getListaIdiomas);

/** ¿La API ofrece este idioma? */
export async function esIdiomaValido(codigo: string | undefined): Promise<boolean> {
  const { datos } = await getIdiomas();
  return datos.some((i) => i.codigo === codigo);
}

/** Idioma de la cookie si la API lo ofrece; si no, el predeterminado de la API. */
export const getIdioma = cache(async (): Promise<Idioma> => {
  const [almacen, idiomas] = await Promise.all([cookies(), getIdiomas()]);
  const valor = almacen.get(COOKIE_IDIOMA)?.value;
  return idiomas.datos.find((i) => i.codigo === valor)?.codigo ?? idiomas.predeterminado;
});

export const getTextos = cache(async (): Promise<Textos> => {
  const idioma = await getIdioma();
  const respuesta = await api<{ idioma: Idioma; textos: Textos }>(ENDPOINTS.textos, {
    parametros: { idioma },
    revalidar: 3600,
  });
  return respuesta.textos;
});

const CONSENTIMIENTOS = ["aceptado", "rechazado"] as const;
export type Consentimiento = (typeof CONSENTIMIENTOS)[number];

export const getConsentimiento = cache(async (): Promise<Consentimiento | null> => {
  const valor = (await cookies()).get(COOKIE_CONSENTIMIENTO)?.value;
  return CONSENTIMIENTOS.find((c) => c === valor) ?? null;
});
