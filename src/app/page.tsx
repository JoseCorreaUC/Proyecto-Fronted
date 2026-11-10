import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategorias, getCiudades, getDestacados, getEventos, type EventoResumen } from "@/lib/api";
import { getIdioma, getTextos, type Textos } from "@/lib/textos";
import { fmt, formatoDia, formatoPrecio, plural, rangoDeFecha, type Idioma } from "@/lib/formato";
import { urlExplorar } from "@/lib/filtros";
import { RUTAS } from "@/lib/rutas";
import { getCiudadPredeterminada } from "@/lib/config";
import Afiche from "@/components/Afiche";
import Icono from "@/components/Icono";
import type { NombreIcono } from "@/components/iconos";
import TarjetaEvento, { nombreCategoria } from "@/components/TarjetaEvento";
import ErrorSeccion from "@/components/ErrorSeccion";
import { Estado, TarjetasCargando } from "@/components/Estados";
import HeroBuscador from "@/components/inicio/HeroBuscador";
import etiquetas from "@/styles/modulos/ui/Etiqueta.module.css";
import botones from "@/styles/modulos/ui/Boton.module.css";
import estados from "@/styles/modulos/componentes/Estados.module.css";
import tarjetas from "@/styles/modulos/componentes/TarjetaEvento.module.css";
import estilos from "@/styles/modulos/paginas/Inicio.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = (await getTextos()).paginas.inicio;
  return { title: seo.titulo, description: seo.descripcion };
}

const ICONO_CATEGORIA: Record<string, NombreIcono> = {
  conciertos: "music",
  teatro: "star",
  deportes: "trophy",
  festivales: "flag",
  comedia: "smile",
  familiares: "users",
};

/** Lo que se guarda en una sección: el resultado o el error, para mostrar su propio estado. */
async function intentar<T>(promesa: Promise<T>): Promise<{ ok: true; datos: T } | { ok: false; error: unknown }> {
  try {
    return { ok: true, datos: await promesa };
  } catch (error) {
    return { ok: false, error };
  }
}

