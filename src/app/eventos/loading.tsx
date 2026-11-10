import { getTextos } from "@/lib/textos";
import { TarjetasCargando } from "@/components/Estados";

export default async function Cargando() {
  const textos = await getTextos();
  return (
    <div className="contenedor explorar">
      <div className="explorar__cabecera">
        <div className="esqueleto esqueleto--linea" style={{ width: 260, height: 36 }} />
      </div>
      <div className="explorar__cuerpo">
        <div className="filtros filtros--cargando solo-escritorio" aria-hidden="true">
          <div className="esqueleto" style={{ height: 420 }} />
        </div>
        <TarjetasCargando cantidad={6} etiqueta={textos.estados.cargando.titulo} />
      </div>
    </div>
  );
}
