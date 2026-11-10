import "server-only";

// Configuración del entorno. Es el único archivo que lee process.env: ninguna dirección
// ni valor de entorno se escribe directamente en el código.
// Los valores se definen en .env.local (desarrollo) o en las variables del proyecto en Vercel.

/** Lee una variable obligatoria y avisa con claridad si falta. */
function obligatoria(nombre: string): string {
  const valor = process.env[nombre]?.trim();
  if (!valor) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. Copia .env.example como .env.local y complétala ` +
        `(en Vercel: Settings → Environment Variables).`,
    );
  }
  return valor;
}

/** Variable opcional: undefined si no está definida o está vacía. */
function opcional(nombre: string): string | undefined {
  return process.env[nombre]?.trim() || undefined;
}

/** Dirección base de la API, sin barra final. Se valida la primera vez que se usa. */
export function getApiUrl(): string {
  const valor = obligatoria("API_URL");
  try {
    new URL(valor);
  } catch {
    throw new Error(`La variable API_URL no es una dirección válida: "${valor}".`);
  }
  return valor.replace(/\/+$/, "");
}

/** Ciudad que muestra el inicio si la API no devuelve ciudades (opcional). */
export function getCiudadPredeterminada(): string | undefined {
  return opcional("CIUDAD_PREDETERMINADA");
}

/** Cabeceras para simular latencia o errores de la API en desarrollo (ver CONTRATO.md, sección 1). */
export function getSimulacion() {
  return {
    latencia: opcional("API_SIMULAR_LATENCIA"),
    error: opcional("API_SIMULAR_ERROR"),
  };
}
