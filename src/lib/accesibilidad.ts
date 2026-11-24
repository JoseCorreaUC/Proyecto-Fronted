// Preferencias del panel de accesibilidad. Se guardan en este dispositivo (localStorage)
// y se aplican como atributos en <html>. Lo usan el panel (cliente) y el script inicial del layout
// (servidor), así que los valores viven aquí una sola vez.

export const CLAVE_ACCESIBILIDAD = "taquilla-accesibilidad";
/** Tamaños de letra de <html> en %, de menor a mayor. La preferencia guarda el índice. */
export const TAMANOS = [87.5, 100, 112.5, 125, 150];
export const TAMANO_INICIAL = 1;

/** Atributo de <html> que activa cada interruptor (ver la sección de accesibilidad de globals.css). */
export const ATRIBUTOS = {
  contraste: "data-alto-contraste",
  movimiento: "data-reducir-movimiento",
  subrayar: "data-subrayar-enlaces",
  espaciado: "data-espaciado-lectura",
} as const;

export type Interruptor = keyof typeof ATRIBUTOS;
export type Preferencias = { tamano: number } & Record<Interruptor, boolean>;

/**
 * Script que aplica las preferencias guardadas antes de pintar, para que la página no "salte".
 * Se arma con las mismas constantes que usa el panel.
 */
export const scriptAccesibilidad = `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(CLAVE_ACCESIBILIDAD)})||"null");var m=function(q){return matchMedia(q).matches};var t=${JSON.stringify(TAMANOS)};var a=${JSON.stringify(ATRIBUTOS)};var h=document.documentElement;p=p||{tamano:${TAMANO_INICIAL},contraste:m("(prefers-contrast: more)"),movimiento:m("(prefers-reduced-motion: reduce)")};h.style.fontSize=(t[p.tamano]||100)+"%";for(var k in a){if(p[k])h.setAttribute(a[k],"")}}catch(e){}})();`;
