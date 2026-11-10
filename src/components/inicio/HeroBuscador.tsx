"use client";

import { useRouter } from "next/navigation";
import Icono from "@/components/compartidos/Icono";
import { RUTAS } from "@/lib/rutas";
import botones from "@/components/ui/Boton.module.css";
import estilos from "./HeroBuscador.module.css";

interface Props {
  ciudades: string[];
  ciudad: string;
  textos: {
    etiquetas: { que: string; donde: string; cuando: string };
    placeholders: { que: string; cuando: string; movil: string };
    resumenMovil: string;
    botones: { buscar: string };
  };
  opcionesFecha: { valor: string; texto: string }[];
}

// Buscador del inicio. Es un formulario GET a /explorar, así que funciona aunque JavaScript no cargue.
// Al cambiar "Dónde" también se actualiza la sección "Próximamente en {ciudad}" del inicio.
export default function HeroBuscador({ ciudades, ciudad, textos, opcionesFecha }: Props) {
  const router = useRouter();

  return (
    <form action={RUTAS.explorar} role="search" className={estilos.heroBuscador}>
      <label className={estilos.heroBuscadorCampo}>
        <Icono nombre="search" tamano={16} />
        <span>
          <span className={estilos.heroBuscadorEtiqueta}>{textos.etiquetas.que}</span>
          <input type="search" name="q" placeholder={textos.placeholders.que} maxLength={80} />
        </span>
      </label>
      <label className={estilos.heroBuscadorCampo}>
        <Icono nombre="pin" tamano={16} />
        <span>
          <span className={estilos.heroBuscadorEtiqueta}>{textos.etiquetas.donde}</span>
          <select
            name="ciudad"
            defaultValue={ciudad}
            onChange={(e) => router.replace(`${RUTAS.inicio}?ciudad=${encodeURIComponent(e.target.value)}`, { scroll: false })}
          >
            {ciudades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className={estilos.heroBuscadorCampo}>
        <Icono nombre="calendar" tamano={16} />
        <span>
          <span className={estilos.heroBuscadorEtiqueta}>{textos.etiquetas.cuando}</span>
          <select name="fecha" defaultValue="">
            <option value="">{textos.placeholders.cuando}</option>
            {opcionesFecha.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.texto}
              </option>
            ))}
          </select>
        </span>
      </label>
      <button type="submit" className={`${botones.boton} ${botones.botonPrimario} ${estilos.heroBuscadorBoton}`}>
        {textos.botones.buscar}
      </button>
    </form>
  );
}
