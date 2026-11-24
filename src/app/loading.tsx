import { getTextos } from "@/lib/textos";
import { TarjetasCargando } from "@/components/compartidos/Estados";

export default async function Cargando() {
  const textos = await getTextos();
  return (
    <>
      <div className="hero hero-cargando" data-hero aria-hidden="true" />
      <div className="contenedor seccion">
        <TarjetasCargando etiqueta={textos.estados.cargando.titulo} />
      </div>
    </>
  );
}
