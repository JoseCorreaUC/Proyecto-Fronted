import { getTextos } from "@/lib/textos";
import { TarjetasCargando } from "@/components/compartidos/Estados";
import estados from "@/components/compartidos/Estados.module.css";
import panelFiltros from "@/components/explorar/PanelFiltros.module.css";
import estilos from "./page.module.css";

export default async function Cargando() {
  const textos = await getTextos();
  return (
    <div className={`contenedor ${estilos.explorar}`}>
      <div className={estilos.explorarCabecera}>
        <div className={`${estados.esqueleto} ${estados.esqueletoLinea}`} style={{ width: 260, height: 36 }} />
      </div>
      <div className={estilos.explorarCuerpo}>
        <div className={`${panelFiltros.filtros} ${panelFiltros.filtrosCargando} solo-escritorio`} aria-hidden="true">
          <div className={estados.esqueleto} style={{ height: 420 }} />
        </div>
        <TarjetasCargando cantidad={6} etiqueta={textos.estados.cargando.titulo} />
      </div>
    </div>
  );
}
