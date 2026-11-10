"use client";

import { useEffect, useMemo, useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import Icono from "./Icono";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

interface TextosError {
  titulo: string;
  texto: string;
  reintentar: string;
}

// error.tsx es un componente de cliente y no puede pedir los textos en el servidor.
// El layout deja los textos de error en el atributo data-textos-error de <body> y aquí se leen.
const sinSuscripcion = () => () => {};
const leerJson = () => document.body.dataset.textosError ?? "";

function parsear(json: string): TextosError | null {
  try {
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

export default function ErrorPagina({ error, reset }: Props) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  const json = useSyncExternalStore(sinSuscripcion, leerJson, () => "");
  const textos = useMemo(() => parsear(json), [json]);

  useEffect(() => {
    console.error(error);
  }, [error]);

  if (!textos) return null;

  return (
    <div className="contenedor seccion">
      <div className="estado estado--error" role="alert">
        <span className="estado__icono">
          <Icono nombre="alert" tamano={20} />
        </span>
        <h1 className="titular-h4">{textos.titulo}</h1>
        <p>{textos.texto}</p>
        <button
          type="button"
          className="boton boton--primario boton--pequeno"
          disabled={pendiente}
          onClick={() =>
            iniciar(() => {
              router.refresh();
              reset();
            })
          }
        >
          {textos.reintentar}
        </button>
      </div>
    </div>
  );
}
