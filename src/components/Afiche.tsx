import type { CSSProperties } from "react";
import type { Afiche as TipoAfiche } from "@/lib/api";
import estilos from "@/styles/modulos/componentes/Afiche.module.css";

// Clase de cada patrón que envía la API ("liso" no lleva textura).
const PATRONES: Record<string, string | undefined> = {
  lineas: estilos.aficheLineas,
  puntos: estilos.afichePuntos,
  rombos: estilos.aficheRombos,
  ondas: estilos.aficheOndas,
  circulos: estilos.aficheCirculos,
};

// El afiche no es una foto: es un degradado de color1 a color2 con formas encima (ver el diseño).
export default function Afiche({ afiche, className }: { afiche: TipoAfiche; className?: string }) {
  const estilo = {
    "--afiche-1": afiche.color1,
    "--afiche-2": afiche.color2,
  } as CSSProperties;
  return (
    <div className={[estilos.afiche, PATRONES[afiche.patron], className].filter(Boolean).join(" ")} style={estilo} aria-hidden="true">
      <span className={`${estilos.aficheCirculo} ${estilos.aficheCirculoGrande}`} />
      <span className={`${estilos.aficheCirculo} ${estilos.aficheCirculoPequeno}`} />
    </div>
  );
}
