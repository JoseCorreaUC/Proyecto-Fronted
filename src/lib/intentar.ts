export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: unknown };

/** Guarda el resultado o el error de una petición, para que cada sección muestre su propio estado. */
export async function intentar<T>(promesa: Promise<T>): Promise<Resultado<T>> {
  try {
    return { ok: true, datos: await promesa };
  } catch (error) {
    return { ok: false, error };
  }
}
