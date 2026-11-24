"use client";

import { useTransition } from "react";
import { cambiarIdioma } from "@/app/acciones";
import type { Idioma } from "@/lib/formato";

interface Props {
  idioma: Idioma;
  etiqueta: string;
  /** Idiomas que entrega GET /idiomas: el selector muestra un botón por cada uno. */
  idiomas: { codigo: Idioma; nombre: string }[];
}

export default function SelectorIdioma({ idioma, etiqueta, idiomas }: Props) {
  const [pendiente, iniciar] = useTransition();

  return (
    <div className="selector-idioma" role="group" aria-label={etiqueta} aria-busy={pendiente}>
      {idiomas.map(({ codigo, nombre }) => (
        <button
          key={codigo}
          type="button"
          lang={codigo}
          className="selector-idioma-opcion"
          aria-pressed={idioma === codigo}
          aria-label={nombre}
          disabled={pendiente}
          onClick={() => idioma !== codigo && iniciar(() => cambiarIdioma(codigo))}
        >
          {codigo.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
