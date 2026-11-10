import { getTextos } from "@/lib/textos";
import { TarjetasCargando } from "@/components/Estados";
import estilos from "./page.module.css";

export default async function Cargando() {
  const textos = await getTextos();
  return (
    <>
      <div className={`${estilos.hero} ${estilos.heroCargando}`} data-hero aria-hidden="true" />
      <div className="contenedor seccion">
        <TarjetasCargando etiqueta={textos.estados.cargando.titulo} />
      </div>
    </>
  );
}
