"use client";

import { startTransition, useActionState, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ingresar, type ErrorCampo, type EstadoIngreso } from "@/app/(cuenta)/ingresar/acciones";
import { fmt } from "@/lib/formato";
import { RUTAS } from "@/lib/rutas";
import Icono from "@/components/compartidos/Icono";
import Aviso from "@/components/ui/Aviso";
import Boton from "@/components/ui/Boton";
import Campo from "@/components/ui/Campo";
import CampoClave from "@/components/ui/CampoClave";

export interface TextosIngreso {
  titulo: string;
  subtitulo: string;
  etiquetas: { correo: string; clave: string; mantenerSesion: string };
  placeholders: { correo: string };
  enlaces: { olvidasteClave: string; crearCuenta: string };
  mensajes: { sinCuenta: string; ingresando: string };
  botones: { ingresar: string; mostrarClave: string; ocultarClave: string; reintentar: string };
  errores: {
    camposObligatorios: { titulo: string; texto: string };
    correoObligatorio: string;
    claveObligatoria: string;
    correoInvalido: string;
    revisaCampo: string;
    credenciales: { titulo: string; texto: string };
    demasiadosIntentos: { titulo: string; texto: string };
    conexion: { titulo: string; texto: string };
    generico: { titulo: string; texto: string };
  };
}

interface Props {
  textos: TextosIngreso;
  /** A dónde volver después de ingresar (por ejemplo la página que pidió la sesión). */
  siguiente?: string;
  /** Aviso que se ve antes del primer intento (por ejemplo, la sesión terminó). */
  avisoInicial?: { titulo: string; texto: string };
}

const INICIAL: EstadoIngreso = { estado: "inicial" };

/** Segundos que faltan para poder volver a intentar después de un 429. */
function useCuentaRegresiva(estado: EstadoIngreso) {
  const [restantes, setRestantes] = useState(0);
  const [anterior, setAnterior] = useState(estado);
  // Cada respuesta 429 nueva reinicia la cuenta con los segundos de Retry-After.
  if (anterior !== estado) {
    setAnterior(estado);
    setRestantes(estado.estado === "espera" ? estado.segundos : 0);
  }
  useEffect(() => {
    if (restantes <= 0) return;
    const reloj = setTimeout(() => setRestantes((s) => s - 1), 1000);
    return () => clearTimeout(reloj);
  }, [restantes]);
  return restantes;
}

/**
 * Formulario de ingreso (POST /sesion). Estados del Figma: campos obligatorios, cargando,
 * credenciales incorrectas y error de conexión; además 422 por campo y 429 con cuenta regresiva.
 * Si algo falla, lo que la persona escribió se conserva.
 */
export default function FormularioIngreso({ textos, siguiente, avisoInicial }: Props) {
  const [estado, accion, pendiente] = useActionState(ingresar, INICIAL);
  const restantes = useCuentaRegresiva(estado);
  const e = textos.errores;

  // Se envía con startTransition en vez de dejar que React limpie el formulario al terminar,
  // así lo escrito sigue ahí si hay un error. Sin JavaScript el formulario funciona igual (action).
  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    startTransition(() => accion(datos));
  };

  const mensajeCampo = (error: ErrorCampo | undefined, obligatorio: string) => {
    if (!error) return undefined;
    if (error === "requerido") return obligatorio;
    return estado.estado === "campos" && estado.desdeApi ? e.revisaCampo : e.correoInvalido;
  };
  const campos = estado.estado === "campos" ? estado.campos : {};

  const aviso = (() => {
    switch (estado.estado) {
      case "campos":
        return e.camposObligatorios;
      case "credenciales":
        return e.credenciales;
      case "espera":
        return { titulo: e.demasiadosIntentos.titulo, texto: fmt(e.demasiadosIntentos.texto, { segundos: Math.max(restantes, 0) }) };
      case "conexion":
        return e.conexion;
      case "error":
        return e.generico;
      default:
        return avisoInicial ?? null;
    }
  })();

  const textoBoton = pendiente ? textos.mensajes.ingresando : estado.estado === "conexion" ? textos.botones.reintentar : textos.botones.ingresar;

  return (
    <form action={accion} onSubmit={enviar} noValidate className="formulario-cuenta" aria-busy={pendiente}>
      <div className="formulario-cuenta-encabezado">
        <h1 className="titular-h1">{textos.titulo}</h1>
        <p className="formulario-cuenta-subtitulo">{textos.subtitulo}</p>
      </div>

      {aviso && <Aviso titulo={aviso.titulo} texto={aviso.texto} />}

      <input type="hidden" name="siguiente" value={siguiente ?? ""} />
      <Campo
        etiqueta={textos.etiquetas.correo}
        name="correo"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder={textos.placeholders.correo}
        error={mensajeCampo(campos.correo, e.correoObligatorio)}
      />
      <CampoClave
        etiqueta={textos.etiquetas.clave}
        name="clave"
        autoComplete="current-password"
        textoMostrar={textos.botones.mostrarClave}
        textoOcultar={textos.botones.ocultarClave}
        error={mensajeCampo(campos.clave, e.claveObligatoria)}
      />

      <div className="formulario-cuenta-opciones">
        <label className="casilla-cuenta">
          <input type="checkbox" name="mantener" defaultChecked />
          <span className="casilla-cuenta-caja" aria-hidden="true">
            <Icono nombre="check" tamano={14} />
          </span>
          {textos.etiquetas.mantenerSesion}
        </label>
        <Link href={RUTAS.recuperarClave} className="enlace-fuerte">
          {textos.enlaces.olvidasteClave}
        </Link>
      </div>

      <Boton type="submit" bloque disabled={pendiente || restantes > 0} className="formulario-cuenta-boton">
        {pendiente && <span className="indicador-carga" aria-hidden="true" />}
        {textoBoton}
      </Boton>

      <p className="formulario-cuenta-pie">
        {textos.mensajes.sinCuenta}{" "}
        <Link href={RUTAS.registro} className="enlace-fuerte">
          {textos.enlaces.crearCuenta}
        </Link>
      </p>
    </form>
  );
}
