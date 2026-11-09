import Link from 'next/link';

// 1. EL MOLDE EXACTO: Usamos la estructura que descubriste en Postman
interface Evento {
  id: string;
  titulo: string;
  categoria: string;
  fecha: string; // Viene en formato ISO "2026-11-11T00:45:00.000Z"
  precioDesde: number;
  recinto: {
    nombre: string;
    ciudad: string;
  };
  afiche: {
    color1: string;
    color2: string;
  };
}

// 2. CONEXIÓN A LA API
async function getEventos(): Promise<Evento[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://yanethm-taquilla-api.fly.dev/api/v1';
  
  try {
    const res = await fetch(`${apiUrl}/eventos`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al conectar con la API');
    
    const data = await res.json();
    // Validamos por si la API devuelve directamente el array o lo envuelve en un objeto
    return Array.isArray(data) ? data : (data.data || data.eventos || []);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 3. LA VISTA PRINCIPAL
export const dynamic = 'force-dynamic';

export default async function Home() {
  const eventos = await getEventos();

  // Función para volver la fecha a texto legible (Ej. "Mié, 11 nov. 7:45 p.m.")
  const formatearFecha = (fechaIso: string) => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-CO', { 
      weekday: 'short', month: 'short', day: 'numeric', 
      hour: 'numeric', minute: '2-digit' 
    });
  };

  // Función para poner los puntos de miles al precio
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO').format(precio);
  };

  return (
    <section className="inicio-container">
      {/* Sección Hero */}
      <div className="hero-section">
        <span className="hero-badge">Temporada nov - dic 2026</span>
        <h1 className="hero-title">Tu próxima noche empieza aquí</h1>
        <p className="hero-subtitle">
          Conciertos, teatro, deportes y festivales. Busca por categoría, fecha o ciudad y consulta todos los detalles de cada evento.
        </p>
      </div>

      {/* Sección de eventos destacados */}
      <div className="eventos-section">
        <div className="section-header">
          <h2>Destacados de la semana</h2>
          <Link href="/eventos" className="ver-todos">Ver todos ➔</Link>
        </div>
        <p className="section-subtitle">Los eventos con más entradas vendidas en los últimos 7 días</p>

        {/* Cuadrícula de Tarjetas */}
        <div className="eventos-grid">
          {eventos.length === 0 ? (
            <p>Cargando eventos o no hay eventos disponibles...</p>
          ) : (
            eventos.slice(0, 4).map((evento) => ( // Cortamos para mostrar solo 4 en el inicio
              <div key={evento.id} className="evento-card">
                
                {/* Degradado generado usando los colores exactos de la API (afiche) */}
                <div 
                  className="evento-img" 
                  style={{ 
                    background: `linear-gradient(135deg, ${evento.afiche.color1}, ${evento.afiche.color2})` 
                  }}
                ></div>
                
                <div className="evento-info">
                  <span className="categoria-badge" style={{ textTransform: 'capitalize' }}>
                    {evento.categoria}
                  </span>
                  <h3>{evento.titulo}</h3>
                  <p className="evento-meta">🗓️ {formatearFecha(evento.fecha)}</p>
                  <p className="evento-meta">📍 {evento.recinto.nombre}, {evento.recinto.ciudad}</p>
                  
                  <div className="evento-footer">
                    <div className="precio-container">
                      <span className="precio-label">Desde</span>
                      <span className="precio-valor">${formatearPrecio(evento.precioDesde)}</span>
                    </div>
                    <button className="btn btn-outline">Ver evento</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}