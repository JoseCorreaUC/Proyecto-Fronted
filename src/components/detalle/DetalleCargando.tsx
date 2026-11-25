import type { CSSProperties } from "react";
import AvisoCargando, { type TextosCarga } from "@/components/compartidos/AvisoCargando";
import { TarjetasCargando } from "@/components/compartidos/Estados";

// Líneas grises en el lugar de las etiquetas, el título, los artistas y los datos.
const CABECERA = [
  { width: 160, height: 22 },
  { width: "60%", height: 48 },
  { width: "35%", height: 20 },
  { width: "50%", height: 44 },
];
const DESCRIPCION = [{ width: "30%", height: 24 }, { width: "100%" }, { width: "95%" }, { width: "70%" }];

const lineas = (estilos: CSSProperties[]) => estilos.map((estilo, i) => <div key={i} className="esqueleto esqueleto-linea" style={estilo} />);

/** Esqueleto del detalle de un evento, con la misma forma de la página cargada. */
export default function DetalleCargando({ textos }: { textos: TextosCarga }) {
  return (
    <div className="detalle" data-detalle>
      <div className="contenedor detalle-portada" aria-hidden="true">
        <div className="esqueleto detalle-migas-cargando solo-escritorio" />
        <div className="esqueleto detalle-afiche" />
      </div>
      <div className="contenedor detalle-contenido">
        <AvisoCargando textos={textos} />
        <div className="detalle-cabecera" aria-hidden="true">
          {lineas(CABECERA)}
        </div>
        <div className="detalle-seccion" aria-hidden="true">
          {lineas(DESCRIPCION)}
        </div>
      </div>
      <div className="contenedor detalle-relacionados solo-escritorio">
        <TarjetasCargando />
      </div>
    </div>
  );
}
