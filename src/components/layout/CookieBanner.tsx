"use client";

import { useState, useTransition } from "react";
import { guardarConsentimiento } from "@/app/acciones";
import type { Consentimiento } from "@/lib/textos";
import Boton from "@/components/ui/Boton";

interface Props {
  textos: { titulo: string; texto: string; botones: { rechazar: string; aceptar: string } };
}

// Se muestra solo en la primera visita (cuando no existe la cookie "consentimiento").
export default function CookieBanner({ textos }: Props) {
  const [visible, setVisible] = useState(true);
  const [pendiente, iniciar] = useTransition();
  if (!visible) return null;

  const responder = (valor: Consentimiento) =>
    iniciar(async () => {
      await guardarConsentimiento(valor);
      setVisible(false);
    });

  return (
    <section className="aviso-cookies" aria-labelledby="aviso-cookies-titulo" role="region">
      <div>
        <h2 id="aviso-cookies-titulo">{textos.titulo}</h2>
        <p>{textos.texto}</p>
      </div>
      <div className="aviso-cookies-botones">
        <Boton variante="secundario" tamano="pequeno" disabled={pendiente} onClick={() => responder("rechazado")}>
          {textos.botones.rechazar}
        </Boton>
        <Boton tamano="pequeno" disabled={pendiente} onClick={() => responder("aceptado")}>
          {textos.botones.aceptar}
        </Boton>
      </div>
    </section>
  );
}
