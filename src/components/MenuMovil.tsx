"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Icono from "./Icono";

interface Props {
  abrir: string;
  cerrar: string;
  /** Contenido del menú (enlaces, idioma, accesibilidad, botones). */
  children: ReactNode;
  cabecera: ReactNode;
}

export default function MenuMovil({ abrir, cerrar, children, cabecera }: Props) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const hoja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    hoja.current?.querySelector<HTMLElement>("a, button")?.focus();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("keydown", alPulsar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", alPulsar);
    };
  }, [abierto]);

  return (
    <>
      <button
        ref={boton}
        type="button"
        className="boton-icono boton-icono--plano solo-movil"
        aria-label={abrir}
        aria-expanded={abierto}
        onClick={() => setAbierto(true)}
      >
        <Icono nombre="menu" tamano={20} />
      </button>

      {abierto && (
        <div
          ref={hoja}
          className="menu-movil"
          role="dialog"
          aria-modal="true"
          aria-label={abrir}
          // Cierra el menú al seguir un enlace.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setAbierto(false);
          }}
        >
          <div className="menu-movil__cabecera">
            {cabecera}
            <button
              type="button"
              className="boton-icono boton-icono--plano"
              aria-label={cerrar}
              onClick={() => {
                setAbierto(false);
                boton.current?.focus();
              }}
            >
              <Icono nombre="x" tamano={20} />
            </button>
          </div>
          {children}
        </div>
      )}
    </>
  );
}
