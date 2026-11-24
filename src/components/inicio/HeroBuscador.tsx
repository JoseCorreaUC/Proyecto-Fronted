"use client";

import { useRouter } from "next/navigation";
import Icono from "@/components/compartidos/Icono";
import Boton from "@/components/ui/Boton";
import { RUTAS } from "@/lib/rutas";

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
    <form action={RUTAS.explorar} role="search" className="hero-buscador">
      <label className="hero-buscador-campo">
        <Icono nombre="search" tamano={18} />
        <span>
          <span className="hero-buscador-etiqueta">{textos.etiquetas.que}</span>
          <input type="search" name="q" placeholder={textos.placeholders.que} maxLength={80} />
        </span>
      </label>
      <label className="hero-buscador-campo">
        <Icono nombre="pin" tamano={18} />
        <span>
          <span className="hero-buscador-etiqueta">{textos.etiquetas.donde}</span>
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
      <label className="hero-buscador-campo">
        <Icono nombre="calendar" tamano={18} />
        <span>
          <span className="hero-buscador-etiqueta">{textos.etiquetas.cuando}</span>
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
      <Boton type="submit" className="hero-buscador-boton">
        {textos.botones.buscar}
      </Boton>
    </form>
  );
}
