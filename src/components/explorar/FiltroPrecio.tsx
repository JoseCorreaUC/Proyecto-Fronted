"use client";

import { useEffect, useEffectEvent, useId, useState } from "react";
import { formatoPrecio, type Idioma } from "@/lib/formato";
import type { RangoPrecios } from "@/lib/filtros";

interface Props {
  rango: RangoPrecios;
  /** Precio máximo que está en la URL (undefined = sin límite). */
  aplicado: number | undefined;
  alAplicar: (precioMax: number | undefined) => void;
  etiqueta: string;
  idioma: Idioma;
}

/** Deslizador de precio máximo. Se aplica cuando la persona deja de moverlo, no en cada paso. */
export default function FiltroPrecio({ rango, aplicado, alAplicar, etiqueta, idioma }: Props) {
  const [valor, setValor] = useState(aplicado ?? rango.maximo);
  const [aplicadoPrevio, setAplicadoPrevio] = useState(aplicado);
  const id = useId();

  // Si el precio cambia desde fuera (por ejemplo con "Limpiar"), el control lo refleja.
  if (aplicadoPrevio !== aplicado) {
    setAplicadoPrevio(aplicado);
    setValor(aplicado ?? rango.maximo);
  }

  // useEffectEvent: el efecto llama siempre a la versión actual de alAplicar sin repetirse cuando cambia.
  const aplicar = useEffectEvent(alAplicar);

  useEffect(() => {
    // En el extremo derecho no hay límite de precio.
    const nuevo = valor >= rango.maximo ? undefined : valor;
    if (nuevo === aplicado) return;
    const espera = setTimeout(() => aplicar(nuevo), 400);
    return () => clearTimeout(espera);
  }, [valor, rango.maximo, aplicado]);

  return (
    <div className="filtros-grupo">
      <label htmlFor={id} className="filtros-leyenda">
        {etiqueta}
      </label>
      <input
        id={id}
        type="range"
        className="deslizador"
        min={rango.minimo}
        max={rango.maximo}
        step={rango.paso}
        value={valor}
        aria-valuetext={formatoPrecio(valor, idioma)}
        onChange={(e) => setValor(Number(e.target.value))}
      />
      <div className="filtros-precios">
        <span>{formatoPrecio(rango.minimo, idioma)}</span>
        <span>{formatoPrecio(valor, idioma)}</span>
      </div>
    </div>
  );
}
