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
const CANTIDAD = 4;

type EstadoCarga = { tipo: "cargando" } | { tipo: "error" } | { tipo: "listo"; eventos: EventoResumen[] };

interface Props {
  textos: TextosTarjeta & Pick<Textos, "estados">;
  idioma: Idioma;
}

/**
 * "Destacados" del inicio. Pide los eventos desde el navegador, así la petición a la API
 * se ve en DevTools (pestaña Red). Tiene sus estados de carga, error con reintento y vacío.
 */
export default function DestacadosCliente({ textos, idioma }: Props) {
  const [estado, setEstado] = useState<EstadoCarga>({ tipo: "cargando" });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const control = new AbortController();
    pedirApi<Lista<EventoResumen>>(RUTA_DESTACADOS, control.signal)
      .then((r) => setEstado({ tipo: "listo", eventos: r.datos.slice(0, CANTIDAD) }))
      .catch(() => {
        if (!control.signal.aborted) setEstado({ tipo: "error" });
      });
    return () => control.abort();
  }, [intento]);

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
