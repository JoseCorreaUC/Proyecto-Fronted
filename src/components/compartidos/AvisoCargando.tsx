import type { Textos } from "@/lib/textos";

/** Claves `estados.cargando` de GET /textos. */
export type TextosCarga = Textos["estados"]["cargando"];

/** Aviso de carga: título visible, texto de apoyo e indicador con su nombre accesible. */
export default function AvisoCargando({ textos }: { textos: TextosCarga }) {
  return (
    <div className="aviso-carga" role="status">
      <span className="indicador-carga" role="progressbar" aria-label={textos.indicador} />
      <div>
        <p className="aviso-carga-titulo">{textos.titulo}</p>
        <p className="aviso-carga-texto">{textos.texto}</p>
      </div>
    </div>
  );
}
