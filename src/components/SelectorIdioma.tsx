"use client";

import { useTransition } from "react";
import { cambiarIdioma } from "@/app/acciones";
import type { Idioma } from "@/lib/formato";
import estilos from "./SelectorIdioma.module.css";

interface Props {
  idioma: Idioma;
  etiqueta: string;
  nombres: { es: string; en: string };
  codigos: { es: string; en: string };
}

export default function SelectorIdioma({ idioma, etiqueta, nombres, codigos }: Props) {
  const [pendiente, iniciar] = useTransition();

  return (
    <div className={estilos.selectorIdioma} role="group" aria-label={etiqueta} aria-busy={pendiente}>
      {(["es", "en"] as const).map((codigo) => (
        <button
          key={codigo}
          type="button"
          lang={codigo}
          className={estilos.selectorIdiomaOpcion}
          aria-pressed={idioma === codigo}
          aria-label={nombres[codigo]}
          disabled={pendiente}
          onClick={() => idioma !== codigo && iniciar(() => cambiarIdioma(codigo))}
        >
          {codigos[codigo]}
        </button>
      ))}
    </div>
  );
}
