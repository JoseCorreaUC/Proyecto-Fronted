import { getTextos } from "@/lib/textos";
import { TarjetasCargando } from "@/components/Estados";
import estilos from "@/styles/modulos/paginas/Inicio.module.css";

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
