import type { Metadata } from "next";
import { getTextos } from "@/lib/textos";
import { Estado, EnlaceBoton } from "@/components/compartidos/Estados";

export async function generateMetadata(): Promise<Metadata> {
  const textos = await getTextos();
  return { title: textos.paginas.noEncontrado.seo.titulo, description: textos.paginas.noEncontrado.seo.descripcion };
}

export default async function NoEncontrado() {
  const t = (await getTextos()).paginas.noEncontrado;
  return (
    <div className="contenedor seccion">
      <Estado
        icono="search"
        titulo={t.contenido.titulo}
        texto={t.contenido.texto}
        accion={<EnlaceBoton href="/">{t.contenido.botones.volverInicio}</EnlaceBoton>}
      />
    </div>
  );
}
