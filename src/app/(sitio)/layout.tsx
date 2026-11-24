import MarcoSitio from "@/components/layout/MarcoSitio";

// Inicio, Explorar y el detalle de un evento: con barra de navegación y pie de página.
export default function LayoutSitio({ children }: { children: React.ReactNode }) {
  return <MarcoSitio>{children}</MarcoSitio>;
}
