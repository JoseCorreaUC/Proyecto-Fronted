import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
// Estilos globales: tokens de la profesora (sin cambios), mis ajustes y la base.
// Los de cada página y componente están en src/styles/modulos/.
import "@/styles/tokens.css";
import "@/styles/ajustes-tokens.css";
import "@/styles/base.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { getConsentimiento, getIdioma, getTextos } from "@/lib/textos";
import { getUsuario } from "@/lib/sesion";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--fuente-cargada",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const textos = await getTextos();
  return {
    title: textos.paginas.inicio.seo.titulo,
    description: textos.paginas.inicio.seo.descripcion,
  };
}

export const viewport: Viewport = { themeColor: "#141414" };

// Aplica las preferencias de accesibilidad guardadas antes de pintar, para que no "salte" la página.
const scriptAccesibilidad = `(function(){try{var p=JSON.parse(localStorage.getItem("taquilla-accesibilidad")||"null");var m=function(q){return matchMedia(q).matches};var t=[87.5,100,112.5,125,150];var h=document.documentElement;p=p||{tamano:1,contraste:m("(prefers-contrast: more)"),movimiento:m("(prefers-reduced-motion: reduce)")};h.style.fontSize=(t[p.tamano]||100)+"%";if(p.contraste)h.setAttribute("data-alto-contraste","");if(p.movimiento)h.setAttribute("data-reducir-movimiento","");if(p.subrayar)h.setAttribute("data-subrayar-enlaces","");if(p.espaciado)h.setAttribute("data-espaciado-lectura","")}catch(e){}})();`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [idioma, textos, consentimiento, usuario] = await Promise.all([getIdioma(), getTextos(), getConsentimiento(), getUsuario()]);

  const textosError = {
    titulo: textos.estados.error.titulo,
    texto: textos.estados.error.texto,
    reintentar: textos.estados.error.botones.reintentar,
  };

  return (
    <html lang={idioma} className={instrumentSans.variable} suppressHydrationWarning>
      <body data-textos-error={JSON.stringify(textosError)}>
        <Script id="preferencias-accesibilidad" strategy="beforeInteractive">
          {scriptAccesibilidad}
        </Script>
        <a href="#contenido" className="saltar-contenido">
          {textos.general.aria.saltarAlContenido}
        </a>
        <Navbar textos={textos} idioma={idioma} usuario={usuario} />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer textos={textos} />
        {!consentimiento && <CookieBanner textos={textos.cookies.banner} />}
      </body>
    </html>
  );
}
