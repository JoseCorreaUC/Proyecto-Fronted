import Link from "next/link";
import type { ReactNode } from "react";
import Icono from "./Icono";
import type { NombreIcono } from "./iconos";

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
    <div className={`estado estado--${tono}`} role={tono === "error" ? "alert" : "status"}>
      <span className="estado__icono">
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
    <Link href={href} className="boton boton--secundario boton--pequeno">
      {children}
    </Link>
  );
}

/** Tarjetas grises que ocupan el lugar de los eventos mientras cargan. */
export function TarjetasCargando({ cantidad = 4, etiqueta }: { cantidad?: number; etiqueta: string }) {
  return (
    <div className="rejilla-eventos" role="status" aria-label={etiqueta}>
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className="tarjeta-evento tarjeta-evento--cargando" aria-hidden="true">
          <div className="esqueleto tarjeta-evento__afiche" />
          <div className="tarjeta-evento__cuerpo">
            <div className="esqueleto esqueleto--linea" style={{ width: "30%" }} />
            <div className="esqueleto esqueleto--linea" style={{ width: "80%", height: 18 }} />
            <div className="esqueleto esqueleto--linea" style={{ width: "60%" }} />
            <div className="esqueleto esqueleto--linea" style={{ width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
