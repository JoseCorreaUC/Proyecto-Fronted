import Link from "next/link";
import type { Categoria } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { plural } from "@/lib/formato";
import { urlExplorar } from "@/lib/filtros";
import { RUTAS } from "@/lib/rutas";
import Icono from "@/components/compartidos/Icono";
import type { NombreIcono } from "@/components/compartidos/iconos";
import { nombreCategoria } from "@/components/compartidos/TarjetaEvento";

// GET /categorias no trae icono, así que el dibujo de cada categoría se elige aquí.
// Una categoría nueva de la API se muestra igual, con el icono de entrada.
const ICONO_CATEGORIA: Record<string, NombreIcono> = {
  conciertos: "music",
  teatro: "star",
  deportes: "trophy",
  festivales: "flag",
  comedia: "smile",
  familiares: "users",
};
const ICONO_PREDETERMINADO: NombreIcono = "ticket";

interface Props {
  categorias: Categoria[];
  textos: Textos;
}

/** Categorías del inicio: tarjetas en escritorio y chips con desplazamiento en el móvil. */
export default function Categorias({ categorias, textos }: Props) {
  const t = textos.paginas.inicio;
  return (
    <>
      <ul className="categorias solo-escritorio">
        {categorias.map((c) => (
          <li key={c.id}>
            <Link href={urlExplorar({ categoria: c.id })} className="categoria">
              <span className="categoria-icono">
                <Icono nombre={ICONO_CATEGORIA[c.id] ?? ICONO_PREDETERMINADO} tamano={20} />
              </span>
              <span>
                <span className="categoria-nombre">{nombreCategoria(textos, c.id)}</span>
                <span className="categoria-cantidad">{plural(t.categorias.eventos, c.eventos)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="chips solo-movil">
        <li>
          <Link href={RUTAS.explorar} className="chip chip-activo">
            {t.filtrosMovil.todos}
          </Link>
        </li>
        {categorias.map((c) => (
          <li key={c.id}>
            <Link href={urlExplorar({ categoria: c.id })} className="chip">
              {nombreCategoria(textos, c.id)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
