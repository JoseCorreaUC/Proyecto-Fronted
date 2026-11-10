"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

/** Vuelve a pedir los datos de la página al servidor. */
export default function BotonReintentar({ texto, cargando }: { texto: string; cargando: string }) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  return (
    <button type="button" className="boton boton--primario boton--pequeno" disabled={pendiente} onClick={() => iniciar(() => router.refresh())}>
      {pendiente ? cargando : texto}
    </button>
  );
}
