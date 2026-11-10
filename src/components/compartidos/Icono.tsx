import { iconos, type NombreIcono } from "./iconos";

interface Props {
  nombre: NombreIcono;
  tamano?: number;
  className?: string;
  /** Si el icono comunica algo por sí solo, describe qué. Si no, queda oculto para lectores de pantalla. */
  etiqueta?: string;
}

export default function Icono({ nombre, tamano = 16, className, etiqueta }: Props) {
  const { viewBox, svg } = iconos[nombre];
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox={viewBox}
      fill="none"
      className={["icono", className].filter(Boolean).join(" ")}
      role={etiqueta ? "img" : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
      focusable="false"
      // Los SVG vienen del paquete de diseño del proyecto (contenido fijo y confiable).
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
