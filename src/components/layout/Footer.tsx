import Link from "next/link";
import type { Textos } from "@/lib/textos";
import { fmt } from "@/lib/formato";
import Logo from "./Logo";
import { RUTAS } from "@/lib/rutas";

export default function Footer({ textos }: { textos: Textos }) {
  const f = textos.footer;
  const columnas = [
    {
      titulo: f.columnas.explora.titulo,
      enlaces: [
        { href: RUTAS.inicio, texto: f.columnas.explora.enlaces.inicio },
        { href: RUTAS.explorar, texto: f.columnas.explora.enlaces.explorar },
      ],
    },
    {
      titulo: f.columnas.cuenta.titulo,
      enlaces: [
        { href: RUTAS.ingresar, texto: f.columnas.cuenta.enlaces.ingresar },
        { href: RUTAS.registro, texto: f.columnas.cuenta.enlaces.crearCuenta },
      ],
    },
    {
      titulo: f.columnas.legal.titulo,
      enlaces: [
        { href: RUTAS.terminos, texto: f.columnas.legal.enlaces.terminos },
        { href: RUTAS.accesibilidad, texto: f.columnas.legal.enlaces.accesibilidad },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="contenedor">
        <div className="footer-superior">
          <div className="footer-marca">
            <Logo texto={textos.navbar.logo.texto} aria={textos.navbar.logo.aria} variante="inverso" />
            <p>{f.lema}</p>
          </div>
          <div className="footer-columnas">
            {columnas.map((columna) => (
              <nav key={columna.titulo} aria-label={columna.titulo}>
                <h2 className="footer-titulo">{columna.titulo}</h2>
                <ul>
                  {columna.enlaces.map((enlace) => (
                    <li key={enlace.href}>
                      <Link href={enlace.href}>{enlace.texto}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="footer-inferior">
          <p>{fmt(f.legal.derechos, { anio: new Date().getFullYear() })}</p>
          <p>{f.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}
