import type { Usuario } from "@/lib/api";
import { fmt } from "@/lib/formato";
import { cerrarSesion } from "@/app/acciones";
import Icono from "@/components/compartidos/Icono";

/** "Laura Castaño" → "LC": las iniciales de las dos primeras palabras del nombre. */
export const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

/** Avatar redondo con las iniciales (Figma: 40 px). */
export function Avatar({ nombre, oscuro = false }: { nombre: string; oscuro?: boolean }) {
  return (
    <span className={oscuro ? "avatar avatar-oscuro" : "avatar"} aria-hidden="true">
      {iniciales(nombre)}
    </span>
  );
}

/** Nombre y correo de la persona, uno debajo del otro. */
export function DatosPersona({ usuario }: { usuario: Usuario }) {
  return (
    <span className="persona">
      <span className="persona-nombre">{usuario.nombre}</span>
      <span className="persona-correo">{usuario.correo}</span>
    </span>
  );
}

interface Props {
  usuario: Usuario;
  textos: { menu: string; cerrarSesion: string };
}

/** Menú de la cuenta en la barra de escritorio (Figma "Menú de cuenta (abierto)"). */
export default function MenuUsuario({ usuario, textos }: Props) {
  return (
    <details className="menu-usuario solo-escritorio">
      <summary aria-label={fmt(textos.menu, { nombre: usuario.nombre })}>
        <Avatar nombre={usuario.nombre} />
      </summary>
      <div className="menu-usuario-lista">
        <div className="menu-usuario-persona">
          <Avatar nombre={usuario.nombre} oscuro />
          <DatosPersona usuario={usuario} />
        </div>
        <form action={cerrarSesion}>
          <button type="submit" className="menu-usuario-opcion">
            <Icono nombre="salir" tamano={18} />
            {textos.cerrarSesion}
          </button>
        </form>
      </div>
    </details>
  );
}
