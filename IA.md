# Uso de herramientas de IA en el proyecto

Durante el desarrollo de Taquilla utilicé dos herramientas de IA como apoyo: GitHub Copilot en los primeros commits (8 de noviembre de 2026) y Claude Code (Anthropic) durante el Sprint 1 (9 de noviembre de 2026). Las usé para agilizar el análisis, la implementación y la revisión, pero la definición del alcance, las decisiones técnicas y la validación de cada funcionalidad quedaron bajo mi responsabilidad.

Ninguna propuesta se aceptó sin revisarla. Cada cambio se contrastó con los criterios del sprint, el diseño de Figma (escritorio de 1440 px y móvil de 390 px) y el contrato de la API del curso. Los commits en los que intervino una herramienta de IA lo indican con la línea `Co-Authored-By` correspondiente.

A continuación documento los casos más representativos.

### 1. Corrección de la compilación con rutas dinámicas

**Fecha:** 8 de noviembre de 2026. **Herramienta:** GitHub Copilot.

Al compilar el proyecto, Next.js fallaba por dos motivos: Turbopack tomaba como raíz una carpeta superior a la aplicación y la página de eventos, que no usa caché, se intentaba generar de forma estática.

**Corrección (commit `3a5af7e`):** fijé la raíz de Turbopack en `next.config.ts` con `turbopack.root` y marqué la página como dinámica con `export const dynamic = 'force-dynamic'`.

**Validación:** volví a ejecutar la compilación de producción para confirmar que el error desaparecía.

### 2. Análisis de requisitos e implementación del Sprint 1

**Fecha:** 9 de noviembre de 2026. **Herramienta:** Claude Code.

Antes de implementar revisé el contrato de la API, las notas de cada pantalla en Figma y el paquete de diseño (tokens, iconos y logo). De esa revisión salieron decisiones que guiaron todo el sprint:

- Todos los textos de la interfaz se piden a `GET /textos` en español e inglés; no hay texto fijo en los componentes.
- Las listas de la API llegan en `{ datos: [...] }` y los errores en `{ error: { codigo, mensaje, campos } }`, así que el cliente (`src/lib/api.ts`) traduce esos errores a un tipo propio.
- La API de prueba se apaga cuando no se usa y la primera conexión puede fallar, por lo que los `GET` se reintentan una vez.
- La sesión se guarda en una cookie `httpOnly` mediante una Server Action, nunca en `localStorage`.

**Resultado (commit `7de5cd3`):** Inicio público y Explorar eventos con filtros guardados en la URL, orden, paginación y estados de carga, vacío y error; además navbar, menú móvil, pie, aviso de cookies y panel de accesibilidad.

**Validación:** probé los estados de carga y error con las variables `API_SIMULAR_LATENCIA` y `API_SIMULAR_ERROR`, que envían las cabeceras `X-Simular-Latencia` y `X-Simular-Error` a la API.

### 3. Respuesta equivocada de la IA: el rango de precios en Explorar

**Fecha:** 9 de noviembre de 2026. **Herramienta:** Claude Code.

El diseño ubica la vista Explorar en `/explorar`, pero inicialmente estaba en `/eventos`. Al pedir el cambio de ruta (commit `746d68a`), Claude Code renombró también, por error, la ruta de la API que usa la página para calcular el rango de precios: pasó de `GET /eventos` a `GET /explorar`, un endpoint que no existe en el contrato.

Como la función capturaba el error sin registrarlo, la página no fallaba: el control de precio mostraba en silencio los valores de respaldo (0 a 200 000). Lo detecté al revisar Explorar y notar que los extremos del filtro no correspondían al catálogo.

**Corrección (commit `94511ab`):** restablecí `GET /eventos` como fuente del rango y agregué un `console.error` para que, si la petición vuelve a fallar, el error quede registrado en el servidor en lugar de ocultarse.

A partir de este caso reviso que un cambio de rutas del frontend no altere las rutas de la API.

### 4. Ajustes de interfaz frente al diseño de Figma

**Fecha:** 9 de noviembre de 2026. **Herramienta:** Claude Code.

Al comparar la aplicación con Figma encontré dos diferencias:

- El aviso de cookies no estaba en la posición del diseño, que lo muestra centrado a media altura.
- El menú móvil no se comportaba como en el diseño, donde sale desde la derecha por encima de la página.

**Corrección (commit `285055b`):** centré el aviso de cookies y convertí el menú móvil en un panel lateral con fondo oscuro que se cierra al tocarlo y devuelve el foco al botón que lo abrió, para no perder la navegación con teclado.

### 5. Organización del repositorio y despliegue

**Fecha:** 9 de noviembre de 2026. **Herramienta:** Claude Code.

- **Peticiones visibles en desarrollo:** como las peticiones a la API se hacen en Server Components, no aparecen en la pestaña Red del navegador. Activé `logging.fetches.fullUrl` en `next.config.ts` para que la terminal de `npm run dev` muestre cada petición con su URL completa.
- **Redirección:** `/eventos` redirige a `/explorar` conservando los filtros, y `/eventos/:slug` queda libre para el detalle del evento.
- **Postman fuera del repositorio:** la colección de Postman se agregó primero al proyecto (commit `2457d25`) y luego la moví a la carpeta de recursos (commit `0d2262e`), porque es material de apoyo y no parte del código.
- **Despliegue bloqueado en Vercel:** los commits tenían un correo de autor que GitHub no reconocía y Vercel bloqueaba el despliegue. Corregí el autor y hice un commit vacío (commit `49b9220`) para volver a desplegar.

---

### Decisiones de diseño y desarrollo bajo mi criterio

- **Rutas según el diseño:** mantuve `/explorar` como ruta de la vista, como indica Figma, en lugar de la ruta que usé al principio.
- **Sin fotografías:** el paquete de diseño no incluye imágenes de eventos, así que los afiches se construyen con degradados CSS y SVG.
- **Accesibilidad:** agregué un panel de accesibilidad y cuidé el manejo del foco en el menú móvil, aunque Figma no detalla ese comportamiento.
- **Rutas del docente:** no usé las rutas `/docente/*` de la API, que son exclusivas del docente.

### Consideraciones finales

Las herramientas de IA redujeron el tiempo dedicado a tareas repetitivas y aceleraron la implementación, pero no reemplazaron el análisis de requisitos ni la revisión del resultado. El caso del rango de precios muestra por qué: un cambio aparentemente correcto introdujo un error silencioso que solo se encontró al contrastar la aplicación con los datos reales.

La responsabilidad sobre el alcance, las decisiones técnicas, la integración del código y la verificación del producto permaneció bajo mi criterio y supervisión.
