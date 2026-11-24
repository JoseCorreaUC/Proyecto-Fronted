import Link from "next/link";
import Icono from "@/components/compartidos/Icono";
import { RUTAS } from "@/lib/rutas";

interface Props {
  texto: string;
  aria: string;
  /** "inverso" para fondos oscuros (pie de página). */
  variante?: "normal" | "inverso";
}

export default function Logo({ texto, aria, variante = "normal" }: Props) {
  return (
    <Link href={RUTAS.inicio} className={variante === "inverso" ? `logo logo-inverso` : "logo"} aria-label={aria}>
      <span className="logo-marca" aria-hidden="true">
        <Icono nombre="ticket" tamano={18} />
      </span>
      <span aria-hidden="true">
        {texto}
      </span>
    </Link>
  );
}
