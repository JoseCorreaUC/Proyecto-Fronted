import type { Usuario } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import type { Idioma } from "@/lib/formato";
import { cerrarSesion } from "@/app/acciones";
import { RUTAS } from "@/lib/rutas";
import Icono from "@/components/compartidos/Icono";
import Boton, { BotonEnlace } from "@/components/ui/Boton";
import { EnlaceIcono } from "@/components/ui/BotonIcono";
import Accesibilidad from "./Accesibilidad";
import EnlaceNav from "./EnlaceNav";
import Logo from "./Logo";
import MenuMovil from "./MenuMovil";
import MenuUsuario from "./MenuUsuario";
import SelectorIdioma from "./SelectorIdioma";

interface Props {
  textos: Textos;
  idioma: Idioma;
  /** Idiomas de GET /idiomas para el selector. */
  idiomas: { codigo: Idioma; nombre: string }[];
  usuario: Usuario | null;
}

/** Lista de enlaces principales; la misma en la barra de escritorio y en el menú móvil. */
function EnlacesPrincipales({ className, textos }: { className: string; textos: { inicio: string; explorar: string } }) {
  const enlaces = [
    { href: RUTAS.inicio, texto: textos.inicio },
    { href: RUTAS.explorar, texto: textos.explorar },
  ];
  return (
    <ul className={className}>
      {enlaces.map((enlace) => (
        <li key={enlace.href}>
          <EnlaceNav href={enlace.href}>{enlace.texto}</EnlaceNav>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar({ textos, idioma, idiomas, usuario }: Props) {
  const nav = textos.navbar;
  const movil = textos.menuMovil;
  const logo = <Logo texto={nav.logo.texto} aria={nav.logo.aria} />;
  const selectorIdioma = <SelectorIdioma idioma={idioma} idiomas={idiomas} etiqueta={nav.aria.idioma} />;
  const accesibilidad = (
    <Accesibilidad textos={textos.accesibilidad} etiquetaBoton={nav.aria.accesibilidad} cerrar={textos.general.aria.cerrarDialogo} />
  );

  return (
    // data-navbar: marca para los estilos que cambian dentro de la barra (Logo, Boton, MenuMovil).
    <header className="navbar" data-navbar>
      <div className="navbar-contenido contenedor">
        <div className="navbar-izquierda">
          {logo}
          <nav aria-label={nav.logo.texto} className="solo-escritorio">
            <EnlacesPrincipales className="navbar-enlaces" textos={nav.enlaces} />
          </nav>
        </div>

        <div className="navbar-derecha">
          <form action={RUTAS.explorar} role="search" className="buscador-nav solo-escritorio">
            <Icono nombre="search" tamano={14} />
            <input type="search" name="q" placeholder={nav.buscador.placeholder} aria-label={nav.buscador.aria} maxLength={80} />
          </form>

          <div className="solo-escritorio navbar-acciones">
            {accesibilidad}
            {selectorIdioma}
          </div>

          {usuario ? (
            <MenuUsuario usuario={usuario} textos={nav.usuario} />
          ) : (
            <>
              <EnlaceIcono href={RUTAS.explorar} icono="search" tamanoIcono={18} variante="plano" className="solo-movil" etiqueta={nav.buscador.aria} />
              <BotonEnlace href={RUTAS.ingresar} variante="secundario" tamano="pequeno" className="navbar-ingresar">
                {nav.botones.ingresar}
              </BotonEnlace>
              <BotonEnlace href={RUTAS.registro} tamano="pequeno" className="solo-escritorio">
                {nav.botones.crearCuenta}
              </BotonEnlace>
            </>
          )}

          <MenuMovil abrir={movil.abrir} cerrar={movil.cerrar} cabecera={logo}>
            <nav aria-label={nav.logo.texto}>
              <EnlacesPrincipales className="menu-movil-enlaces" textos={movil.enlaces} />
            </nav>
            <div className="menu-movil-pie">
              <div className="menu-movil-fila">
                <span>{movil.secciones.idioma}</span>
                {selectorIdioma}
              </div>
              <div className="menu-movil-fila">
                <span>{movil.secciones.accesibilidad}</span>
                {accesibilidad}
              </div>
              {usuario ? (
                <form action={cerrarSesion}>
                  <Boton type="submit" variante="secundario" bloque>
                    {movil.botones.cerrarSesion}
                  </Boton>
                </form>
              ) : (
                <>
                  <BotonEnlace href={RUTAS.ingresar} bloque>
                    {movil.botones.ingresar}
                  </BotonEnlace>
                  <BotonEnlace href={RUTAS.registro} variante="secundario" bloque>
                    {movil.botones.crearCuenta}
                  </BotonEnlace>
                </>
              )}
            </div>
          </MenuMovil>
        </div>
      </div>
    </header>
  );
}
