import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTextos } from "@/lib/textos";
import { getUsuario } from "@/lib/sesion";
import { RUTAS } from "@/lib/rutas";
import Logo from "@/components/layout/Logo";
import PortadaCuenta from "@/components/cuenta/PortadaCuenta";
import FormularioIngreso from "@/components/cuenta/FormularioIngreso";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = (await getTextos()).paginas.ingresar;
  return { title: seo.titulo, description: seo.descripcion };
}

export default async function Ingresar({ searchParams }: PageProps<"/ingresar">) {
  const [textos, usuario, parametros] = await Promise.all([getTextos(), getUsuario(), searchParams]);
  // Con la sesión ya iniciada no tiene sentido volver a ingresar.
  if (usuario) redirect(RUTAS.inicio);

  const t = textos.paginas.ingresar;
  const errores = textos.errores as Record<string, string>;
  const siguiente = typeof parametros.siguiente === "string" ? parametros.siguiente : undefined;

  return (
    <div className="ingresar">
      <PortadaCuenta
        logo={textos.navbar.logo}
        lema={t.presentacion.lema}
        beneficios={Object.values(t.presentacion.beneficios)}
      />
      <div className="ingresar-formulario">
        <div className="ingresar-logo-movil">
          <Logo texto={textos.navbar.logo.texto} aria={textos.navbar.logo.aria} />
        </div>
        <FormularioIngreso
          siguiente={siguiente}
          textos={{
            ...t.formulario,
            botones: { ...t.formulario.botones, reintentar: t.errores.conexion.botones.reintentar },
            errores: {
              camposObligatorios: t.errores.camposObligatorios,
              correoObligatorio: t.errores.correoObligatorio,
              claveObligatoria: t.errores.claveObligatoria,
              correoInvalido: textos.formularios.validacion.correoInvalido,
              revisaCampo: textos.formularios.validacion.revisaCampo,
              credenciales: t.errores.credenciales,
              demasiadosIntentos: t.errores.demasiadosIntentos,
              conexion: t.errores.conexion,
              generico: { titulo: textos.estados.error.titulo, texto: errores.generico ?? textos.estados.error.texto },
            },
          }}
        />
      </div>
    </div>
  );
}
