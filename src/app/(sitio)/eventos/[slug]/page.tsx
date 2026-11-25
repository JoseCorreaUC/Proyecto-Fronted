import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, getEvento, getRelacionados, type EventoDetalle } from "@/lib/api";
import { getIdioma, getTextos } from "@/lib/textos";
import { fmt, formatoDia, formatoHora } from "@/lib/formato";
import { intentar } from "@/lib/intentar";
import ErrorSeccion from "@/components/compartidos/ErrorSeccion";
import { RUTAS } from "@/lib/rutas";
import Afiche from "@/components/compartidos/Afiche";
import Icono from "@/components/compartidos/Icono";
import Migas from "@/components/compartidos/Migas";
import RejillaEventos from "@/components/compartidos/RejillaEventos";
import { nombreCategoria } from "@/components/compartidos/TarjetaEvento";
import Etiqueta from "@/components/ui/Etiqueta";
import BotonCompartir from "@/components/detalle/BotonCompartir";
import ComoLlegar from "@/components/detalle/ComoLlegar";
import DatoEvento from "@/components/detalle/DatoEvento";
import DescripcionEvento from "@/components/detalle/DescripcionEvento";
import PoliticasEvento from "@/components/detalle/PoliticasEvento";

/** Pide el evento; si la API responde 404 muestra la página de no encontrado. */
async function cargarEvento(slug: string): Promise<EventoDetalle> {
  try {
    return await getEvento(slug);
  } catch (error) {
    if (error instanceof ApiError && error.estado === 404) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps<"/eventos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // punto b sustentacion 
  // 
  const [textos, evento] = await Promise.all([
    getTextos(),
    cargarEvento(slug).catch((error) => {
      if (error instanceof ApiError) return null;
      throw error;
    }),
  ]);
  if (!evento) return {};
  const seo = textos.paginas.detalleEvento.seo;
  // uso el titulo del evento
  return { title: fmt(seo.titulo, { titulo: evento.titulo }), description: evento.descripcion || seo.descripcion };
}

export default async function DetalleEvento({ params }: PageProps<"/eventos/[slug]">) {
  const { slug } = await params;
  const [evento, textos, idioma, relacionados] = await Promise.all([
    cargarEvento(slug),
    getTextos(),
    getIdioma(),
    intentar(getRelacionados(slug)),
  ]);

  const t = textos.paginas.detalleEvento;
  const fecha = formatoDia(evento.fecha, idioma, true);
  const horaInicio = formatoHora(evento.fecha, idioma);
  const puertas = evento.puertas ? formatoHora(evento.puertas, idioma) : undefined;
  const hora = puertas ? fmt(t.info.horaValor, { hora: horaInicio, puertas }) : horaInicio;
  const lugar = fmt(textos.general.formatos.lugarYCiudad, { lugar: evento.recinto.nombre, ciudad: evento.recinto.ciudad });
  const direccion = evento.recinto.direccion
    ? fmt(textos.general.formatos.lugarYCiudad, { lugar: evento.recinto.direccion, ciudad: evento.recinto.ciudad })
    : evento.recinto.ciudad;
  const edad = evento.edadMinima > 0 ? fmt(t.etiquetas.edadMinima, { edad: evento.edadMinima }) : t.etiquetas.todoPublico;
  const eventosRelacionados = relacionados.ok ? relacionados.datos.datos : [];
  // No todos los servidores de la API traen estos textos: sin ellos, esa parte no se muestra.
  const { comoLlegar, politicas } = t as Partial<typeof t>;

  return (
    // data-detalle: en el móvil el Figma muestra el afiche a pantalla completa, sin la barra de navegación.
    <article className="detalle" data-detalle>
      <div className="contenedor detalle-portada">
        <Migas
          etiqueta={textos.componentes.migas.explorar}
          className="solo-escritorio"
          pasos={[
            { texto: textos.componentes.migas.inicio, href: RUTAS.inicio },
            { texto: textos.componentes.migas.explorar, href: RUTAS.explorar },
            { texto: evento.titulo },
          ]}
        />
        <div className="detalle-imagen">
          <Afiche afiche={evento.afiche} className="detalle-afiche" />
          <div className="detalle-acciones solo-movil">
            <Link href={RUTAS.explorar} className="boton-icono detalle-accion" aria-label={textos.general.aria.volver}>
              <Icono nombre="chevl" tamano={20} />
            </Link>
            <BotonCompartir titulo={evento.titulo} etiqueta={textos.general.acciones.compartir} className="detalle-accion" />
          </div>
        </div>
      </div>

      <div className="contenedor detalle-contenido">
        <header className="detalle-cabecera">
          <div className="detalle-etiquetas">
            <Etiqueta>{nombreCategoria(textos, evento.categoria, true)}</Etiqueta>
            <Etiqueta className="detalle-etiqueta-edad solo-escritorio">{edad}</Etiqueta>
          </div>
          <div className="detalle-titulos">
            <h1 className="detalle-titulo">{evento.titulo}</h1>
            {evento.artistas.length > 0 && <p className="detalle-artistas">{evento.artistas.join(" · ")}</p>}
          </div>
        </header>

        {/* Escritorio: etiqueta arriba y dato abajo. Móvil: dato arriba y detalle abajo, en dos filas. */}
        <ul className="detalle-datos solo-escritorio">
          <DatoEvento icono="calendar" secundario={t.info.fecha} principal={fecha} />
          <DatoEvento icono="clock" secundario={t.info.hora} principal={hora} />
          <DatoEvento icono="pin" secundario={t.info.lugar} principal={lugar} />
        </ul>
        <ul className="detalle-datos solo-movil">
          <DatoEvento icono="calendar" principal={fecha} secundario={hora} principalPrimero />
          <DatoEvento icono="pin" principal={evento.recinto.nombre} secundario={direccion} principalPrimero />
        </ul>

        <nav className="detalle-pestanas solo-escritorio" aria-label={t.descripcion.titulo}>
          <a href="#descripcion" aria-current="true">
            {t.pestanas.descripcion}
          </a>
          <a href="#como-llegar">{t.pestanas.comoLlegar}</a>
          {politicas && <a href="#politicas">{t.pestanas.politicas}</a>}
        </nav>

        <section id="descripcion" className="detalle-seccion" aria-labelledby="descripcion-titulo">
          <h2 id="descripcion-titulo" className="titular-h2">
            {t.descripcion.titulo}
          </h2>
          <DescripcionEvento texto={evento.descripcion} leerMas={t.descripcion.botones.leerMas} />
        </section>

        <ComoLlegar
          titulo={t.pestanas.comoLlegar}
          tituloMapa={t.mapa.titulo}
          direccion={direccion}
          recinto={evento.recinto}
          puertas={puertas}
          textos={comoLlegar}
        />

        {politicas && <PoliticasEvento textos={politicas} edadMinima={evento.edadMinima} />}
      </div>

      {(!relacionados.ok || eventosRelacionados.length > 0) && (
        <section className="contenedor detalle-relacionados solo-escritorio" aria-labelledby="relacionados-titulo">
          <h2 id="relacionados-titulo" className="titular-h2">
            {t.relacionados.titulo}
          </h2>
          {relacionados.ok ? (
            <RejillaEventos eventos={eventosRelacionados} textos={textos} idioma={idioma} />
          ) : (
            <ErrorSeccion textos={textos} error={relacionados.error} />
          )}
        </section>
      )}
    </article>
  );
}
