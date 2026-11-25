import type { Textos } from "@/lib/textos";
import { fmt } from "@/lib/formato";

interface Props {
  textos: Textos["paginas"]["detalleEvento"]["politicas"];
  /** 0 significa todo público. */
  edadMinima: number;
}

/** Sección "Políticas": documento, edad, reembolso, ingreso y objetos no permitidos. */
export default function PoliticasEvento({ textos, edadMinima }: Props) {
  const edad = edadMinima > 0 ? fmt(textos.edad, { edad: edadMinima }) : textos.todoPublico;
  const politicas = [textos.documento, edad, textos.reembolso, textos.ingreso, textos.objetos];

  return (
    <section id="politicas" className="detalle-seccion solo-escritorio" aria-labelledby="politicas-titulo">
      <h2 id="politicas-titulo" className="titular-h2">
        {textos.titulo}
      </h2>
      <ul className="detalle-politicas">
        {politicas.map((politica) => (
          <li key={politica}>{politica}</li>
        ))}
      </ul>
    </section>
  );
}
