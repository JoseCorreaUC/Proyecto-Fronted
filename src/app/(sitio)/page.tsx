import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategorias, getCiudades } from "@/lib/api";
import { getIdioma, getTextos } from "@/lib/textos";
import { fmt } from "@/lib/formato";
import { urlExplorar } from "@/lib/filtros";
import { intentar } from "@/lib/intentar";
import { getCiudadPredeterminada } from "@/lib/config";
import { nombreCategoria } from "@/components/compartidos/TarjetaEvento";
import ErrorSeccion from "@/components/compartidos/ErrorSeccion";
import EncabezadoSeccion from "@/components/compartidos/EncabezadoSeccion";
import { TarjetasCargando } from "@/components/compartidos/Estados";
import Etiqueta from "@/components/ui/Etiqueta";
import HeroBuscador from "@/components/inicio/HeroBuscador";
import BuscadorMovil from "@/components/inicio/BuscadorMovil";
import Categorias from "@/components/inicio/Categorias";
import { Destacados, EventoPrincipal, FinDeSemana, Proximos } from "@/components/inicio/SeccionesEventos";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = (await getTextos()).paginas.inicio;
  return { title: seo.titulo, description: seo.descripcion };
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
  const ciudadesBuscador = listaCiudades.length > 0 ? listaCiudades : [ciudad].filter(Boolean);
  const fechas = textos.paginas.explorar.filtros.fecha;
  const opcionesFecha = [
    { valor: "hoy", texto: fechas.hoy },
    { valor: "finde", texto: fechas.finDeSemana },
    { valor: "mes", texto: fechas.mes },
  ];
  // "Populares" son las categorías con más eventos según la API.
  const populares = categorias.ok ? categorias.datos.datos.toSorted((a, b) => b.eventos - a.eventos).slice(0, 4) : [];
  const cargando = textos.estados.cargando.titulo;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero" data-hero aria-labelledby="hero-titulo">
        <div className="contenedor hero-contenido">
          <div className="hero-texto">
            <Etiqueta tono="clara" className="hero-etiqueta solo-escritorio">
              {t.hero.etiquetas.temporada}
            </Etiqueta>
            <h1 id="hero-titulo" className="hero-titulo">
              {t.hero.titulo}
            </h1>
            <p className="hero-subtitulo solo-escritorio">{t.hero.subtitulo}</p>

            <div className="solo-escritorio">
              <HeroBuscador ciudades={ciudadesBuscador} ciudad={ciudad} textos={t.hero.buscador} opcionesFecha={opcionesFecha} />
              {populares.length > 0 && (
                <p className="hero-populares">
                  <span>{t.hero.buscador.populares}</span>
                  {populares.map((c) => (
                    <Link key={c.id} href={urlExplorar({ categoria: c.id })}>
                      {nombreCategoria(textos, c.id)}
                    </Link>
                  ))}
                </p>
              )}
            </div>

            <BuscadorMovil ciudad={ciudad} textos={t.hero.buscador} />
          </div>

          <div className="hero-destacado solo-escritorio">
            <Suspense fallback={<div className="esqueleto hero-afiche" />}>
              <EventoPrincipal textos={textos} idioma={idioma} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ---------- Categorías ---------- */}
      <section className="contenedor seccion seccion-categorias" aria-label={textos.paginas.explorar.filtros.categoria}>
        {categorias.ok ? <Categorias categorias={categorias.datos.datos} textos={textos} /> : <ErrorSeccion textos={textos} error={categorias.error} />}
      </section>

      {/* ---------- Destacados ---------- */}
      <section className="contenedor seccion" aria-labelledby="destacados-titulo">
        <EncabezadoSeccion
          id="destacados-titulo"
          titulo={
            <>
              <span className="solo-escritorio">{t.destacados.titulo}</span>
              <span className="solo-movil">{t.filtrosMovil.destacados}</span>
            </>
          }
          subtitulo={t.destacados.subtitulo}
          enlace={{ href: urlExplorar({ orden: "popularidad" }), texto: t.destacados.enlaces.verTodos }}
        />
        <Suspense fallback={<TarjetasCargando etiqueta={cargando} />}>
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
          <Suspense key={ciudad} fallback={<TarjetasCargando etiqueta={cargando} />}>
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
        <Suspense fallback={<TarjetasCargando cantidad={3} etiqueta={cargando} />}>
          <FinDeSemana textos={textos} idioma={idioma} />
        </Suspense>
      </section>
    </>
  );
}
