import type { ReactNode } from "react";
import { unirClases } from "./Boton";

interface Props {
  children: ReactNode;
  /** error: agotado · alerta: últimas entradas · clara: sobre fondos oscuros. */
  tono?: "normal" | "error" | "alerta" | "clara";
  /** Se ubica encima del afiche, en la esquina superior izquierda. */
  sobre?: boolean;
  className?: string;
}

/** Etiqueta pequeña: categoría, disponibilidad, "Temporada"… */
export default function Etiqueta({ children, tono = "normal", sobre = false, className }: Props) {
  return <span className={unirClases("etiqueta", tono !== "normal" && `etiqueta-${tono}`, sobre && "etiqueta-sobre", className)}>{children}</span>;
}
