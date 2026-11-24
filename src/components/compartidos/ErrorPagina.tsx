"use client";

import { useEffect, useMemo, useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Estado } from "./Estados";
import Boton from "@/components/ui/Boton";

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

  const reintentar = () =>
    iniciar(() => {
      router.refresh();
      reset();
    });

  return (
    <div className="contenedor seccion">
      <Estado
        tono="error"
        icono="alert"
        nivelTitulo="h1"
        titulo={textos.titulo}
        texto={textos.texto}
        accion={
          <Boton tamano="pequeno" disabled={pendiente} onClick={reintentar}>
            {textos.reintentar}
          </Boton>
        }
      />
    </div>
  );
}
