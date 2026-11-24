"use client";

import { useId, useState } from "react";
import { RUTAS } from "@/lib/rutas";
import { ATRIBUTOS, CLAVE_ACCESIBILIDAD, TAMANO_INICIAL, TAMANOS, type Interruptor, type Preferencias } from "@/lib/accesibilidad";
import { useDialogo } from "@/hooks/useDialogo";
import Boton from "@/components/ui/Boton";
import BotonIcono from "@/components/ui/BotonIcono";

function valoresDelSistema(): Preferencias {
  const consulta = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;
  return {
    tamano: TAMANO_INICIAL,
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
  for (const clave of Object.keys(ATRIBUTOS) as Interruptor[]) html.toggleAttribute(ATRIBUTOS[clave], p[clave]);
}

type TextoInterruptor = { nombre: string; descripcion: string };

export interface TextosAccesibilidad {
  titulo: string;
  tamanoTexto: string;
  muestraTamano: string;
  altoContraste: TextoInterruptor;
  reducirMovimiento: TextoInterruptor;
  subrayarEnlaces: TextoInterruptor;
  espaciadoLectura: TextoInterruptor;
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

export default function Accesibilidad({ textos, etiquetaBoton, cerrar: textoCerrar }: Props) {
  const { abierto, setAbierto, cerrar, boton, panel } = useDialogo({ cerrarAlClicFuera: true });
  const [pref, setPref] = useState<Preferencias | null>(null);
  const id = useId();

  const guardar = (nuevas: Preferencias) => {
    setPref(nuevas);
    aplicar(nuevas);
    try {
      localStorage.setItem(CLAVE_ACCESIBILIDAD, JSON.stringify(nuevas));
    } catch {}
  };

  const cambiar = (cambios: Partial<Preferencias>) => guardar({ ...(pref ?? leer()), ...cambios });

  const restablecer = () => {
    try {
      localStorage.removeItem(CLAVE_ACCESIBILIDAD);
    } catch {}
    const base = valoresDelSistema();
    setPref(base);
    aplicar(base);
  };

  const alternar = () => {
    if (!abierto) setPref(leer());
    setAbierto(!abierto);
  };

  const p = pref ?? valoresDelSistema();
  const interruptores: { clave: Interruptor; texto: TextoInterruptor }[] = [
    { clave: "contraste", texto: textos.altoContraste },
    { clave: "movimiento", texto: textos.reducirMovimiento },
    { clave: "subrayar", texto: textos.subrayarEnlaces },
    { clave: "espaciado", texto: textos.espaciadoLectura },
  ];

  return (
    <div className="accesibilidad">
      <BotonIcono
        ref={boton}
        icono="person"
        etiqueta={etiquetaBoton}
        aria-expanded={abierto}
        aria-controls={abierto ? id : undefined}
        onClick={alternar}
      />

      {abierto && (
        <div ref={panel} id={id} className="panel-accesibilidad" role="dialog" aria-labelledby={`${id}-titulo`} tabIndex={-1}>
          <div className="panel-accesibilidad-cabecera">
            <h2 id={`${id}-titulo`} className="titular-h4">
              {textos.titulo}
            </h2>
            <BotonIcono icono="x" variante="plano" etiqueta={textoCerrar} onClick={cerrar} />
          </div>

          <p className="panel-accesibilidad-subtitulo">{textos.tamanoTexto}</p>
          <div className="tamano-texto">
            <BotonIcono
              icono="minus"
              tamanoIcono={14}
              variante="cuadrado"
              etiqueta={textos.aria.disminuirTexto}
              disabled={p.tamano <= 0}
              onClick={() => cambiar({ tamano: p.tamano - 1 })}
            />
            <span className="tamano-texto-muestra" aria-live="polite">
              <span style={{ fontSize: `${(TAMANOS[p.tamano] / 100) * 16}px` }}>{textos.muestraTamano}</span>
              <span className="solo-lectores">{TAMANOS[p.tamano]} %</span>
            </span>
            <BotonIcono
              icono="plus"
              tamanoIcono={14}
              variante="cuadrado"
              etiqueta={textos.aria.aumentarTexto}
              disabled={p.tamano >= TAMANOS.length - 1}
              onClick={() => cambiar({ tamano: p.tamano + 1 })}
            />
          </div>

          <ul className="panel-accesibilidad-opciones">
            {interruptores.map(({ clave, texto }) => (
              <li key={clave} className="interruptor-fila">
                <span>
                  <span className="interruptor-fila-nombre" id={`${id}-${clave}`}>
                    {texto.nombre}
                  </span>
                  <span className="interruptor-fila-descripcion" id={`${id}-${clave}-d`}>
                    {texto.descripcion}
                  </span>
                </span>
                <button
                  type="button"
                  role="switch"
                  className="interruptor"
                  aria-checked={p[clave]}
                  aria-labelledby={`${id}-${clave}`}
                  aria-describedby={`${id}-${clave}-d`}
                  onClick={() => cambiar({ [clave]: !p[clave] })}
                />
              </li>
            ))}
          </ul>

          <p className="panel-accesibilidad-nota">{textos.nota}</p>
          <div className="panel-accesibilidad-pie">
            <a href={RUTAS.accesibilidad} className="enlace-subrayado">
              {textos.enlaces.declaracion}
            </a>
            <Boton variante="secundario" tamano="pequeno" onClick={restablecer}>
              {textos.botones.restablecer}
            </Boton>
          </div>
        </div>
      )}
    </div>
  );
}
