"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Icono from "@/components/compartidos/Icono";
import botones from "@/components/ui/Boton.module.css";
import estilos from "./MenuMovil.module.css";

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
        className={`${botones.botonIcono} ${botones.botonIconoPlano} solo-movil`}
        aria-label={abrir}
        aria-expanded={abierto}
        onClick={() => setAbierto(true)}
      >
        <Icono nombre="menu" tamano={20} />
      </button>

      {abierto && (
        <div
          className={estilos.menuMovilFondo}
          aria-hidden="true"
          onClick={() => {
            setAbierto(false);
            boton.current?.focus();
          }}
        />
      )}
      {abierto && (
        <div
          ref={hoja}
          className={estilos.menuMovil}
          // Marca para los estilos que cambian dentro del menú (Accesibilidad, Logo, Boton).
          data-menu-movil
          role="dialog"
          aria-modal="true"
          aria-label={abrir}
          // Cierra el menú al seguir un enlace.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setAbierto(false);
          }}
        >
          <div className={estilos.menuMovilCabecera}>
            {cabecera}
            <button
              type="button"
              className={`${botones.botonIcono} ${botones.botonIconoPlano}`}
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
