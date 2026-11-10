# Taquilla · Proyecto final Frontend

Sitio de eventos y boletería hecho con **Next.js 16 (App Router)**, **React 19** y **TypeScript**. Consume la API de prueba del curso y sigue el diseño de Figma (escritorio de 1440 px y móvil de 390 px).

- Diseño: https://www.figma.com/design/RrMxUHfYCBQKcH3OwG4mdb
- API: https://yanethm-taquilla-api.fly.dev/api/v1
- Documentación de la API: https://yanethm-taquilla-api.fly.dev/docs · [Contrato](https://yanethm-taquilla-api.fly.dev/docs/contrato)

## Cómo ejecutarlo

```bash
npm install
```

```bash
npm run dev
```

Abre http://localhost:3000. Sin configurar nada usa la API del curso. Para cambiarla o simular estados de carga y error, copia `.env.example` como `.env.local`.

## Sprint 1 (terminado)

| Vista | Ruta | Qué hace |
| --- | --- | --- |
| Inicio público | `/` | Hero con buscador y evento principal, categorías, destacados, próximos por ciudad. En móvil: chips, carrusel y "Este fin de semana" |
| Explorar eventos | `/eventos` | Filtros por categoría, fecha, ciudad y precio guardados en la URL; orden; paginación; estado vacío |

En todas las vistas: textos en español e inglés desde `GET /textos`, aviso de cookies, panel de accesibilidad, menú móvil y estados de carga, vacío y error.

## Estructura

```
src/
├── app/                 Rutas (App Router), layout, estados de carga y error, Server Actions
├── components/          Componentes de la interfaz (navbar, tarjetas, filtros, accesibilidad…)
└── lib/
    ├── api.ts           Cliente de la API: errores del contrato, tipos y caché por endpoint
    ├── textos.ts        Idioma y textos de la interfaz (cookie `idioma`)
    ├── filtros.ts       Filtros de Explorar ⇄ URL ⇄ parámetros de la API
    ├── formato.ts       Precios, fechas en hora de Colombia, plurales
    └── sesion.ts        Usuario de la sesión (token en cookie httpOnly)
postman/                 Colección y entorno de Postman de la API
```

## Postman

En [`postman/`](postman) está la colección con los endpoints que usa el frontend, agrupados por vista, y un entorno con la dirección de la API y la cuenta de prueba del contrato.

1. En Postman: **Import** → arrastra `Taquilla.postman_collection.json` y `Taquilla.postman_environment.json`.
2. Arriba a la derecha elige el entorno **Taquilla · API de prueba**.
3. Ejecuta la colección completa con **Run collection**. Hay que ejecutarla en orden: algunas peticiones guardan variables para las siguientes (`slug`, `token`, `codigoVerificacion`).

| Carpeta | Endpoints |
| --- | --- |
| 1. Idioma y textos | `GET /idiomas`, `GET /textos` (es, en, error 400) |
| 2. Inicio | `GET /eventos/destacados`, `GET /categorias`, `GET /eventos?ciudad=` |
| 3. Explorar | `GET /ciudades`, `GET /eventos` con filtros, orden, paginación y estado vacío |
| 4. Detalle | `GET /eventos/:slug`, `GET /eventos/:slug/relacionados`, error 404 |
| 5. Sesión | `POST /sesion`, `GET /sesion` con token, `DELETE /sesion`, errores 401 |
| 6. Registro | `POST /usuarios`, `POST /verificacion`, errores 409, 422 y 400 |
| 7. Estados | Cabeceras `X-Simular-Latencia` y `X-Simular-Error` |

Cada petición tiene pruebas que comprueban lo que la interfaz necesita: códigos de estado, forma de los errores `{ error: { codigo, mensaje, campos } }`, filtros y orden. También se puede ejecutar desde la terminal:

```bash
npx newman run postman/Taquilla.postman_collection.json -e postman/Taquilla.postman_environment.json
```

La API se apaga cuando nadie la usa: la primera petición puede tardar unos segundos.
