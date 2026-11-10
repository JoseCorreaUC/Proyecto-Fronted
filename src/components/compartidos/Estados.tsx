import Link from "next/link";
import type { ReactNode } from "react";
import Icono from "./Icono";
import type { NombreIcono } from "./iconos";
import botones from "@/components/ui/Boton.module.css";
import tarjetas from "./TarjetaEvento.module.css";
import estilos from "./Estados.module.css";

interface Props {
  titulo: string;
  texto: string;
  icono?: NombreIcono;
  accion?: ReactNode;
  tono?: "neutro" | "error";
}

/** Bloque para los estados vacío y error. */
export function Estado({ titulo, texto, icono = "info", accion, tono = "neutro" }: Props) {
  return (
    <div className={tono === "error" ? `${estilos.estado} ${estilos.estadoError}` : estilos.estado} role={tono === "error" ? "alert" : "status"}>
      <span className={estilos.estadoIcono}>
        <Icono nombre={icono} tamano={20} />
      </span>
      <h2 className="titular-h4">{titulo}</h2>
      <p>{texto}</p>
      {accion}
    </div>
  );
}

export function EnlaceBoton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={`${botones.boton} ${botones.botonSecundario} ${botones.botonPequeno}`}>
      {children}
    </Link>
  );
}

/** Tarjetas grises que ocupan el lugar de los eventos mientras cargan. */
export function TarjetasCargando({ cantidad = 4, etiqueta }: { cantidad?: number; etiqueta: string }) {
  return (
    <div className={tarjetas.rejillaEventos} role="status" aria-label={etiqueta}>
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className={`${tarjetas.tarjetaEvento} ${tarjetas.tarjetaEventoCargando}`} aria-hidden="true">
          <div className={`${estilos.esqueleto} ${tarjetas.tarjetaEventoAfiche}`} />
          <div className={tarjetas.tarjetaEventoCuerpo}>
            <div className={`${estilos.esqueleto} ${estilos.esqueletoLinea}`} style={{ width: "30%" }} />
            <div className={`${estilos.esqueleto} ${estilos.esqueletoLinea}`} style={{ width: "80%", height: 18 }} />
            <div className={`${estilos.esqueleto} ${estilos.esqueletoLinea}`} style={{ width: "60%" }} />
            <div className={`${estilos.esqueleto} ${estilos.esqueletoLinea}`} style={{ width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
