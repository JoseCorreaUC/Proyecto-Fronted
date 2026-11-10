import Link from "next/link";
import type { Metadata } from "next";
import { api, getCategorias, getCiudades, getEventos, type EventoResumen, type ListaPaginada } from "@/lib/api";
import { getIdioma, getTextos, type Textos } from "@/lib/textos";
import { hayFiltros, leerFiltros, parametrosApi, urlExplorar, type Filtros } from "@/lib/filtros";
import { fmt, formatoPrecio, plural } from "@/lib/formato";
import Icono from "@/components/Icono";
import TarjetaEvento, { nombreCategoria } from "@/components/TarjetaEvento";
import ErrorSeccion from "@/components/ErrorSeccion";
import { Estado, EnlaceBoton } from "@/components/Estados";
import PanelFiltros from "@/components/explorar/PanelFiltros";
import SelectorOrden from "@/components/explorar/SelectorOrden";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = (await getTextos()).paginas.explorar;
  return { title: seo.titulo, description: seo.descripcion };
}

/** Precio más bajo y más alto del catálogo, para los extremos del control de precio. */
async function getRangoPrecios() {
  try {
    const todos = await api<ListaPaginada<EventoResumen>>("/eventos", { parametros: { porPagina: 100 }, revalidar: 300 });
    const precios = todos.datos.map((e) => e.precioDesde);
    return {
      minimo: Math.floor(Math.min(...precios) / 10000) * 10000,
      maximo: Math.ceil(Math.max(...precios) / 10000) * 10000,
    };
  } catch {
    return { minimo: 0, maximo: 200000 };
  }
}

