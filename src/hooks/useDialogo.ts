"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Opciones {
  /** Impide que la página de fondo se desplace mientras está abierto (menú móvil, filtros). */
  bloquearScroll?: boolean;
  /** Cierra al hacer clic fuera del panel y del botón (panel de accesibilidad). */
  cerrarAlClicFuera?: boolean;
  /** Al abrir, enfoca el primer enlace o botón del panel en lugar del panel. */
  enfocarPrimero?: boolean;
}

/**
 * Comportamiento común de los paneles que se abren con un botón (menú móvil, filtros, accesibilidad):
 * al abrir mueve el foco al panel; Escape lo cierra; al cerrar el foco vuelve al botón que lo abrió.
 */
export function useDialogo<T extends HTMLElement = HTMLDivElement>({
  bloquearScroll = false,
  cerrarAlClicFuera = false,
  enfocarPrimero = false,
}: Opciones = {}) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<T>(null);

  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => {
    setAbierto(false);
    boton.current?.focus();
  }, []);

  useEffect(() => {
    if (!abierto) return;

    const destino = enfocarPrimero ? panel.current?.querySelector<HTMLElement>("a, button") : panel.current;
    destino?.focus();

    const anterior = document.body.style.overflow;
    if (bloquearScroll) document.body.style.overflow = "hidden";

    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    const alClic = (e: MouseEvent) => {
      const objetivo = e.target as Node;
      if (!panel.current?.contains(objetivo) && !boton.current?.contains(objetivo)) setAbierto(false);
    };

    document.addEventListener("keydown", alPulsar);
    if (cerrarAlClicFuera) document.addEventListener("mousedown", alClic);
    return () => {
      if (bloquearScroll) document.body.style.overflow = anterior;
      document.removeEventListener("keydown", alPulsar);
      document.removeEventListener("mousedown", alClic);
    };
  }, [abierto, bloquearScroll, cerrarAlClicFuera, enfocarPrimero, cerrar]);

  return { abierto, abrir, cerrar, setAbierto, boton, panel };
}
