"use client";

import { useState, useTransition } from "react";
import { guardarConsentimiento } from "@/app/acciones";
import botones from "@/styles/modulos/ui/Boton.module.css";
import estilos from "@/styles/modulos/componentes/CookieBanner.module.css";

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
    <section className={estilos.avisoCookies} aria-labelledby="aviso-cookies-titulo" role="region">
      <div>
        <h2 id="aviso-cookies-titulo">{textos.titulo}</h2>
        <p>{textos.texto}</p>
      </div>
      <div className={estilos.avisoCookiesBotones}>
        <button type="button" className={`${botones.boton} ${botones.botonSecundario} ${botones.botonPequeno}`} disabled={pendiente} onClick={() => responder("rechazado")}>
          {textos.botones.rechazar}
        </button>
        <button type="button" className={`${botones.boton} ${botones.botonPrimario} ${botones.botonPequeno}`} disabled={pendiente} onClick={() => responder("aceptado")}>
          {textos.botones.aceptar}
        </button>
      </div>
    </section>
  );
}
