"use client";

import { useId, useTransition } from "react";
import { useRouter } from "next/navigation";
import { urlExplorar, type Fecha, type Filtros, type RangoPrecios } from "@/lib/filtros";
import { fmt, type Idioma } from "@/lib/formato";
import FiltroPrecio from "./FiltroPrecio";
import { RUTAS } from "@/lib/rutas";
import { useDialogo } from "@/hooks/useDialogo";
import Icono from "@/components/compartidos/Icono";
import Boton, { unirClases } from "@/components/ui/Boton";
import BotonIcono from "@/components/ui/BotonIcono";

export interface TextosFiltros {
  titulo: string;
  categoria: string;
  fecha: { titulo: string; hoy: string; finDeSemana: string; mes: string; elegir: string };
  ciudad: string;
  precio: string;
  botones: { limpiar: string; verResultados: string };
  todasLasCiudades: string;
  desde: string;
  hasta: string;
  cerrar: string;
  resultados: { uno: string; otro: string };
}

interface Props {
  filtros: Filtros;
  total: number;
  categorias: { id: string; nombre: string; eventos: number }[];
  ciudades: { nombre: string; eventos: number }[];
  /** Extremos del control de precio calculados con los eventos de la API; null si no se pudieron pedir. */
  precio: RangoPrecios | null;
  textos: TextosFiltros;
  idioma: Idioma;
}

// Panel de filtros. En escritorio es la columna izquierda; en el móvil se abre a pantalla completa.
// Cada cambio actualiza la URL al instante y el servidor vuelve a pedir los eventos.
export default function PanelFiltros({ filtros, total, categorias, ciudades, precio, textos, idioma }: Props) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  const { abierto, abrir, cerrar, boton, panel } = useDialogo<HTMLElement>({ bloquearScroll: true });
  const id = useId();

  const aplicar = (cambios: Partial<Filtros>) =>
    iniciar(() => router.push(urlExplorar({ ...filtros, ...cambios, pagina: undefined }), { scroll: false }));

  const opcionesFecha: { valor: Fecha; texto: string }[] = [
    { valor: "hoy", texto: textos.fecha.hoy },
    { valor: "finde", texto: textos.fecha.finDeSemana },
    { valor: "mes", texto: textos.fecha.mes },
    { valor: "rango", texto: textos.fecha.elegir },
  ];

  return (
    <>
      <BotonIcono
        ref={boton}
        icono="sliders"
        variante="oscuro"
        className="solo-movil filtros-abrir"
        etiqueta={textos.titulo}
        aria-expanded={abierto}
        aria-controls={id}
        onClick={abrir}
      />

      <aside
        ref={panel}
        id={id}
        className={unirClases("filtros", abierto && "filtros-abierto")}
        aria-labelledby={`${id}-titulo`}
        aria-busy={pendiente}
        tabIndex={-1}
        {...(abierto ? { role: "dialog", "aria-modal": true } : {})}
      >
        <div className="filtros-cabecera">
          <h2 id={`${id}-titulo`} className="titular-h3">
            {textos.titulo}
          </h2>
          <button type="button" className="enlace-boton" onClick={() => iniciar(() => router.push(RUTAS.explorar, { scroll: false }))}>
            {textos.botones.limpiar}
          </button>
          <BotonIcono icono="x" tamanoIcono={18} variante="plano" className="solo-movil" etiqueta={textos.cerrar} onClick={cerrar} />
        </div>

        <fieldset className="filtros-grupo">
          <legend>{textos.categoria}</legend>
          <ul className="filtros-categorias">
            {categorias.map((c) => {
              const activa = filtros.categoria === c.id;
              return (
                <li key={c.id}>
                  <label className="casilla filtros-casilla">
                    <input
                      type="checkbox"
                      checked={activa}
                      onChange={() => aplicar({ categoria: activa ? undefined : c.id })}
                    />
                    <span className="casilla-caja filtros-casilla-caja" aria-hidden="true">
                      <Icono nombre="check" tamano={12} />
                    </span>
                    <span className="casilla-texto">{c.nombre}</span>
                    <span className="casilla-cantidad filtros-casilla-cantidad">{c.eventos}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset className="filtros-grupo">
          <legend>{textos.fecha.titulo}</legend>
          <div className="pastillas">
            {opcionesFecha.map((o) => {
              const activa = filtros.fecha === o.valor;
              return (
                <button
                  key={o.valor}
                  type="button"
                  className="pastilla"
                  aria-pressed={activa}
                  onClick={() => aplicar({ fecha: activa ? undefined : o.valor })}
                >
                  {o.texto}
                </button>
              );
            })}
          </div>
          {filtros.fecha === "rango" && (
            <div className="filtros-rango">
              <label>
                <span>{textos.desde}</span>
                <input type="date" className="campo filtros-rango-campo" defaultValue={filtros.desde} onChange={(e) => aplicar({ desde: e.target.value || undefined })} />
              </label>
              <label>
                <span>{textos.hasta}</span>
                <input
                  type="date"
                  className="campo filtros-rango-campo"
                  defaultValue={filtros.hasta}
                  min={filtros.desde}
                  onChange={(e) => aplicar({ hasta: e.target.value || undefined })}
                />
              </label>
            </div>
          )}
        </fieldset>

        <div className="filtros-grupo">
          <label htmlFor={`${id}-ciudad`} className="filtros-leyenda">
            {textos.ciudad}
          </label>
          <div className="selector">
            <select id={`${id}-ciudad`} className="campo" value={filtros.ciudad ?? ""} onChange={(e) => aplicar({ ciudad: e.target.value || undefined })}>
              <option value="">{textos.todasLasCiudades}</option>
              {ciudades.map((c) => (
                <option key={c.nombre} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <Icono nombre="chevd" tamano={14} />
          </div>
        </div>

        {/* Sin rango (la API no respondió) no se muestra el filtro en vez de inventar extremos. */}
        {precio && (
          <FiltroPrecio
            rango={precio}
            aplicado={filtros.precioMax}
            alAplicar={(precioMax) => aplicar({ precioMax })}
            etiqueta={textos.precio}
            idioma={idioma}
          />
        )}

        <div className="filtros-pie solo-movil">
          <Boton bloque onClick={cerrar} disabled={pendiente}>
            {fmt(textos.botones.verResultados, { cantidad: total })}
          </Boton>
        </div>
      </aside>
    </>
  );
}
