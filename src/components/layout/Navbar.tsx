import Link from "next/link";
import type { Usuario } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import { fmt, type Idioma } from "@/lib/formato";
import { cerrarSesion } from "@/app/acciones";
import Accesibilidad from "./Accesibilidad";
import EnlaceNav from "./EnlaceNav";
import Icono from "@/components/compartidos/Icono";
import Logo from "./Logo";
import MenuMovil from "./MenuMovil";
import SelectorIdioma from "./SelectorIdioma";
import { RUTAS } from "@/lib/rutas";
import buscadores from "@/components/ui/Buscador.module.css";
import botones from "@/components/ui/Boton.module.css";
import estilos from "./Navbar.module.css";

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
    // data-navbar: marca para los estilos que cambian dentro de la barra (Logo, Boton, MenuMovil).
    <header className={estilos.navbar} data-navbar>
      <div className={`${estilos.navbarContenido} contenedor`}>
        <div className={estilos.navbarIzquierda}>
          <Logo texto={nav.logo.texto} aria={nav.logo.aria} />
          <nav aria-label={nav.logo.texto} className="solo-escritorio">
            <ul className={estilos.navbarEnlaces}>
              <li>
                <EnlaceNav href={RUTAS.inicio}>{nav.enlaces.inicio}</EnlaceNav>
              </li>
              <li>
                <EnlaceNav href={RUTAS.explorar}>{nav.enlaces.explorar}</EnlaceNav>
              </li>
            </ul>
          </nav>
        </div>

        <div className={estilos.navbarDerecha}>
          <form action={RUTAS.explorar} role="search" className={`${buscadores.buscadorNav} solo-escritorio`}>
            <Icono nombre="search" tamano={14} />
            <input type="search" name="q" placeholder={nav.buscador.placeholder} aria-label={nav.buscador.aria} maxLength={80} />
          </form>

          <div className={`solo-escritorio ${estilos.navbarAcciones}`}>
            <Accesibilidad {...accesibilidadProps} />
            <SelectorIdioma {...idiomaProps} />
          </div>

          {usuario ? (
            <details className={estilos.menuUsuario}>
              <summary aria-label={fmt(nav.usuario.menu, { nombre: usuario.nombre })}>
                <span className={estilos.menuUsuarioAvatar} aria-hidden="true">
                  {usuario.nombre.charAt(0)}
                </span>
                <span className="solo-escritorio">{usuario.nombre.split(" ")[0]}</span>
                <Icono nombre="chevd" tamano={14} />
              </summary>
              <div className={estilos.menuUsuarioLista}>
                <form action={cerrarSesion}>
                  <button type="submit" className={estilos.menuUsuarioOpcion}>
                    <Icono nombre="arrowl" tamano={14} />
                    {nav.usuario.cerrarSesion}
                  </button>
                </form>
              </div>
            </details>
          ) : (
            <>
              <Link href={RUTAS.explorar} className={`${botones.botonIcono} ${botones.botonIconoPlano} solo-movil`} aria-label={nav.buscador.aria}>
                <Icono nombre="search" tamano={18} />
              </Link>
              <Link href={RUTAS.ingresar} className={`${botones.boton} ${botones.botonSecundario} ${botones.botonPequeno} ${estilos.navbarIngresar}`}>
                {nav.botones.ingresar}
              </Link>
              <Link href={RUTAS.registro} className={`${botones.boton} ${botones.botonPrimario} ${botones.botonPequeno} solo-escritorio`}>
                {nav.botones.crearCuenta}
              </Link>
            </>
          )}

          <MenuMovil abrir={movil.abrir} cerrar={movil.cerrar} cabecera={<Logo texto={nav.logo.texto} aria={nav.logo.aria} />}>
            <nav aria-label={nav.logo.texto}>
              <ul className={estilos.menuMovilEnlaces}>
                <li>
                  <EnlaceNav href={RUTAS.inicio}>{movil.enlaces.inicio}</EnlaceNav>
                </li>
                <li>
                  <EnlaceNav href={RUTAS.explorar}>{movil.enlaces.explorar}</EnlaceNav>
                </li>
              </ul>
            </nav>
            <div className={estilos.menuMovilPie}>
              <div className={estilos.menuMovilFila}>
                <span>{movil.secciones.idioma}</span>
                <SelectorIdioma {...idiomaProps} />
              </div>
              <div className={estilos.menuMovilFila}>
                <span>{movil.secciones.accesibilidad}</span>
                <Accesibilidad {...accesibilidadProps} />
              </div>
              {usuario ? (
                <form action={cerrarSesion}>
                  <button type="submit" className={`${botones.boton} ${botones.botonSecundario} ${botones.botonBloque}`}>
                    {movil.botones.cerrarSesion}
                  </button>
                </form>
              ) : (
                <>
                  <Link href={RUTAS.ingresar} className={`${botones.boton} ${botones.botonPrimario} ${botones.botonBloque}`}>
                    {movil.botones.ingresar}
                  </Link>
                  <Link href={RUTAS.registro} className={`${botones.boton} ${botones.botonSecundario} ${botones.botonBloque}`}>
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