export default async function Explorar({ searchParams }: PageProps<"/eventos">) {
  const filtros = leerFiltros(await searchParams);
  const [textos, idioma, categorias, ciudades, precio] = await Promise.all([
    getTextos(),
    getIdioma(),
    getCategorias().catch(() => null),
    getCiudades().catch(() => null),
    getRangoPrecios(),
  ]);
  const resultado = await getEventos(parametrosApi(filtros)).then(
    (r) => ({ ok: true as const, ...r }),
    (error: unknown) => ({ ok: false as const, error }),
  );

  const t = textos.paginas.explorar;
  const total = resultado.ok ? resultado.paginacion.total : 0;
  // "Del {inicio} al {fin}" se parte para nombrar los dos campos del rango de fechas.
  const [antes = "", resto = ""] = textos.paginas.conciertos.semana.rango.split("{inicio}");
  const entre = resto.split("{fin}")[0];

  return (
    <div className="contenedor explorar">
      <nav aria-label={textos.componentes.migas.explorar} className="migas solo-escritorio">
        <ol>
          <li>
            <Link href="/">{textos.componentes.migas.inicio}</Link>
          </li>
          <li aria-current="page">{textos.componentes.migas.explorar}</li>
        </ol>
      </nav>

      <header className="explorar__cabecera">
        <h1 className="titular-h1">{textos.footer.columnas.explora.enlaces.explorar}</h1>
        {resultado.ok && (
          <p className="explorar__total solo-escritorio" aria-live="polite">
            {plural(t.resultados, total)}
          </p>
        )}
      </header>

      <div className="explorar__buscador solo-movil">
        <form action="/eventos" role="search" className="buscador-nav buscador-nav--movil">
          <Icono nombre="search" tamano={14} />
          <input type="search" name="q" defaultValue={filtros.q} placeholder={textos.paginas.inicio.hero.buscador.placeholders.movil} aria-label={textos.navbar.buscador.aria} maxLength={80} />
          {filtros.categoria && <input type="hidden" name="categoria" value={filtros.categoria} />}
          {filtros.ciudad && <input type="hidden" name="ciudad" value={filtros.ciudad} />}
        </form>
      </div>

      <div className="explorar__cuerpo">
        <PanelFiltros
          filtros={filtros}
          total={total}
          categorias={(categorias?.datos ?? []).map((c) => ({ id: c.id, nombre: nombreCategoria(textos, c.id), eventos: c.eventos }))}
          ciudades={ciudades?.datos ?? []}
          precio={precio}
          textos={{
            ...t.filtros,
            todasLasCiudades: textos.paginas.teatro.filtros.etiquetas.todas,
            desde: antes.trim(),
            hasta: entre.trim(),
            cerrar: textos.general.acciones.cerrar,
            resultados: t.resultadosCorto,
          }}
        />

        <section className="explorar__resultados" aria-label={textos.footer.columnas.explora.enlaces.explorar}>
          <div className="explorar__barra">
            <FiltrosActivos filtros={filtros} textos={textos} />
            <div className="explorar__barra-derecha">
              {resultado.ok && <span className="explorar__total-corto solo-movil">{plural(t.resultadosCorto, total)}</span>}
              <SelectorOrden filtros={filtros} etiqueta={t.orden.etiqueta} opciones={t.orden.opciones} />
            </div>
          </div>

          {!resultado.ok ? (
            <ErrorSeccion textos={textos} error={resultado.error} />
          ) : resultado.datos.length === 0 ? (
            <Estado
              icono="search"
              titulo={t.vacio.titulo}
              texto={t.vacio.texto}
              accion={hayFiltros(filtros) ? <EnlaceBoton href="/eventos">{t.vacio.botones.limpiar}</EnlaceBoton> : undefined}
            />
          ) : (
            <>
              <ul className="rejilla-eventos rejilla-eventos--tres">
                {resultado.datos.map((evento) => (
                  <li key={evento.id}>
                    <TarjetaEvento evento={evento} textos={textos} idioma={idioma} nivelTitulo="h2" />
                  </li>
                ))}
              </ul>
              <Paginacion filtros={filtros} paginas={resultado.paginacion.paginas} textos={textos} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function FiltrosActivos({ filtros, textos }: { filtros: Filtros; textos: Textos }) {
  const f = textos.paginas.explorar.filtros;
  const fechas = { hoy: f.fecha.hoy, finde: f.fecha.finDeSemana, mes: f.fecha.mes, rango: f.fecha.elegir };
  const chips: { clave: keyof Filtros; texto: string; quitar: Partial<Filtros> }[] = [];
  if (filtros.q) chips.push({ clave: "q", texto: `“${filtros.q}”`, quitar: { q: undefined } });
  if (filtros.categoria) chips.push({ clave: "categoria", texto: nombreCategoria(textos, filtros.categoria), quitar: { categoria: undefined } });
  if (filtros.fecha) chips.push({ clave: "fecha", texto: fechas[filtros.fecha], quitar: { fecha: undefined } });
  if (filtros.ciudad) chips.push({ clave: "ciudad", texto: filtros.ciudad, quitar: { ciudad: undefined } });
  if (filtros.precioMax) chips.push({ clave: "precioMax", texto: `≤ ${formatoPrecio(filtros.precioMax)}`, quitar: { precioMax: undefined } });
  if (chips.length === 0) return <div />;

  return (
    <ul className="chips chips--activos">
      {chips.map((chip) => (
        <li key={chip.clave}>
          <Link
            href={urlExplorar({ ...filtros, ...chip.quitar, pagina: undefined })}
            className="chip chip--quitar"
            scroll={false}
            aria-label={`${textos.general.acciones.eliminar}: ${chip.texto}`}
          >
            {chip.texto}
            <Icono nombre="x" tamano={12} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Paginacion({ filtros, paginas, textos }: { filtros: Filtros; paginas: number; textos: Textos }) {
  if (paginas <= 1) return null;
  const actual = Math.min(filtros.pagina ?? 1, paginas);
  const aria = textos.componentes.paginacion.aria;

  // 1 2 3 … 6: siempre la primera, la última y las vecinas de la actual.
  const numeros: (number | "…")[] = [];
  for (let n = 1; n <= paginas; n++) {
    if (n === 1 || n === paginas || Math.abs(n - actual) <= 1 || (actual <= 2 && n <= 3)) numeros.push(n);
    else if (numeros[numeros.length - 1] !== "…") numeros.push("…");
  }
  const url = (pagina: number) => urlExplorar({ ...filtros, pagina });

  return (
    <nav className="paginacion" aria-label={aria.etiqueta}>
      {actual > 1 ? (
        <Link href={url(actual - 1)} className="paginacion__boton" aria-label={aria.anterior}>
          <Icono nombre="chevl" tamano={14} />
        </Link>
      ) : (
        <span className="paginacion__boton" aria-disabled="true">
          <Icono nombre="chevl" tamano={14} />
        </span>
      )}
      <ol>
        {numeros.map((n, i) =>
          n === "…" ? (
            <li key={`p${i}`} aria-hidden="true" className="paginacion__puntos">
              …
            </li>
          ) : (
            <li key={n}>
              <Link
                href={url(n)}
                className="paginacion__boton"
                aria-current={n === actual ? "page" : undefined}
                aria-label={fmt(n === actual ? aria.paginaActual : aria.irAPagina, { numero: n })}
              >
                {n}
              </Link>
            </li>
          ),
        )}
      </ol>
      {actual < paginas ? (
        <Link href={url(actual + 1)} className="paginacion__boton" aria-label={aria.siguiente}>
          <Icono nombre="chevr" tamano={14} />
        </Link>
      ) : (
        <span className="paginacion__boton" aria-disabled="true">
          <Icono nombre="chevr" tamano={14} />
        </span>
      )}
    </nav>
  );
}
