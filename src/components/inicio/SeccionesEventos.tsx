import { getDestacados, getEventos } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt, formatoDia, formatoPrecio, rangoDeFecha, type Idioma } from "@/lib/formato";
import { intentar } from "@/lib/intentar";
import { RUTAS } from "@/lib/rutas";
import Afiche from "@/components/compartidos/Afiche";
import ErrorSeccion from "@/components/compartidos/ErrorSeccion";
import RejillaEventos from "@/components/compartidos/RejillaEventos";
import { BotonEnlace } from "@/components/ui/Boton";
import Etiqueta from "@/components/ui/Etiqueta";
import { textosTarjeta } from "@/components/compartidos/TarjetaEvento";
import DestacadosCliente from "./DestacadosCliente";

const CANTIDAD_DESTACADOS = 4;

// Secciones del inicio que piden sus propios eventos. Cada una va dentro de un <Suspense>,
// así la página se muestra enseguida y cada sección aparece cuando llega su respuesta.

interface Props {
  textos: Textos;
  idioma: Idioma;
}

/** Evento grande del hero: el primero de los destacados. */
export async function EventoPrincipal({ textos, idioma }: Props) {
  const r = await intentar(getDestacados());
  const evento = r.ok ? r.datos.datos[0] : undefined;
  if (!evento) return null;
  const d = textos.paginas.inicio.hero.destacado;
  return (
    <article className="hero-tarjeta">
      <Afiche afiche={evento.afiche} className="hero-afiche" />
      <div className="hero-ficha">
        <Etiqueta>{d.etiqueta}</Etiqueta>
        <h2 className="titular-h3">{evento.titulo}</h2>
        <div className="hero-ficha-pie">
          <div>
            <p className="hero-ficha-meta">
              {fmt(textos.general.formatos.fechaYLugar, { fecha: formatoDia(evento.fecha, idioma), lugar: evento.recinto.nombre })}
            </p>
            <p className="hero-ficha-precio">{fmt(d.desde, { precio: formatoPrecio(evento.precioDesde, idioma) })}</p>
          </div>
          <BotonEnlace href={RUTAS.evento(evento.slug)} tamano="pequeno" className="enlace-estirado" aria-label={`${d.botones.verEvento}: ${evento.titulo}`}>
            {d.botones.verEvento}
          </BotonEnlace>
        </div>
      </div>
    </article>
  );
}

/** Destacados: el servidor trae los eventos y el cliente los refresca desde el navegador. */
export async function Destacados({ textos, idioma }: Props) {
  const r = await intentar(getDestacados());
  const iniciales = r.ok ? r.datos.datos.slice(0, CANTIDAD_DESTACADOS) : undefined;
  return <DestacadosCliente textos={{ ...textosTarjeta(textos), estados: textos.estados }} idioma={idioma} iniciales={iniciales} cantidad={CANTIDAD_DESTACADOS} />;
}

export async function Proximos({ textos, idioma, ciudad }: Props & { ciudad: string }) {
  const r = await intentar(getEventos({ ciudad, orden: "fecha", porPagina: 4 }));
  if (!r.ok) return <ErrorSeccion textos={textos} error={r.error} />;
  return <RejillaEventos eventos={r.datos.datos} textos={textos} idioma={idioma} />;
}

export async function FinDeSemana({ textos, idioma }: Props) {
  const r = await intentar(getEventos({ ...rangoDeFecha("finde"), orden: "fecha", porPagina: 3 }));
  if (!r.ok) return <ErrorSeccion textos={textos} error={r.error} />;
  return <RejillaEventos eventos={r.datos.datos} textos={textos} idioma={idioma} forma="compacta" />;
}
