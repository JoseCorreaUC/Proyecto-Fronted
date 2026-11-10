import Link from "next/link";
import type { EventoResumen } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt, formatoDia, formatoHora, formatoPrecio, type Idioma } from "@/lib/formato";
import Afiche from "./Afiche";
import Icono from "./Icono";

interface Props {
  evento: EventoResumen;
  textos: Textos;
  idioma: Idioma;
  /** "compacta" es la fila de la lista móvil "Este fin de semana". */
  variante?: "normal" | "compacta";
  nivelTitulo?: "h2" | "h3";
}

export function nombreCategoria(textos: Textos, id: string, singular = false) {
  const cat = textos.general.categorias as Record<string, unknown>;
  const fuente = (singular ? cat.singular : cat) as Record<string, string>;
  return fuente[id] ?? id;
}

export default function TarjetaEvento({ evento, textos, idioma, variante = "normal", nivelTitulo = "h3" }: Props) {
  const Titulo = nivelTitulo;
  const href = `/eventos/${evento.slug}`;
  const fechaHora = fmt(textos.general.formatos.fechaYHora, {
    fecha: formatoDia(evento.fecha, idioma),
    hora: formatoHora(evento.fecha, idioma),
  });
  const lugar = fmt(textos.general.formatos.lugarYCiudad, {
    lugar: evento.recinto.nombre,
    ciudad: evento.recinto.ciudad,
  });
  const disp = textos.componentes.etiquetas.disponibilidad;
  const estado = evento.disponibilidad.agotado
    ? { texto: disp.agotada, clase: "etiqueta--error" }
    : evento.disponibilidad.ultimasEntradas
      ? { texto: disp.ultimasEntradas, clase: "etiqueta--alerta" }
      : null;

  if (variante === "compacta") {
    return (
      <article className="tarjeta-compacta">
        <Afiche afiche={evento.afiche} className="tarjeta-compacta__afiche" />
        <div className="tarjeta-compacta__cuerpo">
          <Titulo className="tarjeta-compacta__titulo">
            <Link href={href} className="enlace-estirado">
              {evento.titulo}
            </Link>
          </Titulo>
          <p className="tarjeta-compacta__meta">{fechaHora}</p>
          <p className="tarjeta-compacta__precio">
            {fmt(textos.componentes.precio.desdePrecio, { precio: formatoPrecio(evento.precioDesde) })}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="tarjeta-evento">
      <div className="tarjeta-evento__media">
        <Afiche afiche={evento.afiche} className="tarjeta-evento__afiche" />
        {estado && <span className={`etiqueta etiqueta--sobre ${estado.clase}`}>{estado.texto}</span>}
      </div>
      <div className="tarjeta-evento__cuerpo">
        <span className="etiqueta">{nombreCategoria(textos, evento.categoria, true)}</span>
        <Titulo className="tarjeta-evento__titulo">{evento.titulo}</Titulo>
        <ul className="tarjeta-evento__meta">
          <li>
            <Icono nombre="calendar" tamano={14} />
            <time dateTime={evento.fecha}>{fechaHora}</time>
          </li>
          <li>
            <Icono nombre="pin" tamano={14} />
            <span>{lugar}</span>
          </li>
        </ul>
        <div className="tarjeta-evento__pie">
          <p className="precio">
            <span className="precio__etiqueta">{textos.componentes.precio.desde}</span>
            <span className="precio__valor">{formatoPrecio(evento.precioDesde)}</span>
          </p>
          <Link href={href} className="boton boton--secundario boton--pequeno enlace-estirado" aria-label={`${textos.paginas.inicio.tarjeta.botones.verEvento}: ${evento.titulo}`}>
            {textos.paginas.inicio.tarjeta.botones.verEvento}
          </Link>
        </div>
      </div>
    </article>
  );
}
