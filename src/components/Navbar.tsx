import Link from "next/link";
import type { Usuario } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt, type Idioma } from "@/lib/formato";
import { cerrarSesion } from "@/app/acciones";
import Accesibilidad from "./Accesibilidad";
import EnlaceNav from "./EnlaceNav";
import Icono from "./Icono";
import Logo from "./Logo";
import MenuMovil from "./MenuMovil";
import SelectorIdioma from "./SelectorIdioma";

interface Props {
  textos: Textos;
  idioma: Idioma;
  usuario: Usuario | null;
}

export default function Navbar({ textos, idioma, usuario }: Props) {
  const nav = textos.navbar;
  const movil = textos.menuMovil;
  const idiomaProps = {
    idioma,
    etiqueta: nav.aria.idioma,
    nombres: { es: textos.idioma.es, en: textos.idioma.en },
    codigos: { es: textos.idioma.codigoEs, en: textos.idioma.codigoEn },
  };
  const accesibilidadProps = {
    textos: textos.accesibilidad,
    etiquetaBoton: nav.aria.accesibilidad,
    cerrar: textos.general.aria.cerrarDialogo,
  };

  return (
    <header className="navbar">
      <div className="navbar__contenido contenedor">
        <div className="navbar__izquierda">
          <Logo texto={nav.logo.texto} aria={nav.logo.aria} />
          <nav aria-label={nav.logo.texto} className="solo-escritorio">
            <ul className="navbar__enlaces">
              <li>
                <EnlaceNav href="/">{nav.enlaces.inicio}</EnlaceNav>
              </li>
              <li>
                <EnlaceNav href="/explorar">{nav.enlaces.explorar}</EnlaceNav>
              </li>
            </ul>
          </nav>
        </div>

        <div className="navbar__derecha">
          <form action="/explorar" role="search" className="buscador-nav solo-escritorio">
            <Icono nombre="search" tamano={14} />
            <input type="search" name="q" placeholder={nav.buscador.placeholder} aria-label={nav.buscador.aria} maxLength={80} />
          </form>

          <div className="solo-escritorio navbar__acciones">
            <Accesibilidad {...accesibilidadProps} />
            <SelectorIdioma {...idiomaProps} />
          </div>

          {usuario ? (
            <details className="menu-usuario">
              <summary aria-label={fmt(nav.usuario.menu, { nombre: usuario.nombre })}>
                <span className="menu-usuario__avatar" aria-hidden="true">
                  {usuario.nombre.charAt(0)}
                </span>
                <span className="solo-escritorio">{usuario.nombre.split(" ")[0]}</span>
                <Icono nombre="chevd" tamano={14} />
              </summary>
              <div className="menu-usuario__lista">
                <form action={cerrarSesion}>
                  <button type="submit" className="menu-usuario__opcion">
                    <Icono nombre="arrowl" tamano={14} />
                    {nav.usuario.cerrarSesion}
                  </button>
                </form>
              </div>
            </details>
          ) : (
            <>
              <Link href="/explorar" className="boton-icono boton-icono--plano solo-movil" aria-label={nav.buscador.aria}>
                <Icono nombre="search" tamano={18} />
              </Link>
              <Link href="/ingresar" className="boton boton--secundario boton--pequeno navbar__ingresar">
                {nav.botones.ingresar}
              </Link>
              <Link href="/registro" className="boton boton--primario boton--pequeno solo-escritorio">
                {nav.botones.crearCuenta}
              </Link>
            </>
          )}

          <MenuMovil abrir={movil.abrir} cerrar={movil.cerrar} cabecera={<Logo texto={nav.logo.texto} aria={nav.logo.aria} />}>
            <nav aria-label={nav.logo.texto}>
              <ul className="menu-movil__enlaces">
                <li>
                  <EnlaceNav href="/">{movil.enlaces.inicio}</EnlaceNav>
                </li>
                <li>
                  <EnlaceNav href="/explorar">{movil.enlaces.explorar}</EnlaceNav>
                </li>
              </ul>
            </nav>
            <div className="menu-movil__pie">
              <div className="menu-movil__fila">
                <span>{movil.secciones.idioma}</span>
                <SelectorIdioma {...idiomaProps} />
              </div>
              <div className="menu-movil__fila">
                <span>{movil.secciones.accesibilidad}</span>
                <Accesibilidad {...accesibilidadProps} />
              </div>
              {usuario ? (
                <form action={cerrarSesion}>
                  <button type="submit" className="boton boton--secundario boton--bloque">
                    {movil.botones.cerrarSesion}
                  </button>
                </form>
              ) : (
                <>
                  <Link href="/ingresar" className="boton boton--primario boton--bloque">
                    {movil.botones.ingresar}
                  </Link>
                  <Link href="/registro" className="boton boton--secundario boton--bloque">
                    {movil.botones.crearCuenta}
                  </Link>
                </>
              )}
            </div>
          </MenuMovil>
        </div>
      </div>
    </header>
  );
}
