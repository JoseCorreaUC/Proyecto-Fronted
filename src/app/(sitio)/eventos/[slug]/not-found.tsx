import { getTextos } from "@/lib/textos";
import { RUTAS } from "@/lib/rutas";
import { Estado, EnlaceBoton } from "@/components/compartidos/Estados";

// GET /eventos/:slug respondió 404 `no_encontrado`: el evento no existe o terminó.
export default async function EventoNoEncontrado() {
  const t = (await getTextos()).paginas.detalleEvento.noEncontrado;
  return (
    <div className="contenedor seccion">
      <Estado icono="search" titulo={t.titulo} texto={t.texto} nivelTitulo="h1" accion={<EnlaceBoton href={RUTAS.explorar}>{t.botones.volver}</EnlaceBoton>} />
    </div>
  );
}
