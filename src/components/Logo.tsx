import Link from "next/link";
import Icono from "./Icono";

interface Props {
  texto: string;
  aria: string;
  /** "inverso" para fondos oscuros (pie de página). */
  variante?: "normal" | "inverso";
}

export default function Logo({ texto, aria, variante = "normal" }: Props) {
  return (
    <Link href="/" className={`logo logo--${variante}`} aria-label={aria}>
      <span className="logo__marca" aria-hidden="true">
        <Icono nombre="ticket" tamano={18} />
      </span>
      <span className="logo__texto" aria-hidden="true">
        {texto}
      </span>
    </Link>
  );
}
