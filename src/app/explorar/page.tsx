import type { Metadata } from "next";
import { getCategorias, getCiudades, getEventos } from "@/lib/api";
import { getIdioma, getTextos } from "@/lib/textos";
import { hayFiltros, leerFiltros, parametrosApi, rangoDePrecios, urlExplorar } from "@/lib/filtros";
import { plural } from "@/lib/formato";
import { intentar } from "@/lib/intentar";
import { RUTAS } from "@/lib/rutas";
import Icono from "@/components/compartidos/Icono";
import { nombreCategoria } from "@/components/compartidos/TarjetaEvento";
import ErrorSeccion from "@/components/compartidos/ErrorSeccion";
import { Estado, EnlaceBoton } from "@/components/compartidos/Estados";
import Migas from "@/components/compartidos/Migas";
import Paginacion from "@/components/compartidos/Paginacion";
import RejillaEventos from "@/components/compartidos/RejillaEventos";
import FiltrosActivos from "@/components/explorar/FiltrosActivos";
import PanelFiltros from "@/components/explorar/PanelFiltros";
import SelectorOrden from "@/components/explorar/SelectorOrden";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = (await getTextos()).paginas.explorar;
  return { title: seo.titulo, description: seo.descripcion };
}

/** Precio más bajo y más alto del catálogo, para los extremos del control de precio. */
async function getRangoPrecios() {
  try {
    const todos = await getEventos({ porPagina: 100 }, 300);
    return rangoDePrecios(todos.datos.map((e) => e.precioDesde));
  } catch (error) {
    console.error("[explorar] No se pudo calcular el rango de precios:", error);
    return null;
  }
}

export default async function Explorar({ searchParams }: PageProps<"/explorar">) {
  const filtros = leerFiltros(await searchParams);
  const [textos, idioma, categorias, ciudades, precio, resultado] = await Promise.all([
    getTextos(),
    getIdioma(),
    getCategorias().catch(() => null),
    getCiudades().catch(() => null),
    getRangoPrecios(),
    intentar(getEventos(parametrosApi(filtros))),
  ]);

  const t = textos.paginas.explorar;
  const titulo = textos.footer.columnas.explora.enlaces.explorar;
  const total = resultado.ok ? resultado.datos.paginacion.total : 0;
  // "Del {inicio} al {fin}" se parte para nombrar los dos campos del rango de fechas.
  const [antes = "", resto = ""] = textos.paginas.conciertos.semana.rango.split("{inicio}");
  const entre = resto.split("{fin}")[0];

  return (
    <div className="contenedor explorar">
      <Migas
        etiqueta={textos.componentes.migas.explorar}
        className="solo-escritorio"
        pasos={[{ texto: textos.componentes.migas.inicio, href: RUTAS.inicio }, { texto: textos.componentes.migas.explorar }]}
      />

      <header className="explorar-cabecera">
        <h1 className="titular-h1">{titulo}</h1>
        {resultado.ok && (
          <p className="explorar-total solo-escritorio" aria-live="polite">
            {plural(t.resultados, total)}
          </p>
        )}
      </header>

      <div className="explorar-buscador solo-movil">
        <form action={RUTAS.explorar} role="search" className="buscador-nav buscador-nav-movil">
          <Icono nombre="search" tamano={14} />
          <input type="search" name="q" defaultValue={filtros.q} placeholder={textos.paginas.inicio.hero.buscador.placeholders.movil} aria-label={textos.navbar.buscador.aria} maxLength={80} />
          {filtros.categoria && <input type="hidden" name="categoria" value={filtros.categoria} />}
          {filtros.ciudad && <input type="hidden" name="ciudad" value={filtros.ciudad} />}
        </form>
      </div>

      <div className="explorar-cuerpo">
        <PanelFiltros
          filtros={filtros}
          total={total}
          categorias={(categorias?.datos ?? []).map((c) => ({ id: c.id, nombre: nombreCategoria(textos, c.id), eventos: c.eventos }))}
          ciudades={ciudades?.datos ?? []}
          precio={precio}
          idioma={idioma}
          textos={{
            ...t.filtros,
            todasLasCiudades: textos.paginas.teatro.filtros.etiquetas.todas,
            desde: antes.trim(),
            hasta: entre.trim(),
            cerrar: textos.general.acciones.cerrar,
            resultados: t.resultadosCorto,
          }}
        />

        <section aria-label={titulo}>
          <div className="explorar-barra">
            <FiltrosActivos filtros={filtros} textos={textos} idioma={idioma} />
            <div className="explorar-barra-derecha">
              {resultado.ok && <span className="explorar-total-corto solo-movil">{plural(t.resultadosCorto, total)}</span>}
              <SelectorOrden filtros={filtros} etiqueta={t.orden.etiqueta} opciones={t.orden.opciones} />
            </div>
          </div>

          {!resultado.ok ? (
            <ErrorSeccion textos={textos} error={resultado.error} />
          ) : resultado.datos.datos.length === 0 ? (
            <Estado
              icono="search"
              titulo={t.vacio.titulo}
              texto={t.vacio.texto}
              accion={hayFiltros(filtros) ? <EnlaceBoton href={RUTAS.explorar}>{t.vacio.botones.limpiar}</EnlaceBoton> : undefined}
            />
          ) : (
            <>
              <RejillaEventos eventos={resultado.datos.datos} textos={textos} idioma={idioma} tresColumnas nivelTitulo="h2" />
              <Paginacion
                actual={filtros.pagina ?? 1}
                paginas={resultado.datos.paginacion.paginas}
                url={(pagina) => urlExplorar({ ...filtros, pagina })}
                textos={textos.componentes.paginacion.aria}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
