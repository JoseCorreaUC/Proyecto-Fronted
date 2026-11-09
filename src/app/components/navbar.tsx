"use client";

import { useState } from 'react';
import Link from 'next/link';
import es from '../../locales/es.json';
import en from '../../locales/en.json';

export default function Navbar() {
  const [lang, setLang] = useState('es');
  const [showAccPanel, setShowAccPanel] = useState(false); // Controla si el panel se ve
  
  const t = lang === 'es' ? es : en;

  // Funciones reales de accesibilidad
  const aumentarTexto = () => { document.documentElement.style.fontSize = '110%'; };
  const disminuirTexto = () => { document.documentElement.style.fontSize = '90%'; };
  const toggleContraste = () => { document.body.classList.toggle('alto-contraste'); };
  const restablecer = () => { 
    document.documentElement.style.fontSize = '100%'; 
    document.body.classList.remove('alto-contraste');
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* Izquierda */}
        <div className="navbar-left">
          <Link href="/" className="logo">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>taquilla</span>
          </Link>
          <ul className="nav-links desktop-only">
            <li><Link href="/" className="active">{t.navbar.home}</Link></li>
            <li><Link href="/eventos">{t.navbar.explore}</Link></li>
          </ul>
        </div>

        {/* Centro */}
        <div className="navbar-center desktop-only">
          <div className="search-input">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder={t.navbar.searchPlaceholder} />
          </div>
        </div>

        {/* Derecha */}
        <div className="navbar-right">
          <div className="global-actions desktop-only">
            
            {/* Botón y Menú Desplegable de Accesibilidad */}
            <div style={{ position: 'relative' }}>
              <button 
                className="icon-btn accessibility-btn" 
                onClick={() => setShowAccPanel(!showAccPanel)}
                aria-label={t.navbar.accessibility}
              >
                ♿
              </button>

              {showAccPanel && (
                <div className="accessibility-panel">
                  <h4>{t.accesibilidad.titulo}</h4>
                  <div className="acc-buttons">
                    <button onClick={aumentarTexto}>{t.accesibilidad.aumentar}</button>
                    <button onClick={disminuirTexto}>{t.accesibilidad.disminuir}</button>
                    <button onClick={toggleContraste}>{t.accesibilidad.contraste}</button>
                    <button onClick={restablecer} className="acc-reset">{t.accesibilidad.restablecer}</button>
                  </div>
                </div>
              )}
            </div>

            {/* Selector de idioma */}
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>

          <button className="btn btn-outline desktop-only">{t.navbar.login}</button>
          <button className="btn btn-primary desktop-only">{t.navbar.signup}</button>
        </div>
      </nav>
    </header>
  );
}