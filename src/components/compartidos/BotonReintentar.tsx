"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Boton from "@/components/ui/Boton";

/** Vuelve a pedir los datos de la página al servidor. */
export default function BotonReintentar({ texto, cargando }: { texto: string; cargando: string }) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  return (
    <Boton tamano="pequeno" disabled={pendiente} onClick={() => iniciar(() => router.refresh())}>
      {pendiente ? cargando : texto}
    </Boton>
  );
}
