"use client";

import { useState } from 'react';
import es from '../../locales/es.json';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Usamos el diccionario de español por defecto para el banner
  const t = es; 

  // Si el usuario hace clic en Aceptar o Rechazar, el banner desaparece de la pantalla
  if (!isVisible) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <div className="cookie-content">
          <h3>{t.cookies.titulo}</h3>
          <p>{t.cookies.descripcion}</p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-outline" onClick={() => setIsVisible(false)}>
            {t.cookies.rechazar}
          </button>
          <button className="btn btn-primary" onClick={() => setIsVisible(false)}>
            {t.cookies.aceptar}
          </button>
        </div>
      </div>
    </div>
  );
}