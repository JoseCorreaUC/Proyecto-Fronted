import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* Lado izquierdo: Logo y Links */}
        <div className="navbar-left">
          <Link href="/" className="logo">
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>taquilla</span>
          </Link>
          <ul className="nav-links desktop-only">
            <li><Link href="/" className="active">Inicio</Link></li>
            <li><Link href="/eventos">Explorar</Link></li>
          </ul>
        </div>

        {/* Centro: Buscador (Solo Web) */}
        <div className="navbar-center desktop-only">
          <div className="search-input">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Busca eventos o artistas" />
          </div>
        </div>

        {/* Lado derecho: Acciones y botones */}
        <div className="navbar-right">
          {/* Botones globales (Solo Web) */}
          <div className="global-actions desktop-only">
            <button className="icon-btn accessibility-btn" aria-label="Accesibilidad">
              ♿
            </button>
            <div className="lang-toggle">
              <button className="lang-btn active">ES</button>
              <button className="lang-btn">EN</button>
            </div>
          </div>

          <button className="btn btn-outline desktop-only">Ingresar</button>
          {/* En móvil, 'Ingresar' es texto simple según el diseño, aquí usamos la clase base */}
          <button className="btn btn-primary desktop-only">Crear cuenta</button>

          {/* Iconos móviles */}
          <button className="icon-btn mobile-only" aria-label="Buscar">🔍</button>
          <button className="mobile-only btn-text">Ingresar</button>
          <button className="icon-btn mobile-only" aria-label="Menú">☰</button>
        </div>
      </nav>
    </header>
  );
}