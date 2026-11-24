"use client";

import { useEffect, useState } from "react";
import type { EventoResumen, Lista } from "@/lib/api";
import type { Textos } from "@/lib/textos";
import type { Idioma } from "@/lib/formato";
import { pedirApi } from "@/lib/apiCliente";
import RejillaEventos from "@/components/compartidos/RejillaEventos";
import { Estado, TarjetasCargando } from "@/components/compartidos/Estados";
import type { TextosTarjeta } from "@/components/compartidos/TarjetaEvento";
import Boton from "@/components/ui/Boton";

// Ruta del contrato: GET /eventos/destacados.
const RUTA_DESTACADOS = "/eventos/destacados";

type EstadoCarga = { tipo: "cargando" } | { tipo: "error" } | { tipo: "listo"; eventos: EventoResumen[] };

interface Props {
  textos: TextosTarjeta & Pick<Textos, "estados">;
  idioma: Idioma;
  /** Eventos que ya trajo el servidor: se muestran de inmediato, sin tarjetas grises. */
  iniciales?: EventoResumen[];
  /** Cuántos eventos se muestran. */
  cantidad: number;
}

/**
 * "Destacados" del inicio. El servidor manda los eventos ya pintados y el navegador los vuelve a
 * pedir a la API para tenerlos al día: esa petición se ve en DevTools (pestaña Red).
 * Si el servidor no pudo traerlos, se ven las tarjetas de carga, el error con reintento o el vacío.
 */
export default function DestacadosCliente({ textos, idioma, iniciales, cantidad }: Props) {
  const [estado, setEstado] = useState<EstadoCarga>(iniciales ? { tipo: "listo", eventos: iniciales } : { tipo: "cargando" });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const control = new AbortController();
    pedirApi<Lista<EventoResumen>>(RUTA_DESTACADOS, control.signal)
      .then((r) => setEstado({ tipo: "listo", eventos: r.datos.slice(0, cantidad) }))
      .catch(() => {
        // Si ya hay eventos en pantalla, se dejan; el error solo se muestra si no hay nada.
        if (!control.signal.aborted) setEstado((actual) => (actual.tipo === "listo" ? actual : { tipo: "error" }));
      });
    return () => control.abort();
  }, [intento, cantidad]);

  const reintentar = () => {
    setEstado({ tipo: "cargando" });
    setIntento((n) => n + 1);
  };

  if (estado.tipo === "cargando") return <TarjetasCargando etiqueta={textos.estados.cargando.titulo} />;

  if (estado.tipo === "error") {
    const e = textos.estados.error;
    return (
      <Estado
        tono="error"
        icono="alert"
        titulo={e.titulo}
        texto={e.texto}
        accion={
          <Boton tamano="pequeno" onClick={reintentar}>
            {e.botones.reintentar}
          </Boton>
        }
      />
    );
  }

  return <RejillaEventos eventos={estado.eventos} textos={textos} idioma={idioma} forma="carrusel" />;
}
