import Icono from "@/components/compartidos/Icono";
import type { NombreIcono } from "@/components/compartidos/iconos";

interface Props {
  icono: NombreIcono;
  /** Texto pequeño (12 px). En escritorio va arriba como etiqueta ("Fecha"); en el móvil, abajo como detalle. */
  secundario: string;
  /** Texto principal (14 px, peso 500). */
  principal: string;
  /** En el móvil el Figma pone el dato principal primero y el secundario debajo. */
  principalPrimero?: boolean;
}

/** Dato del evento con su icono en un cuadro gris: fecha, hora, lugar. */
export default function DatoEvento({ icono, secundario, principal, principalPrimero = false }: Props) {
  return (
    <li className="dato-evento">
      <span className="dato-evento-icono">
        <Icono nombre={icono} tamano={20} />
      </span>
      <span className={principalPrimero ? "dato-evento-textos dato-evento-textos-invertidos" : "dato-evento-textos"}>
        <span className="dato-evento-secundario">{secundario}</span>
        <span className="dato-evento-principal">{principal}</span>
      </span>
    </li>
  );
}
