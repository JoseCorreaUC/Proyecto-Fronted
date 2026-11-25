"use client";

import { useEffect } from "react";
import { RUTAS } from "@/lib/rutas";

/** La sesión terminó: lleva a ingresar y recuerda la página para volver a ella. */
export default function SesionVencida() {
  useEffect(() => {
    const siguiente = window.location.pathname + window.location.search;
    // Carga completa: la barra de navegación debe volver a pedirse sin la sesión.
    window.location.replace(`${RUTAS.sesionVencida}?${new URLSearchParams({ siguiente })}`);
  }, []);
  return null;
}
