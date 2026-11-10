import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Las peticiones a la API se hacen en el servidor (Server Components), así que no aparecen
  // en la pestaña Red del navegador. Con esto, la terminal de `npm run dev` muestra cada una
  // con su URL completa, su estado de caché y su duración.
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      // La vista Explorar vive en /explorar (ruta del diseño). /eventos/:slug queda para el detalle.
      { source: "/eventos", destination: "/explorar", permanent: true },
    ];
  },
};

export default nextConfig;
