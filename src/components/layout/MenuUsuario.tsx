import type { Usuario } from "@/lib/api";
import { fmt } from "@/lib/formato";
import { cerrarSesion } from "@/app/acciones";
import Icono from "@/components/compartidos/Icono";

interface Props {
  usuario: Usuario;
  textos: { menu: string; cerrarSesion: string };
}

/** Menú de la cuenta en la barra (con sesión iniciada). */
export default function MenuUsuario({ usuario, textos }: Props) {
  return (
    <details className="menu-usuario">
      <summary aria-label={fmt(textos.menu, { nombre: usuario.nombre })}>
        <span className="menu-usuario-avatar" aria-hidden="true">
          {usuario.nombre.charAt(0)}
        </span>
        <span className="solo-escritorio">{usuario.nombre.split(" ")[0]}</span>
        <Icono nombre="chevd" tamano={14} />
      </summary>
      <div className="menu-usuario-lista">
        <form action={cerrarSesion}>
          <button type="submit" className="menu-usuario-opcion">
            <Icono nombre="arrowl" tamano={14} />
            {textos.cerrarSesion}
          </button>
        </form>
      </div>
    </details>
  );
}
