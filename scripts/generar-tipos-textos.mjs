// Genera src/lib/textos.tipos.ts a partir de GET /textos.
// El archivo resultante solo guarda la FORMA de los textos (las claves), nunca los textos:
// en tiempo de ejecución todos los textos siguen llegando de la API.
//
// Uso: npm run tipos:textos   (lee API_URL de .env.local)
// Vuelve a ejecutarlo si la API agrega o cambia claves en /textos.

import { writeFile } from "node:fs/promises";

const base = process.env.API_URL?.trim().replace(/\/+$/, "");
if (!base) {
  console.error("Falta la variable de entorno API_URL (copia .env.example como .env.local).");
  process.exit(1);
}

async function textosEn(idioma) {
  const respuesta = await fetch(`${base}/textos?idioma=${idioma}`, { headers: { Accept: "application/json" } });
  if (!respuesta.ok) throw new Error(`GET /textos?idioma=${idioma} respondió ${respuesta.status}`);
  return (await respuesta.json()).textos;
}

const claves = (objeto, prefijo = "") =>
  Object.entries(objeto).flatMap(([k, v]) =>
    v && typeof v === "object" ? claves(v, `${prefijo}${k}.`) : [`${prefijo}${k}`],
  );

const [es, en] = await Promise.all([textosEn("es"), textosEn("en")]);
const clavesEs = new Set(claves(es));
const diferencias = claves(en).filter((c) => !clavesEs.has(c)).concat([...clavesEs].filter((c) => !claves(en).includes(c)));
if (diferencias.length) {
  console.warn(`Aviso: es y en no tienen las mismas claves (${diferencias.length}): ${diferencias.slice(0, 10).join(", ")}`);
}

const nombre = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));

function tipo(valor, sangria) {
  if (Array.isArray(valor)) return `${valor.length ? tipo(valor[0], sangria) : "unknown"}[]`;
  if (valor && typeof valor === "object") {
    const interior = sangria + "  ";
    const campos = Object.entries(valor).map(([k, v]) => `${interior}${nombre(k)}: ${tipo(v, interior)};`);
    return `{\n${campos.join("\n")}\n${sangria}}`;
  }
  return typeof valor;
}

const salida = `// Archivo generado por scripts/generar-tipos-textos.mjs a partir de GET /textos. No editar a mano.
// Solo describe las claves de los textos para TypeScript: no contiene ningún texto de la interfaz.

export type Textos = ${tipo(es, "")};
`;

await writeFile(new URL("../src/lib/textos.tipos.ts", import.meta.url), salida);
console.log(`src/lib/textos.tipos.ts generado (${clavesEs.size} claves).`);
