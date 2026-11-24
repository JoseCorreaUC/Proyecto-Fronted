import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
// Única hoja de estilos del sitio: variables globales, base y componentes.
import "./globals.css";
import CookieBanner from "@/components/layout/CookieBanner";
import { getConsentimiento, getIdioma, getTextos } from "@/lib/textos";
import { scriptAccesibilidad } from "@/lib/accesibilidad";

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [idioma, textos, consentimiento] = await Promise.all([getIdioma(), getTextos(), getConsentimiento()]);

  const textosError = {
    titulo: textos.estados.error.titulo,
    texto: textos.estados.error.texto,
    reintentar: textos.estados.error.botones.reintentar,
  };

  return (
    <html lang={idioma} className={instrumentSans.variable} suppressHydrationWarning>
      <body data-textos-error={JSON.stringify(textosError)}>
        {/* Aplica las preferencias de accesibilidad guardadas antes de pintar, para que no "salte" la página. */}
        <Script id="preferencias-accesibilidad" strategy="beforeInteractive">
          {scriptAccesibilidad}
        </Script>
        <a href="#contenido" className="saltar-contenido">
          {textos.general.aria.saltarAlContenido}
        </a>
        {/* La barra y el pie los pone cada grupo de rutas: (sitio) los lleva, (cuenta) no. */}
        {children}
        {!consentimiento && <CookieBanner textos={textos.cookies.banner} />}
      </body>
    </html>
  );
}
