"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { urlExplorar, type Fecha, type Filtros } from "@/lib/filtros";
import { fmt, formatoPrecio } from "@/lib/formato";
import Icono from "../Icono";

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
  precio: { minimo: number; maximo: number };
  textos: TextosFiltros;
}

// Panel de filtros. En escritorio es la columna izquierda; en el móvil se abre a pantalla completa.
// Cada cambio actualiza la URL al instante y el servidor vuelve a pedir los eventos.
export default function PanelFiltros({ filtros, total, categorias, ciudades, precio, textos }: Props) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  const [abierto, setAbierto] = useState(false);
  const [precioMax, setPrecioMax] = useState(filtros.precioMax ?? precio.maximo);
  const [precioPrevio, setPrecioPrevio] = useState(filtros.precioMax);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const id = useId();

  // Si el precio cambia desde fuera (por ejemplo con "Limpiar"), el control lo refleja.
  if (precioPrevio !== filtros.precioMax) {
    setPrecioPrevio(filtros.precioMax);
    setPrecioMax(filtros.precioMax ?? precio.maximo);
  }

  const aplicar = (cambios: Partial<Filtros>) =>
    iniciar(() => router.push(urlExplorar({ ...filtros, ...cambios, pagina: undefined }), { scroll: false }));

  // El precio se aplica cuando la persona deja de moverlo.
  useEffect(() => {
    const valor = precioMax >= precio.maximo ? undefined : precioMax;
    if (valor === filtros.precioMax) return;
    const espera = setTimeout(() => aplicar({ precioMax: valor }), 400);
    return () => clearTimeout(espera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precioMax]);

  useEffect(() => {
    if (!abierto) return;
    panel.current?.focus();
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("keydown", alPulsar);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", alPulsar);
    };
  }, [abierto]);

  const cerrar = () => {
    setAbierto(false);
    boton.current?.focus();
  };

  const opcionesFecha: { valor: Fecha; texto: string }[] = [
    { valor: "hoy", texto: textos.fecha.hoy },
    { valor: "finde", texto: textos.fecha.finDeSemana },
    { valor: "mes", texto: textos.fecha.mes },
    { valor: "rango", texto: textos.fecha.elegir },
  ];

  return (
    <>
      <button
        ref={boton}
        type="button"
        className="boton-icono boton-icono--oscuro solo-movil filtros-abrir"
        aria-label={textos.titulo}
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto(true)}
      >
        <Icono nombre="sliders" tamano={16} />
      </button>

      <aside
        ref={panel}
        id={id}
        className={`filtros${abierto ? " filtros--abierto" : ""}`}
        aria-labelledby={`${id}-titulo`}
        aria-busy={pendiente}
        tabIndex={-1}
        {...(abierto ? { role: "dialog", "aria-modal": true } : {})}
      >
        <div className="filtros__cabecera">
          <h2 id={`${id}-titulo`} className="titular-h4">
            {textos.titulo}
          </h2>
          <button type="button" className="enlace-boton" onClick={() => iniciar(() => router.push("/eventos", { scroll: false }))}>
            {textos.botones.limpiar}
          </button>
          <button type="button" className="boton-icono boton-icono--plano solo-movil" aria-label={textos.cerrar} onClick={cerrar}>
            <Icono nombre="x" tamano={18} />
          </button>
        </div>

        <fieldset className="filtros__grupo">
          <legend>{textos.categoria}</legend>
          <ul className="filtros__categorias">
            {categorias.map((c) => {
              const activa = filtros.categoria === c.id;
              return (
                <li key={c.id}>
                  <label className="casilla">
                    <input
                      type="checkbox"
                      checked={activa}
                      onChange={() => aplicar({ categoria: activa ? undefined : c.id })}
                    />
                    <span className="casilla__caja" aria-hidden="true">
                      <Icono nombre="check" tamano={12} />
                    </span>
                    <span className="casilla__texto">{c.nombre}</span>
                    <span className="casilla__cantidad">{c.eventos}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <fieldset className="filtros__grupo">
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
            <div className="filtros__rango">
              <label>
                <span>{textos.desde}</span>
                <input type="date" className="campo" defaultValue={filtros.desde} onChange={(e) => aplicar({ desde: e.target.value || undefined })} />
              </label>
              <label>
                <span>{textos.hasta}</span>
                <input
                  type="date"
                  className="campo"
                  defaultValue={filtros.hasta}
                  min={filtros.desde}
                  onChange={(e) => aplicar({ hasta: e.target.value || undefined })}
                />
              </label>
            </div>
          )}
        </fieldset>

        <div className="filtros__grupo">
          <label htmlFor={`${id}-ciudad`} className="filtros__leyenda">
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

        <div className="filtros__grupo">
          <label htmlFor={`${id}-precio`} className="filtros__leyenda">
            {textos.precio}
          </label>
          <input
            id={`${id}-precio`}
            type="range"
            className="deslizador"
            min={precio.minimo}
            max={precio.maximo}
            step={5000}
            value={precioMax}
            aria-valuetext={formatoPrecio(precioMax)}
            onChange={(e) => setPrecioMax(Number(e.target.value))}
          />
          <div className="filtros__precios">
            <span>{formatoPrecio(precio.minimo)}</span>
            <span>{formatoPrecio(precioMax)}</span>
          </div>
        </div>

        <div className="filtros__pie solo-movil">
          <button type="button" className="boton boton--primario boton--bloque" onClick={cerrar} disabled={pendiente}>
            {fmt(textos.botones.verResultados, { cantidad: total })}
          </button>
        </div>
      </aside>
    </>
  );
}
