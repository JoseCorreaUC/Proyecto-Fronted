"use client";

import { useState } from "react";
import Campo, { type PropsCampo } from "./Campo";
import BotonIcono from "./BotonIcono";

interface Props extends Omit<PropsCampo, "type" | "accesorio"> {
  textoMostrar: string;
  textoOcultar: string;
}

/** Campo de contraseña con el botón de ojo para mostrarla u ocultarla. */
export default function CampoClave({ textoMostrar, textoOcultar, ...campo }: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <Campo
      {...campo}
      type={visible ? "text" : "password"}
      accesorio={
        <BotonIcono
          icono={visible ? "ojoTachado" : "eye"}
          tamanoIcono={20}
          variante="plano"
          className="campo-formulario-ojo"
          etiqueta={visible ? textoOcultar : textoMostrar}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        />
      }
    />
  );
}
