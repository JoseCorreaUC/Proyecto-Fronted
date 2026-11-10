import type { CSSProperties } from "react";
import type { Afiche as TipoAfiche } from "@/lib/api";

// El afiche no es una foto: es un degradado de color1 a color2 con formas encima (ver el diseño).
export default function Afiche({ afiche, className }: { afiche: TipoAfiche; className?: string }) {
  const estilo = {
    "--afiche-1": afiche.color1,
    "--afiche-2": afiche.color2,
  } as CSSProperties;
  return (
    <div className={["afiche", `afiche--${afiche.patron}`, className].filter(Boolean).join(" ")} style={estilo} aria-hidden="true">
      <span className="afiche__circulo afiche__circulo--grande" />
      <span className="afiche__circulo afiche__circulo--pequeno" />
    </div>
  );
}
