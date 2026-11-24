import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

// Botones del sistema de diseño. Un solo componente para <button> y otro para enlaces con
// aspecto de botón, así las clases (boton, boton-primario…) no se repiten en cada pantalla.

export interface EstiloBoton {
  variante?: "primario" | "secundario";
  tamano?: "normal" | "pequeno";
  /** Ocupa todo el ancho disponible. */
  bloque?: boolean;
  className?: string;
}

export const unirClases = (...clases: (string | false | null | undefined)[]) => clases.filter(Boolean).join(" ");

export function claseBoton({ variante = "primario", tamano = "normal", bloque = false, className }: EstiloBoton) {
  return unirClases("boton", `boton-${variante}`, tamano === "pequeno" && "boton-pequeno", bloque && "boton-bloque", className);
}

type PropsBoton = EstiloBoton & ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export default function Boton({ variante, tamano, bloque, className, type = "button", ...resto }: PropsBoton) {
  return <button type={type} className={claseBoton({ variante, tamano, bloque, className })} {...resto} />;
}

type PropsEnlace = EstiloBoton & Omit<ComponentProps<typeof Link>, "className">;

/** Enlace con aspecto de botón (por ejemplo "Ver evento" o "Ingresar"). */
export function BotonEnlace({ variante, tamano, bloque, className, ...resto }: PropsEnlace) {
  return <Link className={claseBoton({ variante, tamano, bloque, className })} {...resto} />;
}
