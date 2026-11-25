import { getTextos } from "@/lib/textos";
import DetalleCargando from "@/components/detalle/DetalleCargando";

export default async function Cargando() {
  const textos = await getTextos();
  return <DetalleCargando textos={textos.estados.cargando} />;
}