export default async function Inicio({ searchParams }: PageProps<"/">) {
  const parametros = await searchParams;
  const [textos, idioma, categorias, ciudades] = await Promise.all([
    getTextos(),
    getIdioma(),
    intentar(getCategorias()),
    intentar(getCiudades()),
  ]);

  const t = textos.paginas.inicio;
  const listaCiudades = ciudades.ok ? ciudades.datos.datos.map((c) => c.nombre) : [];
  const pedida = typeof parametros.ciudad === "string" ? parametros.ciudad : "";
  // Ciudad de "Próximamente en…": la pedida en la URL, la primera de la API o la de CIUDAD_PREDETERMINADA.
  const ciudad = listaCiudades.find((c) => c.toLowerCase() === pedida.toLowerCase()) ?? listaCiudades[0] ?? getCiudadPredeterminada() ?? "";
  const fechas = textos.paginas.explorar.filtros.fecha;
  const opcionesFecha = [
    { valor: "hoy", texto: fechas.hoy },
    { valor: "finde", texto: fechas.finDeSemana },
    { valor: "mes", texto: fechas.mes },
  ];
  // "Populares" usa las categorías con más eventos (los textos fijos no se escriben en el código).
  const populares = categorias.ok ? [...categorias.datos.datos].sort((a, b) => b.eventos - a.eventos).slice(0, 4) : [];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={estilos.hero} data-hero aria-labelledby="hero-titulo">
        <div className={`contenedor ${estilos.heroContenido}`}>
          <div className={estilos.heroTexto}>
            <span className={`${etiquetas.etiqueta} ${etiquetas.etiquetaClara} ${estilos.heroEtiqueta} solo-escritorio`}>{t.hero.etiquetas.temporada}</span>
            <h1 id="hero-titulo" className={estilos.heroTitulo}>
              {t.hero.titulo}
            </h1>
            <p className={`${estilos.heroSubtitulo} solo-escritorio`}>{t.hero.subtitulo}</p>

            <div className="solo-escritorio">
              <HeroBuscador ciudades={listaCiudades.length ? listaCiudades : ciudad ? [ciudad] : []} ciudad={ciudad} textos={t.hero.buscador} opcionesFecha={opcionesFecha} />
              {populares.length > 0 && (
                <p className={estilos.heroPopulares}>
                  <span>{t.hero.buscador.populares}</span>
                  {populares.map((c) => (
                    <Link key={c.id} href={urlExplorar({ categoria: c.id })}>
                      {nombreCategoria(textos, c.id)}
                    </Link>
                  ))}
                </p>
              )}
            </div>

            {/* Buscador compacto del móvil */}
            <form action={RUTAS.explorar} role="search" className={`${estilos.buscadorMovil} solo-movil`}>
              <Icono nombre="search" tamano={16} />
              <label className={estilos.buscadorMovilCampo}>
                <span className="solo-lectores">{t.hero.buscador.etiquetas.que}</span>
                <input type="search" name="q" placeholder={t.hero.buscador.placeholders.movil} maxLength={80} />
                <span className={estilos.buscadorMovilResumen} aria-hidden="true">
                  {fmt(t.hero.buscador.resumenMovil, { ciudad, fecha: t.hero.buscador.placeholders.cuando })}
                </span>
              </label>
              <input type="hidden" name="ciudad" value={ciudad} />
              <button type="submit" className={`${botones.botonIcono} ${botones.botonIconoPlano}`} aria-label={t.hero.buscador.botones.buscar}>
                <Icono nombre="sliders" tamano={16} />
              </button>
            </form>
          </div>

          <div className={`${estilos.heroDestacado} solo-escritorio`}>
            <Suspense fallback={<div className={`${estados.esqueleto} ${estilos.heroAfiche}`} />}>
              <EventoPrincipal textos={textos} idioma={idioma} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ---------- Categorías ---------- */}
      <section className={`contenedor seccion ${estilos.seccionCategorias}`} aria-label={textos.paginas.explorar.filtros.categoria}>
        {categorias.ok ? (
          <>
            <ul className={`${estilos.categorias} solo-escritorio`}>
              {categorias.datos.datos.map((c) => (
                <li key={c.id}>
                  <Link href={urlExplorar({ categoria: c.id })} className={estilos.categoria}>
                    <span className={estilos.categoriaIcono}>
                      <Icono nombre={ICONO_CATEGORIA[c.id] ?? "ticket"} tamano={16} />
                    </span>
                    <span>
                      <span className={estilos.categoriaNombre}>{nombreCategoria(textos, c.id)}</span>
                      <span className={estilos.categoriaCantidad}>{plural(t.categorias.eventos, c.eventos)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={`${etiquetas.chips} solo-movil`}>
              <li>
                <Link href={RUTAS.explorar} className={`${etiquetas.chip} ${etiquetas.chipActivo}`}>
                  {t.filtrosMovil.todos}
                </Link>
              </li>
              {categorias.datos.datos.map((c) => (
                <li key={c.id}>
                  <Link href={urlExplorar({ categoria: c.id })} className={etiquetas.chip}>
                    {nombreCategoria(textos, c.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ErrorSeccion textos={textos} error={categorias.error} />
        )}
      </section>

      {/* ---------- Destacados ---------- */}
      <section className="contenedor seccion" aria-labelledby="destacados-titulo">
        <EncabezadoSeccion
          id="destacados-titulo"
          titulo={<><span className="solo-escritorio">{t.destacados.titulo}</span><span className="solo-movil">{t.filtrosMovil.destacados}</span></>}
          subtitulo={t.destacados.subtitulo}
          enlace={{ href: urlExplorar({ orden: "popularidad" }), texto: t.destacados.enlaces.verTodos }}
        />
        <Suspense fallback={<TarjetasCargando etiqueta={textos.estados.cargando.titulo} />}>
          <Destacados textos={textos} idioma={idioma} />
        </Suspense>
      </section>

      {/* ---------- Próximamente en {ciudad} (escritorio); se omite si no se conoce ninguna ciudad ---------- */}
      {ciudad && (
        <section className="contenedor seccion solo-escritorio" aria-labelledby="proximos-titulo">
          <EncabezadoSeccion
            id="proximos-titulo"
            titulo={fmt(t.proximos.titulo, { ciudad })}
            subtitulo={t.proximos.subtitulo}
            enlace={{ href: urlExplorar({ ciudad }), texto: t.destacados.enlaces.verTodos }}
          />
          <Suspense key={ciudad} fallback={<TarjetasCargando etiqueta={textos.estados.cargando.titulo} />}>
            <Proximos textos={textos} idioma={idioma} ciudad={ciudad} />
          </Suspense>
        </section>
      )}

      {/* ---------- Este fin de semana (móvil) ---------- */}
      <section className="contenedor seccion solo-movil" aria-labelledby="finde-titulo">
        <EncabezadoSeccion
          id="finde-titulo"
          titulo={t.filtrosMovil.finDeSemana}
          enlace={{ href: urlExplorar({ fecha: "finde" }), texto: t.destacados.enlaces.verTodos }}
        />
        <Suspense fallback={<TarjetasCargando cantidad={3} etiqueta={textos.estados.cargando.titulo} />}>
          <FinDeSemana textos={textos} idioma={idioma} />
        </Suspense>
      </section>
    </>
  );
}

function EncabezadoSeccion({
  id,
  titulo,
  subtitulo,
  enlace,
}: {
  id: string;
  titulo: React.ReactNode;
  subtitulo?: string;
  enlace: { href: string; texto: string };
}) {
  return (
    <div className={estilos.encabezadoSeccion}>
      <div>
        <h2 id={id} className="titular-h3">
          {titulo}
        </h2>
        {subtitulo && <p className={`${estilos.encabezadoSeccionSubtitulo} solo-escritorio`}>{subtitulo}</p>}
      </div>
      <Link href={enlace.href} className={botones.enlaceFlecha}>
        {enlace.texto}
        <Icono nombre="arrowr" tamano={14} />
      </Link>
    </div>
  );
}

interface PropsSeccion {
  textos: Textos;
  idioma: Idioma;
}

function Rejilla({ eventos, textos, idioma, carrusel }: PropsSeccion & { eventos: EventoResumen[]; carrusel?: boolean }) {
  if (eventos.length === 0) {
    return <Estado titulo={textos.estados.vacio.titulo} texto={textos.estados.vacio.texto} />;
  }
  return (
    <ul className={carrusel ? `${tarjetas.rejillaEventos} ${tarjetas.rejillaEventosCarrusel}` : tarjetas.rejillaEventos}>
      {eventos.map((evento) => (
        <li key={evento.id}>
          <TarjetaEvento evento={evento} textos={textos} idioma={idioma} />
        </li>
      ))}
    </ul>
  );
}

async function EventoPrincipal({ textos, idioma }: PropsSeccion) {
  const r = await intentar(getDestacados());
  const evento = r.ok ? r.datos.datos[0] : undefined;
  if (!evento) return null;
  const d = textos.paginas.inicio.hero.destacado;
  return (
    <article className={estilos.heroTarjeta}>
      <Afiche afiche={evento.afiche} className={estilos.heroAfiche} />
      <div className={estilos.heroFicha}>
        <span className={etiquetas.etiqueta}>{d.etiqueta}</span>
        <h2 className="titular-h3">{evento.titulo}</h2>
        <div className={estilos.heroFichaPie}>
          <div>
            <p className={estilos.heroFichaMeta}>{fmt(textos.general.formatos.fechaYLugar, { fecha: formatoDia(evento.fecha, idioma), lugar: evento.recinto.nombre })}</p>
            <p className={estilos.heroFichaPrecio}>{fmt(d.desde, { precio: formatoPrecio(evento.precioDesde) })}</p>
          </div>
          <Link href={RUTAS.evento(evento.slug)} className={`${botones.boton} ${botones.botonPrimario} ${botones.botonPequeno} enlace-estirado`} aria-label={`${d.botones.verEvento}: ${evento.titulo}`}>
            {d.botones.verEvento}
          </Link>
        </div>
      </div>
    </article>
  );
}

async function Destacados({ textos, idioma }: PropsSeccion) {
  const r = await intentar(getDestacados());
  if (!r.ok) return <ErrorSeccion textos={textos} error={r.error} />;
  return <Rejilla eventos={r.datos.datos.slice(0, 4)} textos={textos} idioma={idioma} carrusel />;
}

async function Proximos({ textos, idioma, ciudad }: PropsSeccion & { ciudad: string }) {
  const r = await intentar(getEventos({ ciudad, orden: "fecha", porPagina: 4 }));
  if (!r.ok) return <ErrorSeccion textos={textos} error={r.error} />;
  return <Rejilla eventos={r.datos.datos} textos={textos} idioma={idioma} />;
}

async function FinDeSemana({ textos, idioma }: PropsSeccion) {
  const r = await intentar(getEventos({ ...rangoDeFecha("finde"), orden: "fecha", porPagina: 3 }));
  if (!r.ok) return <ErrorSeccion textos={textos} error={r.error} />;
  if (r.datos.datos.length === 0) return <Estado titulo={textos.estados.vacio.titulo} texto={textos.estados.vacio.texto} />;
  return (
    <ul className={tarjetas.listaCompacta}>
      {r.datos.datos.map((evento) => (
        <li key={evento.id}>
          <TarjetaEvento evento={evento} textos={textos} idioma={idioma} variante="compacta" />
        </li>
      ))}
    </ul>
  );
}
