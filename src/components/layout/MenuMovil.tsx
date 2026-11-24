"use client";

import type { ReactNode } from "react";
import BotonIcono from "@/components/ui/BotonIcono";
import { useDialogo } from "@/hooks/useDialogo";

interface Props {
  abrir: string;
  cerrar: string;
  /** Contenido del menú (enlaces, idioma, accesibilidad, botones). */
  children: ReactNode;
  cabecera: ReactNode;
}

export default function MenuMovil({ abrir, cerrar: textoCerrar, children, cabecera }: Props) {
  const { abierto, abrir: mostrar, cerrar, setAbierto, boton, panel } = useDialogo({ bloquearScroll: true, enfocarPrimero: true });

  return (
    <>
      <BotonIcono
        ref={boton}
        icono="menu"
        tamanoIcono={20}
        variante="plano"
        className="solo-movil"
        etiqueta={abrir}
        aria-expanded={abierto}
        onClick={mostrar}
      />

      {abierto && (
        <>
          {/* Fondo oscuro: deja ver la página y al tocarlo se cierra el menú. */}
          <div className="menu-movil-fondo" aria-hidden="true" onClick={cerrar} />
          <div
            ref={panel}
            className="menu-movil"
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
            <div className="menu-movil-cabecera">
              {cabecera}
              <BotonIcono icono="x" tamanoIcono={20} variante="plano" etiqueta={textoCerrar} onClick={cerrar} />
            </div>
            {children}
          </div>
        </>
      )}
    </>
  );
}
