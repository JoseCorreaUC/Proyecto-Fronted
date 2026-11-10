"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icono from "./Icono";
import { RUTAS } from "@/lib/rutas";
import botones from "@/styles/modulos/ui/Boton.module.css";
import campos from "@/styles/modulos/ui/Campo.module.css";
import estilos from "@/styles/modulos/componentes/Accesibilidad.module.css";

// Preferencias del panel de accesibilidad. Se guardan en este dispositivo (localStorage)
// y se aplican como atributos en <html>; ver el script inicial en layout.tsx.
export const CLAVE_ACCESIBILIDAD = "taquilla-accesibilidad";
export const TAMANOS = [87.5, 100, 112.5, 125, 150];

interface Preferencias {
  tamano: number; // índice en TAMANOS
  contraste: boolean;
  movimiento: boolean;
  subrayar: boolean;
  espaciado: boolean;
}

function valoresDelSistema(): Preferencias {
  const consulta = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;
  return {
    tamano: 1,
    contraste: consulta("(prefers-contrast: more)"),
    movimiento: consulta("(prefers-reduced-motion: reduce)"),
    subrayar: false,
    espaciado: false,
  };
}

function leer(): Preferencias {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_ACCESIBILIDAD) ?? "null");
    if (guardado) return { ...valoresDelSistema(), ...guardado };
  } catch {}
  return valoresDelSistema();
}

function aplicar(p: Preferencias) {
  const html = document.documentElement;
  html.style.fontSize = `${TAMANOS[p.tamano] ?? 100}%`;
  html.toggleAttribute("data-alto-contraste", p.contraste);
  html.toggleAttribute("data-reducir-movimiento", p.movimiento);
  html.toggleAttribute("data-subrayar-enlaces", p.subrayar);
  html.toggleAttribute("data-espaciado-lectura", p.espaciado);
}

export interface TextosAccesibilidad {
  titulo: string;
  tamanoTexto: string;
  muestraTamano: string;
  altoContraste: { nombre: string; descripcion: string };
  reducirMovimiento: { nombre: string; descripcion: string };
  subrayarEnlaces: { nombre: string; descripcion: string };
  espaciadoLectura: { nombre: string; descripcion: string };
  nota: string;
  enlaces: { declaracion: string };
  botones: { restablecer: string };
  aria: { aumentarTexto: string; disminuirTexto: string };
}

interface Props {
  textos: TextosAccesibilidad;
  etiquetaBoton: string;
  cerrar: string;
}

export default function Accesibilidad({ textos, etiquetaBoton, cerrar }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [pref, setPref] = useState<Preferencias | null>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!abierto) return;
    panel.current?.focus();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    const alClic = (e: MouseEvent) => {
      const objetivo = e.target as Node;
      if (!panel.current?.contains(objetivo) && !boton.current?.contains(objetivo)) setAbierto(false);
    };
    document.addEventListener("keydown", alPulsar);
    document.addEventListener("mousedown", alClic);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.removeEventListener("mousedown", alClic);
    };
  }, [abierto]);

  const cambiar = (cambios: Partial<Preferencias>) => {
    const nuevas = { ...(pref ?? leer()), ...cambios };
    setPref(nuevas);
    aplicar(nuevas);
    try {
      localStorage.setItem(CLAVE_ACCESIBILIDAD, JSON.stringify(nuevas));
    } catch {}
  };

  const restablecer = () => {
    try {
      localStorage.removeItem(CLAVE_ACCESIBILIDAD);
    } catch {}
    const base = valoresDelSistema();
    setPref(base);
    aplicar(base);
  };

  const p = pref ?? valoresDelSistema();
  const interruptores: { clave: keyof Omit<Preferencias, "tamano">; texto: { nombre: string; descripcion: string } }[] = [
    { clave: "contraste", texto: textos.altoContraste },
    { clave: "movimiento", texto: textos.reducirMovimiento },
    { clave: "subrayar", texto: textos.subrayarEnlaces },
    { clave: "espaciado", texto: textos.espaciadoLectura },
  ];

  return (
    <div className={estilos.accesibilidad}>
      <button
        ref={boton}
        type="button"
        className={botones.botonIcono}
        aria-label={etiquetaBoton}
        aria-expanded={abierto}
        aria-controls={abierto ? id : undefined}
        onClick={() => {
          if (!abierto) setPref(leer());
          setAbierto(!abierto);
        }}
      >
        <Icono nombre="person" tamano={16} />
      </button>

      {abierto && (
        <div ref={panel} id={id} className={estilos.panelAccesibilidad} role="dialog" aria-labelledby={`${id}-titulo`} tabIndex={-1}>
          <div className={estilos.panelAccesibilidadCabecera}>
            <h2 id={`${id}-titulo`} className="titular-h4">
              {textos.titulo}
            </h2>
            <button
              type="button"
              className={`${botones.botonIcono} ${botones.botonIconoPlano}`}
              aria-label={cerrar}
              onClick={() => {
                setAbierto(false);
                boton.current?.focus();
              }}
            >
              <Icono nombre="x" tamano={16} />
            </button>
          </div>

          <p className={estilos.panelAccesibilidadSubtitulo}>{textos.tamanoTexto}</p>
          <div className={estilos.tamanoTexto}>
            <button
              type="button"
              className={`${botones.botonIcono} ${botones.botonIconoCuadrado}`}
              aria-label={textos.aria.disminuirTexto}
              disabled={p.tamano <= 0}
              onClick={() => cambiar({ tamano: p.tamano - 1 })}
            >
              <Icono nombre="minus" tamano={14} />
            </button>
            <span className={estilos.tamanoTextoMuestra} aria-live="polite">
              <span style={{ fontSize: `${(TAMANOS[p.tamano] / 100) * 16}px` }}>{textos.muestraTamano}</span>
              <span className="solo-lectores">{TAMANOS[p.tamano]} %</span>
            </span>
            <button
              type="button"
              className={`${botones.botonIcono} ${botones.botonIconoCuadrado}`}
              aria-label={textos.aria.aumentarTexto}
              disabled={p.tamano >= TAMANOS.length - 1}
              onClick={() => cambiar({ tamano: p.tamano + 1 })}
            >
              <Icono nombre="plus" tamano={14} />
            </button>
          </div>

          <ul className={estilos.panelAccesibilidadOpciones}>
            {interruptores.map(({ clave, texto }) => (
              <li key={clave} className={estilos.interruptorFila}>
                <span>
                  <span className={estilos.interruptorFilaNombre} id={`${id}-${clave}`}>
                    {texto.nombre}
                  </span>
                  <span className={estilos.interruptorFilaDescripcion} id={`${id}-${clave}-d`}>
                    {texto.descripcion}
                  </span>
                </span>
                <button
                  type="button"
                  role="switch"
                  className={campos.interruptor}
                  aria-checked={p[clave]}
                  aria-labelledby={`${id}-${clave}`}
                  aria-describedby={`${id}-${clave}-d`}
                  onClick={() => cambiar({ [clave]: !p[clave] })}
                />
              </li>
            ))}
          </ul>

          <p className={estilos.panelAccesibilidadNota}>{textos.nota}</p>
          <div className={estilos.panelAccesibilidadPie}>
            <a href={RUTAS.accesibilidad} className={botones.enlaceSubrayado}>
              {textos.enlaces.declaracion}
            </a>
            <button type="button" className={`${botones.boton} ${botones.botonSecundario} ${botones.botonPequeno}`} onClick={restablecer}>
              {textos.botones.restablecer}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
