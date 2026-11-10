"use client";

import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { urlExplorar, type Filtros, type Orden } from "@/lib/filtros";
import Icono from "@/components/compartidos/Icono";
import estilos from "./SelectorOrden.module.css";

interface Props {
  filtros: Filtros;
  etiqueta: string;
  opciones: Record<Orden, string>;
}

export default function SelectorOrden({ filtros, etiqueta, opciones }: Props) {
  const router = useRouter();
  const [, iniciar] = useTransition();
  const id = useId();
  return (
    <div className={estilos.orden}>
      <label htmlFor={id} className={estilos.ordenEtiqueta}>
        {etiqueta}
      </label>
      <select
        id={id}
        value={filtros.orden ?? "fecha"}
        onChange={(e) => iniciar(() => router.push(urlExplorar({ ...filtros, orden: e.target.value as Orden, pagina: undefined }), { scroll: false }))}
      >
        {(Object.keys(opciones) as Orden[]).map((clave) => (
          <option key={clave} value={clave}>
            {opciones[clave]}
          </option>
        ))}
      </select>
      <Icono nombre="chevd" tamano={14} />
    </div>
  );
}
