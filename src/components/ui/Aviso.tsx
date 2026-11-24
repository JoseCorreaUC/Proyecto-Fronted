import Icono from "@/components/compartidos/Icono";

interface Props {
  titulo: string;
  texto: string;
}

/** Aviso de error de un formulario (Figma: fondo rojo suave, borde rojo, icono de alerta). */
export default function Aviso({ titulo, texto }: Props) {
  return (
    <div className="aviso aviso-error" role="alert">
      <Icono nombre="alert" tamano={20} />
      <div className="aviso-contenido">
        <p className="aviso-titulo">{titulo}</p>
        <p className="aviso-texto">{texto}</p>
      </div>
    </div>
  );
}
