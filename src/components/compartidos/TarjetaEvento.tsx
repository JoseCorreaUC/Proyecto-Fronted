import Link from "next/link";
import type { EventoResumen } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt, formatoDia, formatoHora, formatoPrecio, type Idioma } from "@/lib/formato";
import Afiche from "./Afiche";
import Icono from "./Icono";
import { RUTAS } from "@/lib/rutas";
import { BotonEnlace } from "@/components/ui/Boton";
import Etiqueta from "@/components/ui/Etiqueta";

/**
 * Solo las partes de GET /textos que usa la tarjeta. Así un componente de cliente puede recibirlas
 * sin mandar al navegador todos los textos del sitio (unos 42 KB).
 */
export type TextosTarjeta = Pick<Textos, "general" | "componentes"> & {
  paginas: { inicio: { tarjeta: Textos["paginas"]["inicio"]["tarjeta"] } };
};

export const textosTarjeta = (textos: Textos): TextosTarjeta => ({
  general: textos.general,
  componentes: textos.componentes,
  paginas: { inicio: { tarjeta: textos.paginas.inicio.tarjeta } },
});

/** Etiqueta de disponibilidad: "Agotada" tiene prioridad sobre "Últimas entradas". */
function estadoDisponibilidad(evento: EventoResumen, textos: TextosTarjeta) {
  const textosDisp = textos.componentes.etiquetas.disponibilidad;
  if (evento.disponibilidad.agotado) return { texto: textosDisp.agotada, tono: "error" as const };
  if (evento.disponibilidad.ultimasEntradas) return { texto: textosDisp.ultimasEntradas, tono: "alerta" as const };
  return null;
}

interface Props {
  evento: EventoResumen;
  textos: TextosTarjeta;
  idioma: Idioma;
  /** "compacta" es la fila de la lista móvil "Este fin de semana". */
  variante?: "normal" | "compacta";
  nivelTitulo?: "h2" | "h3";
}

export function nombreCategoria(textos: Pick<Textos, "general">, id: string, singular = false) {
  const cat = textos.general.categorias as Record<string, unknown>;
  const fuente = (singular ? cat.singular : cat) as Record<string, string>;
  return fuente[id] ?? id;
}

export default function TarjetaEvento({ evento, textos, idioma, variante = "normal", nivelTitulo = "h3" }: Props) {
  const Titulo = nivelTitulo;
  const href = RUTAS.evento(evento.slug);
  const fechaHora = fmt(textos.general.formatos.fechaYHora, {
    fecha: formatoDia(evento.fecha, idioma),
    hora: formatoHora(evento.fecha, idioma),
  });
  const lugar = fmt(textos.general.formatos.lugarYCiudad, {
    lugar: evento.recinto.nombre,
    ciudad: evento.recinto.ciudad,
  });
  const disponibilidad = estadoDisponibilidad(evento, textos);
  const verEvento = textos.paginas.inicio.tarjeta.botones.verEvento;

  if (variante === "compacta") {
    return (
      <article className="tarjeta-compacta">
        <Afiche afiche={evento.afiche} className="tarjeta-compacta-afiche" />
        <div>
          <Titulo className="tarjeta-compacta-titulo">
            <Link href={href} className="enlace-estirado">
              {evento.titulo}
            </Link>
          </Titulo>
          <p className="tarjeta-compacta-meta">{fechaHora}</p>
          <p className="tarjeta-compacta-precio">
            {fmt(textos.componentes.precio.desdePrecio, { precio: formatoPrecio(evento.precioDesde, idioma) })}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="tarjeta-evento">
      <div className="tarjeta-evento-media">
        <Afiche afiche={evento.afiche} className="tarjeta-evento-afiche" />
        {disponibilidad && (
          <Etiqueta tono={disponibilidad.tono} sobre>
            {disponibilidad.texto}
          </Etiqueta>
        )}
      </div>
      <div className="tarjeta-evento-cuerpo">
        <Etiqueta>{nombreCategoria(textos, evento.categoria, true)}</Etiqueta>
        <Titulo className="tarjeta-evento-titulo">{evento.titulo}</Titulo>
        <ul className="tarjeta-evento-meta">
          <li>
            <Icono nombre="calendar" tamano={14} />
            <time dateTime={evento.fecha}>{fechaHora}</time>
          </li>
          <li>
            <Icono nombre="pin" tamano={14} />
            <span>{lugar}</span>
          </li>
        </ul>
        <div className="tarjeta-evento-pie">
          <p className="precio">
            <span className="precio-etiqueta">{textos.componentes.precio.desde}</span>
            <span className="precio-valor">{formatoPrecio(evento.precioDesde, idioma)}</span>
          </p>
          <BotonEnlace href={href} variante="secundario" tamano="pequeno" className="enlace-estirado" aria-label={`${verEvento}: ${evento.titulo}`}>
            {verEvento}
          </BotonEnlace>
        </div>
      </div>
    </article>
  );
}
