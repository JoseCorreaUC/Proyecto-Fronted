import type { Metadata } from "next";
import { getTextos } from "@/lib/textos";
import { Estado, EnlaceBoton } from "@/components/compartidos/Estados";
import MarcoSitio from "@/components/layout/MarcoSitio";

export async function generateMetadata(): Promise<Metadata> {
  const textos = await getTextos();
  return { title: textos.paginas.noEncontrado.seo.titulo, description: textos.paginas.noEncontrado.seo.descripcion };
}

// Direcciones que no existen. Está fuera de los grupos de rutas, así que pone su propio marco.
export default async function NoEncontrado() {
  const t = (await getTextos()).paginas.noEncontrado;
  return (
    <MarcoSitio>
      <div className="contenedor seccion">
        <Estado
          icono="search"
          titulo={t.contenido.titulo}
          texto={t.contenido.texto}
          accion={<EnlaceBoton href="/">{t.contenido.botones.volverInicio}</EnlaceBoton>}
        />
      </div>
    </MarcoSitio>
  );
}
