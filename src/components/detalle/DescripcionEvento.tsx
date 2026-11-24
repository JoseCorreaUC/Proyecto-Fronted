"use client";

import { useId, useState } from "react";

interface Props {
  texto: string;
  leerMas: string;
}

/**
 * Descripción del evento. En escritorio se ve completa; en el móvil se recorta a tres líneas
 * con un botón "Leer más", como en el Figma.
 */
export default function DescripcionEvento({ texto, leerMas }: Props) {
  const [completa, setCompleta] = useState(false);
  const id = useId();
  // La API separa los párrafos con saltos de línea.
  const parrafos = texto.split(/\n+/).filter(Boolean);

  return (
    <>
      <div id={id} className={completa ? "detalle-descripcion detalle-descripcion-completa" : "detalle-descripcion"}>
        {parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {!completa && (
        <button type="button" className="detalle-leer-mas solo-movil" aria-controls={id} aria-expanded={false} onClick={() => setCompleta(true)}>
          {leerMas}
        </button>
      )}
    </>
  );
}
