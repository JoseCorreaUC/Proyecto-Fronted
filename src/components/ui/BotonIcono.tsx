import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, Ref } from "react";
import Icono from "@/components/compartidos/Icono";
import type { NombreIcono } from "@/components/compartidos/iconos";
import { unirClases } from "./Boton";

// Botón redondo que solo muestra un icono. `etiqueta` es obligatoria: es lo que lee el lector de pantalla.

interface EstiloIcono {
  icono: NombreIcono;
  etiqueta: string;
  tamanoIcono?: number;
  /** plano: sin borde ni fondo · cuadrado: esquinas suaves · oscuro: fondo de marca. */
  variante?: "normal" | "plano" | "cuadrado" | "oscuro";
  className?: string;
}

const claseIcono = (variante: EstiloIcono["variante"] = "normal", className?: string) =>
  unirClases("boton-icono", variante !== "normal" && `boton-icono-${variante}`, className);

type PropsBoton = EstiloIcono &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> & { ref?: Ref<HTMLButtonElement> };

export default function BotonIcono({ icono, etiqueta, tamanoIcono = 16, variante, className, type = "button", ...resto }: PropsBoton) {
  return (
    <button type={type} className={claseIcono(variante, className)} aria-label={etiqueta} {...resto}>
      <Icono nombre={icono} tamano={tamanoIcono} />
    </button>
  );
}

type PropsEnlace = EstiloIcono & Omit<ComponentProps<typeof Link>, "className" | "children" | "aria-label">;

export function EnlaceIcono({ icono, etiqueta, tamanoIcono = 16, variante, className, ...resto }: PropsEnlace) {
  return (
    <Link className={claseIcono(variante, className)} aria-label={etiqueta} {...resto}>
      <Icono nombre={icono} tamano={tamanoIcono} />
    </Link>
  );
}
