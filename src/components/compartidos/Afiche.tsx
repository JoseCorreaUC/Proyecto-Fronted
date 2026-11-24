import type { CSSProperties } from "react";
import type { Afiche as TipoAfiche } from "@/lib/api";

// Clase de cada patrón que envía la API ("liso" no lleva textura).
const PATRONES: Record<string, string | undefined> = {
  lineas: "afiche-lineas",
  puntos: "afiche-puntos",
  rombos: "afiche-rombos",
  ondas: "afiche-ondas",
  circulos: "afiche-circulos",
};

// El afiche no es una foto: es un degradado de color1 a color2 con formas encima (ver el diseño).
export default function Afiche({ afiche, className }: { afiche: TipoAfiche; className?: string }) {
  const estilo = {
    "--afiche-1": afiche.color1,
    "--afiche-2": afiche.color2,
  } as CSSProperties;
  return (
    <div className={["afiche", PATRONES[afiche.patron], className].filter(Boolean).join(" ")} style={estilo} aria-hidden="true">
      <span className="afiche-circulo afiche-circulo-grande" />
      <span className="afiche-circulo afiche-circulo-pequeno" />
    </div>
  );
}
