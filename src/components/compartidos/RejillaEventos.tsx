import type { EventoResumen } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import type { Idioma } from "@/lib/formato";
import { unirClases } from "@/components/ui/Boton";
import TarjetaEvento from "./TarjetaEvento";
import { Estado } from "./Estados";

interface Props {
  eventos: EventoResumen[];
  textos: Textos;
  idioma: Idioma;
  /** rejilla: tarjetas en columnas · carrusel: desliza en el móvil · compacta: lista de filas pequeñas. */
  forma?: "rejilla" | "carrusel" | "compacta";
  /** En Explorar la rejilla tiene tres columnas (la cuarta la ocupa el panel de filtros). */
  tresColumnas?: boolean;
  nivelTitulo?: "h2" | "h3";
}

/** Lista de eventos de la API; si viene vacía muestra el estado vacío. */
export default function RejillaEventos({ eventos, textos, idioma, forma = "rejilla", tresColumnas = false, nivelTitulo }: Props) {
  if (eventos.length === 0) {
    return <Estado titulo={textos.estados.vacio.titulo} texto={textos.estados.vacio.texto} />;
  }

  const compacta = forma === "compacta";
  const clase = compacta
    ? "lista-compacta"
    : unirClases("rejilla-eventos", forma === "carrusel" && "rejilla-eventos-carrusel", tresColumnas && "rejilla-eventos-tres");

  return (
    <ul className={clase}>
      {eventos.map((evento) => (
        <li key={evento.id}>
          <TarjetaEvento evento={evento} textos={textos} idioma={idioma} variante={compacta ? "compacta" : "normal"} nivelTitulo={nivelTitulo} />
        </li>
      ))}
    </ul>
  );
}
