"use client";

import { useState, useTransition } from "react";
import { guardarConsentimiento } from "@/app/acciones";

interface Props {
  textos: { titulo: string; texto: string; botones: { rechazar: string; aceptar: string } };
}

// Se muestra solo en la primera visita (cuando no existe la cookie "consentimiento").
export default function CookieBanner({ textos }: Props) {
  const [visible, setVisible] = useState(true);
  const [pendiente, iniciar] = useTransition();
  if (!visible) return null;

  const responder = (valor: "aceptado" | "rechazado") =>
    iniciar(async () => {
      await guardarConsentimiento(valor);
      setVisible(false);
    });

  return (
    <section className="aviso-cookies" aria-labelledby="aviso-cookies-titulo" role="region">
      <div className="aviso-cookies__texto">
        <h2 id="aviso-cookies-titulo">{textos.titulo}</h2>
        <p>{textos.texto}</p>
      </div>
      <div className="aviso-cookies__botones">
        <button type="button" className="boton boton--secundario boton--pequeno" disabled={pendiente} onClick={() => responder("rechazado")}>
          {textos.botones.rechazar}
        </button>
        <button type="button" className="boton boton--primario boton--pequeno" disabled={pendiente} onClick={() => responder("aceptado")}>
          {textos.botones.aceptar}
        </button>
      </div>
    </section>
  );
}
