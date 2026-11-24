import Icono from "@/components/compartidos/Icono";
import Logo from "@/components/layout/Logo";

interface Props {
  logo: { texto: string; aria: string };
  lema: string;
  beneficios: string[];
}

/** Panel oscuro de las pantallas de cuenta (solo escritorio): logo, lema y beneficios. */
export default function PortadaCuenta({ logo, lema, beneficios }: Props) {
  return (
    <aside className="portada-cuenta">
      <Logo texto={logo.texto} aria={logo.aria} variante="inverso" />
      <div className="portada-cuenta-mensaje">
        <p className="portada-cuenta-lema">{lema}</p>
        <ul className="portada-cuenta-beneficios">
          {beneficios.map((b) => (
            <li key={b}>
              <span className="portada-cuenta-check">
                <Icono nombre="check" tamano={14} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
