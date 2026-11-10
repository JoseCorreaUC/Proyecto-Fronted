import Link from "next/link";
import Icono from "@/components/compartidos/Icono";
import { RUTAS } from "@/lib/rutas";
import estilos from "./Logo.module.css";

interface Props {
  texto: string;
  aria: string;
  /** "inverso" para fondos oscuros (pie de página). */
  variante?: "normal" | "inverso";
}

export default function Logo({ texto, aria, variante = "normal" }: Props) {
  return (
    <Link href={RUTAS.inicio} className={variante === "inverso" ? `${estilos.logo} ${estilos.logoInverso}` : estilos.logo} aria-label={aria}>
      <span className={estilos.logoMarca} aria-hidden="true">
        <Icono nombre="ticket" tamano={18} />
      </span>
      <span aria-hidden="true">
        {texto}
      </span>
    </Link>
  );
}
