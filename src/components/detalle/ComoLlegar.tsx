import type { EventoDetalle } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt } from "@/lib/formato";

/** Búsqueda de Google Maps que indica el contrato: acepta "lat,lng" o una dirección escrita. */
const enlaceMapa = (consulta: string) => `https://www.google.com/maps/search/?${new URLSearchParams({ api: "1", query: consulta })}`;

interface Props {
  titulo: string;
  tituloMapa: string;
  /** Dirección ya armada con la ciudad. */
  direccion: string;
  recinto: EventoDetalle["recinto"];
  /** Hora de puertas ya formateada, si el evento la trae. */
  puertas?: string;
  textos?: Textos["paginas"]["detalleEvento"]["comoLlegar"];
}

/** Sección "Cómo llegar": mapa, dirección, parqueadero y enlace para abrir el mapa. */
export default function ComoLlegar({ titulo, tituloMapa, direccion, recinto, puertas, textos }: Props) {
  const { ubicacion } = recinto;
  const consulta = ubicacion ? `${ubicacion.lat},${ubicacion.lng}` : `${recinto.nombre}, ${direccion}`;

  return (
    <section id="como-llegar" className="detalle-seccion solo-escritorio" aria-labelledby="como-llegar-titulo">
      <h2 id="como-llegar-titulo" className="titular-h2">
        {titulo}
      </h2>
      <div className="detalle-mapa" role="img" aria-label={tituloMapa}>
        <span>{tituloMapa}</span>
      </div>
      <p className="detalle-direccion">{`${recinto.nombre} · ${direccion}`}</p>
      {textos && (
        <>
          {/* En español la hora termina en punto ("p. m.") y la frase de la API también: queda uno solo. */}
          {puertas && <p className="detalle-direccion">{fmt(textos.puertas, { puertas }).replace(/\.\.$/, ".")}</p>}
          <p className="detalle-direccion">
            {recinto.parqueadero ? `${textos.parqueadero}: ${recinto.parqueadero}` : textos.sinParqueadero}
          </p>
          <a className="detalle-enlace-mapa" href={enlaceMapa(consulta)} target="_blank" rel="noopener noreferrer">
            {textos.botones.abrirMapa}
          </a>
        </>
      )}
    </section>
  );
}
