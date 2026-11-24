import Link from "next/link";
import type { Textos } from "@/lib/textos";
import { urlExplorar, type Filtros } from "@/lib/filtros";
import { formatoPrecio, type Idioma } from "@/lib/formato";
import Icono from "@/components/compartidos/Icono";
import { nombreCategoria } from "@/components/compartidos/TarjetaEvento";

interface Props {
  filtros: Filtros;
  textos: Textos;
  idioma: Idioma;
}

interface Chip {
  clave: keyof Filtros;
  texto: string;
  quitar: Partial<Filtros>;
}

/** Arma un chip por cada filtro aplicado; al tocarlo se quita ese filtro. */
function chipsDe(filtros: Filtros, textos: Textos, idioma: Idioma): Chip[] {
  const f = textos.paginas.explorar.filtros;
  const fechas = { hoy: f.fecha.hoy, finde: f.fecha.finDeSemana, mes: f.fecha.mes, rango: f.fecha.elegir };
  const posibles: (Chip | false | undefined)[] = [
    !!filtros.q && { clave: "q", texto: `“${filtros.q}”`, quitar: { q: undefined } },
    !!filtros.categoria && { clave: "categoria", texto: nombreCategoria(textos, filtros.categoria), quitar: { categoria: undefined } },
    !!filtros.fecha && { clave: "fecha", texto: fechas[filtros.fecha], quitar: { fecha: undefined } },
    !!filtros.ciudad && { clave: "ciudad", texto: filtros.ciudad, quitar: { ciudad: undefined } },
    !!filtros.precioMax && { clave: "precioMax", texto: `≤ ${formatoPrecio(filtros.precioMax, idioma)}`, quitar: { precioMax: undefined } },
  ];
  return posibles.filter((c): c is Chip => Boolean(c));
}

/** Chips de los filtros aplicados en Explorar, encima de los resultados. */
export default function FiltrosActivos({ filtros, textos, idioma }: Props) {
  const chips = chipsDe(filtros, textos, idioma);
  // Sin filtros se deja un bloque vacío para que el selector de orden siga a la derecha.
  if (chips.length === 0) return <div />;

  return (
    <ul className="chips chips-activos">
      {chips.map((chip) => (
        <li key={chip.clave}>
          <Link
            href={urlExplorar({ ...filtros, ...chip.quitar, pagina: undefined })}
            className="chip chip-quitar"
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
