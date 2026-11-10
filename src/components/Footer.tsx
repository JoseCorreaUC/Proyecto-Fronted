import Link from "next/link";
import type { Textos } from "@/lib/textos";
import { fmt } from "@/lib/formato";
import Logo from "./Logo";

export default function Footer({ textos }: { textos: Textos }) {
  const f = textos.footer;
  const columnas = [
    {
      titulo: f.columnas.explora.titulo,
      enlaces: [
        { href: "/", texto: f.columnas.explora.enlaces.inicio },
        { href: "/explorar", texto: f.columnas.explora.enlaces.explorar },
      ],
    },
    {
      titulo: f.columnas.cuenta.titulo,
      enlaces: [
        { href: "/ingresar", texto: f.columnas.cuenta.enlaces.ingresar },
        { href: "/registro", texto: f.columnas.cuenta.enlaces.crearCuenta },
      ],
    },
    {
      titulo: f.columnas.legal.titulo,
      enlaces: [
        { href: "/terminos", texto: f.columnas.legal.enlaces.terminos },
        { href: "/accesibilidad", texto: f.columnas.legal.enlaces.accesibilidad },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="contenedor">
        <div className="footer__superior">
          <div className="footer__marca">
            <Logo texto={textos.navbar.logo.texto} aria={textos.navbar.logo.aria} variante="inverso" />
            <p>{f.lema}</p>
          </div>
          <div className="footer__columnas">
            {columnas.map((columna) => (
              <nav key={columna.titulo} aria-label={columna.titulo}>
                <h2 className="footer__titulo">{columna.titulo}</h2>
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
        <div className="footer__inferior">
          <p>{fmt(f.legal.derechos, { anio: new Date().getFullYear() })}</p>
          <p>{f.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}
