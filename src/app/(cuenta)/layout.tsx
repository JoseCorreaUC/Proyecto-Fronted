// Pantallas de cuenta (ingresar; en el Sprint 3 también registro y recuperación): a pantalla
// completa, sin barra ni pie, como en el Figma.
export default function LayoutCuenta({ children }: { children: React.ReactNode }) {
  return (
    <main id="contenido" tabIndex={-1} className="pantalla-cuenta">
      {children}
    </main>
  );
}
