import Link from "next/link";
import type { ReactNode } from "react";
import Icono from "./Icono";

interface Props {
  id: string;
  titulo: ReactNode;
  subtitulo?: string;
  enlace: { href: string; texto: string };
}

/** Título de una sección con su enlace "Ver todos →". */
export default function EncabezadoSeccion({ id, titulo, subtitulo, enlace }: Props) {
  return (
    <div className="encabezado-seccion">
      <div>
        <h2 id={id} className="titular-h3">
          {titulo}
        </h2>
        {subtitulo && <p className="encabezado-seccion-subtitulo solo-escritorio">{subtitulo}</p>}
      </div>
      <Link href={enlace.href} className="enlace-flecha">
        {enlace.texto}
        <Icono nombre="arrowr" tamano={14} />
      </Link>
    </div>
  );
}
