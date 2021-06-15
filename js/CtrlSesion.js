import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";
import {
  iniciaSesión,
  terminaSesión
} from "./seguridad.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.
  querySelector("#avatar");

/* Escucha cambios de usuario.
 * El primer parámetro es una
 * función que se invoca cada que
 * hay un cambio de usuario y
 * recibe los datos del usuario.
 * El segundo parámetro es una
 * función que se invoca cuando se
 * presenta un error en un cambio
 * de usuario y recibe un Error.
 */
getAuth().onAuthStateChanged(
  muestraSesión, muestraError);

/** Muestra los datos del usuario
 * o manda a iniciar sesión en
 * caso de que no haya empezado.
 * @param {import(
    "../lib/tiposFire").
    User} usuario modelo con las
 *    características del usuario
 *    o null si no ha iniciado
 *    sesión. */
async function
  muestraSesión(usuario) {
  if (usuario && usuario.email) {
    // Usuario aceptado.
    forma.email.value =
      usuario.email || "";
    forma.nombre.value =
      usuario.displayName || "";
    avatar.src =
      usuario.photoURL || "";
      const data = doc.data();
      buscaTenis(
      data.tenisId);
     
    forma.terminarSesión.
      addEventListener(
        "click", terminaSesión);
  } else {
    // No ha iniciado sesión.
    iniciaSesión();
  }
}

/** Recupera el html de un
 * tenis en base a su id.
 * @param {string} id */
 async function
 buscaTenis(id) {
 if (id) {
   const doc =
     await daoTenis.
       doc(id).
       get();
   if (doc.exists) {
     /**
      * @type {import(
         "./tipos.js").
           Tenis} */
     const data = doc.data();
     forma.modelo.value = cod(data.modelo);
    }
 }
 return "-- Sin tenis favorito --";
}
