import Link from "next/link";
import type { EventoResumen } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt, formatoDia, formatoHora, formatoPrecio, type Idioma } from "@/lib/formato";
import Afiche from "./Afiche";
import Icono from "./Icono";
import { RUTAS } from "@/lib/rutas";
import etiquetas from "@/styles/modulos/ui/Etiqueta.module.css";
import botones from "@/styles/modulos/ui/Boton.module.css";
import estilos from "@/styles/modulos/componentes/TarjetaEvento.module.css";

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
  const href = RUTAS.evento(evento.slug);
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
    ? { texto: disp.agotada, clase: etiquetas.etiquetaError }
    : evento.disponibilidad.ultimasEntradas
      ? { texto: disp.ultimasEntradas, clase: etiquetas.etiquetaAlerta }
      : null;

  if (variante === "compacta") {
    return (
      <article className={estilos.tarjetaCompacta}>
        <Afiche afiche={evento.afiche} className={estilos.tarjetaCompactaAfiche} />
        <div>
          <Titulo className={estilos.tarjetaCompactaTitulo}>
            <Link href={href} className="enlace-estirado">
              {evento.titulo}
            </Link>
          </Titulo>
          <p className={estilos.tarjetaCompactaMeta}>{fechaHora}</p>
          <p className={estilos.tarjetaCompactaPrecio}>
            {fmt(textos.componentes.precio.desdePrecio, { precio: formatoPrecio(evento.precioDesde) })}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className={estilos.tarjetaEvento}>
      <div className={estilos.tarjetaEventoMedia}>
        <Afiche afiche={evento.afiche} className={estilos.tarjetaEventoAfiche} />
        {estado && <span className={`${etiquetas.etiqueta} ${etiquetas.etiquetaSobre} ${estado.clase}`}>{estado.texto}</span>}
      </div>
      <div className={estilos.tarjetaEventoCuerpo}>
        <span className={etiquetas.etiqueta}>{nombreCategoria(textos, evento.categoria, true)}</span>
        <Titulo className={estilos.tarjetaEventoTitulo}>{evento.titulo}</Titulo>
        <ul className={estilos.tarjetaEventoMeta}>
          <li>
            <Icono nombre="calendar" tamano={14} />
            <time dateTime={evento.fecha}>{fechaHora}</time>
          </li>
          <li>
            <Icono nombre="pin" tamano={14} />
            <span>{lugar}</span>
          </li>
        </ul>
        <div className={estilos.tarjetaEventoPie}>
          <p className={estilos.precio}>
            <span className={estilos.precioEtiqueta}>{textos.componentes.precio.desde}</span>
            <span className={estilos.precioValor}>{formatoPrecio(evento.precioDesde)}</span>
          </p>
          <Link href={href} className={`${botones.boton} ${botones.botonSecundario} ${botones.botonPequeno} enlace-estirado`} aria-label={`${textos.paginas.inicio.tarjeta.botones.verEvento}: ${evento.titulo}`}>
            {textos.paginas.inicio.tarjeta.botones.verEvento}
          </Link>
        </div>
      </div>
    </article>
  );
}
