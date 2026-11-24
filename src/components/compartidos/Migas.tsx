import Link from "next/link";

interface Props {
  etiqueta: string;
  /** Pasos anteriores (con enlace) y la página actual al final (sin enlace). */
  pasos: { texto: string; href?: string }[];
  className?: string;
}

/** Ruta de migas de pan: Inicio › Explorar. */
export default function Migas({ etiqueta, pasos, className }: Props) {
  return (
    <nav aria-label={etiqueta} className={className ? `migas ${className}` : "migas"}>
      <ol>
        {pasos.map((paso) => (
          <li key={paso.texto} aria-current={paso.href ? undefined : "page"}>
            {paso.href ? <Link href={paso.href}>{paso.texto}</Link> : paso.texto}
          </li>
        ))}
      </ol>
    </nav>
  );
}
