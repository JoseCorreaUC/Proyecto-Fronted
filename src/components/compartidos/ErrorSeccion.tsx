import type { Textos } from "@/lib/textos";
import { ApiError } from "@/lib/api";
import { Estado } from "./Estados";
import BotonReintentar from "./BotonReintentar";

/** Estado de error de una sección, con el mensaje que corresponde al código del error. */
export default function ErrorSeccion({ textos, error }: { textos: Textos; error: unknown }) {
  const e = textos.estados.error;
  const errores = textos.errores as Record<string, string>;
  const codigo = error instanceof ApiError ? error.codigo : "";
  const sinConexion = codigo === "sin_conexion";
  return (
    <Estado
      tono="error"
      icono={sinConexion ? "wifi" : "alert"}
      titulo={sinConexion ? textos.estados.sinConexion.titulo : e.titulo}
      texto={sinConexion ? e.texto : (errores[codigo] ?? e.texto)}
      accion={<BotonReintentar texto={e.botones.reintentar} cargando={textos.estados.cargando.indicador} />}
    />
  );
}
