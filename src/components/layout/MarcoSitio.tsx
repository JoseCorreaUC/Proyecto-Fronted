import type { ReactNode } from "react";
import { getIdioma, getIdiomas, getTextos } from "@/lib/textos";
import { getSesion } from "@/lib/sesion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SesionVencida from "./SesionVencida";

/**
 * Marco de las páginas del sitio: barra de navegación, contenido y pie de página.
 * Las pantallas de cuenta (ingresar, y en el Sprint 3 registro) no lo usan: van a pantalla completa.
 */
export default async function MarcoSitio({ children }: { children: ReactNode }) {
  const [idioma, idiomas, textos, { usuario, vencida }] = await Promise.all([getIdioma(), getIdiomas(), getTextos(), getSesion()]);
  return (
    <>
      {vencida && <SesionVencida />}
      <Navbar textos={textos} idioma={idioma} idiomas={idiomas.datos} usuario={usuario} />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Footer textos={textos} />
    </>
  );
}
