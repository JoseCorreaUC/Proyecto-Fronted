import { fmt } from "@/lib/formato";
import { RUTAS } from "@/lib/rutas";
import Icono from "@/components/compartidos/Icono";
import BotonIcono from "@/components/ui/BotonIcono";

interface Props {
  ciudad: string;
  textos: {
    etiquetas: { que: string };
    placeholders: { movil: string; cuando: string };
    resumenMovil: string;
    botones: { buscar: string };
  };
}

/** Buscador compacto del hero en el móvil. Formulario GET a /explorar: funciona sin JavaScript. */
export default function BuscadorMovil({ ciudad, textos }: Props) {
  return (
    <form action={RUTAS.explorar} role="search" className="buscador-movil solo-movil">
      <Icono nombre="search" tamano={16} />
      <label className="buscador-movil-campo">
        <span className="solo-lectores">{textos.etiquetas.que}</span>
        <input type="search" name="q" placeholder={textos.placeholders.movil} maxLength={80} />
        <span className="buscador-movil-resumen" aria-hidden="true">
          {fmt(textos.resumenMovil, { ciudad, fecha: textos.placeholders.cuando })}
        </span>
      </label>
      <input type="hidden" name="ciudad" value={ciudad} />
      <BotonIcono type="submit" icono="sliders" variante="plano" etiqueta={textos.botones.buscar} />
    </form>
  );
}
