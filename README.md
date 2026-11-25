# Taquilla · Proyecto final Frontend

Sitio de eventos y boletería hecho con **Next.js 16 (App Router)**, **React 19** y **TypeScript**. Consume la API de prueba del curso y sigue el diseño de Figma (escritorio de 1440 px y móvil de 390 px).

- Diseño: https://www.figma.com/design/RrMxUHfYCBQKcH3OwG4mdb
- API: https://yanethm-taquilla-api.fly.dev/api/v1
- Documentación de la API: https://yanethm-taquilla-api.fly.dev/docs · [Contrato](https://yanethm-taquilla-api.fly.dev/docs/contrato)

## Cómo ejecutarlo

```bash
npm install
```

Copia `.env.example` como `.env.local` y revisa los valores. **`API_URL` es obligatoria**: la dirección de la API no está escrita en el código y, si falta, la aplicación muestra un error que lo indica. En Vercel, define las mismas variables en *Settings → Environment Variables*.

| Variable | Obligatoria | Para qué |
| --- | --- | --- |
| `API_URL` | Sí | Dirección base de la API |
| `CIUDAD_PREDETERMINADA` | No | Ciudad del inicio si la API no devuelve ciudades |
| `API_SIMULAR_LATENCIA` / `API_SIMULAR_ERROR` | No | Simular estados de carga y error |

```bash
npm run dev
```

Abre http://localhost:3000.

## Sprint 1 (terminado)

| Vista | Ruta | Qué hace |
| --- | --- | --- |
| Inicio público | `/` | Hero con buscador y evento principal, categorías, destacados, próximos por ciudad. En móvil: chips, carrusel y "Este fin de semana" |
| Explorar eventos | `/explorar` | Filtros por categoría, fecha, ciudad y precio guardados en la URL; orden; paginación; estado vacío |

En todas las vistas: textos en español e inglés desde `GET /textos`, aviso de cookies, panel de accesibilidad, menú móvil y estados de carga, vacío y error.

## Sprint 2

| Vista | Ruta | Qué hace |
| --- | --- | --- |
| Detalle de evento | `/eventos/[slug]` | Afiche, datos con hora de puertas, descripción, cómo llegar (parqueadero y enlace al mapa), políticas y eventos relacionados. Esqueleto de carga, error con Reintentar y página de no encontrado |
| Iniciar sesión | `/ingresar` | Validación por campo, contraseña visible u oculta, estado "Ingresando…", credenciales incorrectas, espera por demasiados intentos y error de conexión |
| Sesión | Todo el sitio | Menú de cuenta, cerrar sesión y aviso de sesión terminada |

El token de la API se guarda en una cookie `httpOnly` del sitio. Si la API responde 401, `/sesion-vencida` borra la cookie y lleva a ingresar con el aviso "Tu sesión terminó"; después de ingresar se vuelve a la página en la que estaba la persona.


## Estructura

```
src/
├── app/                 Rutas (App Router): (sitio) con barra y pie, (cuenta) a pantalla completa,
│                        estados de carga y error, Server Actions y globals.css (única hoja de estilos)
├── components/
│   ├── layout/          Navbar, menú móvil y de cuenta, accesibilidad, idioma, pie, cookies
│   ├── inicio/          Solo del inicio
│   ├── explorar/        Solo de Explorar: filtros y orden
│   ├── detalle/         Solo del detalle: datos, descripción, cómo llegar, políticas, esqueleto
│   ├── cuenta/          Formulario y portada de ingreso
│   ├── compartidos/     Usados en varias páginas: tarjetas, afiche, estados, errores, iconos
│   └── ui/              Piezas base: botones, etiquetas, campos y avisos
├── hooks/               Hooks propios
└── lib/
    ├── config.ts        Variables de entorno (único archivo que lee process.env)
    ├── rutas.ts         Rutas internas del sitio
    ├── api.ts           Cliente de la API: endpoints, errores del contrato, tipos y caché
    ├── textos.ts        Idioma y textos de la interfaz (cookie `idioma`)
    ├── filtros.ts       Filtros de Explorar ⇄ URL ⇄ parámetros de la API
    ├── formato.ts       Precios, fechas en hora de Colombia, plurales
    └── sesion.ts        Usuario y estado de la sesión (token en cookie httpOnly)
```
