import type { ReactNode } from "react";
import Icono from "./Icono";
import AvisoCargando, { type TextosCarga } from "./AvisoCargando";
import type { NombreIcono } from "./iconos";
import { BotonEnlace, unirClases } from "@/components/ui/Boton";

interface Props {
  titulo: string;
  texto: string;
  icono?: NombreIcono;
  accion?: ReactNode;
  tono?: "neutro" | "error";
  /** h1 cuando el estado ocupa toda la página (error.tsx); h2 dentro de una sección. */
  nivelTitulo?: "h1" | "h2";
}

/** Bloque para los estados vacío y error. */
export function Estado({ titulo, texto, icono = "info", accion, tono = "neutro", nivelTitulo: Titulo = "h2" }: Props) {
  const esError = tono === "error";
  return (
    <div className={unirClases("estado", esError && "estado-error")} role={esError ? "alert" : "status"}>
      <span className="estado-icono">
        <Icono nombre={icono} tamano={20} />
      </span>
      <Titulo className="titular-h4">{titulo}</Titulo>
      <p>{texto}</p>
      {accion}
    </div>
  );
}

export function EnlaceBoton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <BotonEnlace href={href} variante="secundario" tamano="pequeno">
      {children}
    </BotonEnlace>
  );
}

// Líneas grises de cada tarjeta mientras carga: categoría, título, fecha y lugar.
const LINEAS_ESQUELETO = [{ width: "30%" }, { width: "80%", height: 18 }, { width: "60%" }, { width: "70%" }];

// La variante compacta solo tiene título, fecha y precio.
const LINEAS_ESQUELETO_COMPACTA = [{ width: "80%", height: 16 }, { width: "50%" }, { width: "40%" }];

interface PropsCargando {
  cantidad?: number;
  textos?: TextosCarga;
  /** La misma forma de la lista que se espera, para que la página no salte al llegar los eventos. */
  forma?: "rejilla" | "compacta";
}

/**
 * Tarjetas grises que ocupan el lugar de los eventos mientras cargan.
 * Con `textos` lleva encima el aviso de carga; sin ellos, el aviso ya está en otra parte de la pantalla.
 */
export function TarjetasCargando({ cantidad = 4, textos, forma = "rejilla" }: PropsCargando) {
  const compacta = forma === "compacta";
  const lineas = compacta ? LINEAS_ESQUELETO_COMPACTA : LINEAS_ESQUELETO;
  return (
    <div className="carga">
      {textos && <AvisoCargando textos={textos} />}
      <div className={compacta ? "lista-compacta" : "rejilla-eventos"} aria-hidden="true">
        {Array.from({ length: cantidad }, (_, i) => (
          <div key={i} className={compacta ? "tarjeta-compacta" : "tarjeta-evento tarjeta-evento-cargando"}>
            <div className={unirClases("esqueleto", compacta ? "tarjeta-compacta-afiche" : "tarjeta-evento-afiche")} />
            <div className={compacta ? "tarjeta-compacta-lineas" : "tarjeta-evento-cuerpo"}>
              {lineas.map((estilo, j) => (
                <div key={j} className="esqueleto esqueleto-linea" style={estilo} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
