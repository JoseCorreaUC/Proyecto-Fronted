import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { unirClases } from "./Boton";

export interface PropsCampo extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  etiqueta: string;
  /** Mensaje de error debajo del campo; también marca el campo en rojo. */
  error?: string;
  /** Algo dentro de la caja, a la derecha (por ejemplo el botón de mostrar la contraseña). */
  accesorio?: ReactNode;
}

/** Campo de formulario del sistema de diseño: etiqueta, caja de 48 px y mensaje de error. */
export default function Campo({ etiqueta, error, accesorio, className, ...entrada }: PropsCampo) {
  const id = useId();
  const idError = `${id}-error`;
  return (
    <div className={unirClases("campo-formulario", error && "campo-formulario-error", className)}>
      <label htmlFor={id} className="campo-formulario-etiqueta">
        {etiqueta}
      </label>
      <div className="campo-formulario-caja">
        <input id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? idError : undefined} {...entrada} />
        {accesorio}
      </div>
      {error && (
        <p id={idError} className="campo-formulario-mensaje">
          {error}
        </p>
      )}
    </div>
  );
}
