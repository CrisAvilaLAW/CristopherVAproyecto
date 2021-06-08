import {
  getAuth
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaUsuario,
  selectTenis
} from "./usuarios.js";
import {
  subeStorage
} from "../lib/storage.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const listaRoles = document.
  querySelector("#listaRoles");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
    selectTenis(
      forma.tenisId, "");
    checksRoles(listaRoles, []);
  }
}

/** 
 * @param {Event} evt
 * @param {FormData} formData */
async function guarda(evt) {
  const formData =
    new FormData(forma);
  const id = getString(
    formData, "cue").trim();
  await guardaUsuario(evt,
    formData, id);
  const avatar =
      formData.get("avatar");
    await subeStorage(id, avatar);
}
