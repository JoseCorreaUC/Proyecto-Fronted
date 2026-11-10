"use client";

import { useRouter } from "next/navigation";
import Icono from "../Icono";

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

// Buscador del inicio. Es un formulario GET a /eventos, así que funciona aunque JavaScript no cargue.
// Al cambiar "Dónde" también se actualiza la sección "Próximamente en {ciudad}" del inicio.
export default function HeroBuscador({ ciudades, ciudad, textos, opcionesFecha }: Props) {
  const router = useRouter();

  return (
    <form action="/eventos" role="search" className="hero-buscador">
      <label className="hero-buscador__campo">
        <Icono nombre="search" tamano={16} />
        <span>
          <span className="hero-buscador__etiqueta">{textos.etiquetas.que}</span>
          <input type="search" name="q" placeholder={textos.placeholders.que} maxLength={80} />
        </span>
      </label>
      <label className="hero-buscador__campo">
        <Icono nombre="pin" tamano={16} />
        <span>
          <span className="hero-buscador__etiqueta">{textos.etiquetas.donde}</span>
          <select
            name="ciudad"
            defaultValue={ciudad}
            onChange={(e) => router.replace(`/?ciudad=${encodeURIComponent(e.target.value)}`, { scroll: false })}
          >
            {ciudades.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="hero-buscador__campo">
        <Icono nombre="calendar" tamano={16} />
        <span>
          <span className="hero-buscador__etiqueta">{textos.etiquetas.cuando}</span>
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
      <button type="submit" className="boton boton--primario">
        {textos.botones.buscar}
      </button>
    </form>
  );
}
