"use client";

import BotonIcono from "@/components/ui/BotonIcono";

interface Props {
  titulo: string;
  etiqueta: string;
  className?: string;
}

/**
 * Comparte el evento con el menú nativo del teléfono (Web Share API).
 * Si el navegador no lo tiene, copia la dirección al portapapeles.
 */
export default function BotonCompartir({ titulo, etiqueta, className }: Props) {
  const compartir = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: titulo, url });
      else await navigator.clipboard.writeText(url);
    } catch {
      // La persona canceló el menú de compartir: no hay nada que hacer.
    }
  };
  return <BotonIcono icono="share" tamanoIcono={20} etiqueta={etiqueta} className={className} onClick={compartir} />;
}
