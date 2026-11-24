import Link from "next/link";
import { fmt } from "@/lib/formato";
import Icono from "./Icono";
import type { NombreIcono } from "./iconos";

interface Props {
  actual: number;
  paginas: number;
  /** Dirección de cada página (la arma quien usa el componente, así sirve para cualquier lista). */
  url: (pagina: number) => string;
  textos: { etiqueta: string; anterior: string; siguiente: string; paginaActual: string; irAPagina: string };
}

/** 1 2 3 … 6: siempre la primera, la última y las vecinas de la actual. */
function numerosVisibles(actual: number, paginas: number) {
  const numeros: (number | "…")[] = [];
  for (let n = 1; n <= paginas; n++) {
    if (n === 1 || n === paginas || Math.abs(n - actual) <= 1 || (actual <= 2 && n <= 3)) numeros.push(n);
    else if (numeros.at(-1) !== "…") numeros.push("…");
  }
  return numeros;
}

/** Flecha anterior/siguiente: enlace si hay a dónde ir, si no un bloque desactivado. */
function Flecha({ href, icono, etiqueta }: { href?: string; icono: NombreIcono; etiqueta: string }) {
  const contenido = <Icono nombre={icono} tamano={14} />;
  return href ? (
    <Link href={href} className="paginacion-boton" aria-label={etiqueta}>
      {contenido}
    </Link>
  ) : (
    <span className="paginacion-boton" aria-disabled="true">
      {contenido}
    </span>
  );
}

export default function Paginacion({ actual: pedida, paginas, url, textos }: Props) {
  if (paginas <= 1) return null;
  const actual = Math.min(pedida, paginas);

  return (
    <nav className="paginacion" aria-label={textos.etiqueta}>
      <Flecha href={actual > 1 ? url(actual - 1) : undefined} icono="chevl" etiqueta={textos.anterior} />
      <ol>
        {numerosVisibles(actual, paginas).map((n, i) =>
          n === "…" ? (
            <li key={`puntos-${i}`} aria-hidden="true" className="paginacion-puntos">
              …
            </li>
          ) : (
            <li key={n}>
              <Link
                href={url(n)}
                className="paginacion-boton"
                aria-current={n === actual ? "page" : undefined}
                aria-label={fmt(n === actual ? textos.paginaActual : textos.irAPagina, { numero: n })}
              >
                {n}
              </Link>
            </li>
          ),
        )}
      </ol>
      <Flecha href={actual < paginas ? url(actual + 1) : undefined} icono="chevr" etiqueta={textos.siguiente} />
    </nav>
  );
}
