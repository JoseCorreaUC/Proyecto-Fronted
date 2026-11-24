import type { CSSProperties } from "react";
import type { Afiche as TipoAfiche } from "@/lib/api";
import { unirClases } from "@/components/ui/Boton";

// El afiche no es una foto: es un degradado de color1 a color2 con dos círculos suaves encima,
// como en el Figma. El contrato solo pide el degradado; el campo `patron` de la API no se dibuja
// porque el diseño no muestra texturas.
export default function Afiche({ afiche, className }: { afiche: TipoAfiche; className?: string }) {
  const estilo = {
    "--afiche-1": afiche.color1,
    "--afiche-2": afiche.color2,
  } as CSSProperties;
  return (
    <div className={unirClases("afiche", className)} style={estilo} aria-hidden="true">
      <span className="afiche-circulo afiche-circulo-grande" />
      <span className="afiche-circulo afiche-circulo-pequeno" />
    </div>
  );
}
