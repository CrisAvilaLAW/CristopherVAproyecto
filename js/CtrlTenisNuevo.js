import {
  getAuth,
  getFirestore
} from "../lib/fabricaa.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraTenis
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  guardaUsuario
} from "./teniss.js";

  /** @type {HTMLFormElement} */
  const forma = document["forma"];

const daoTenis =
  getFirestore().
    collection("Tenis");
/** @type {HTMLFormElement} */
const forma = document["forma"];
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
  }
}

/** @param {Event} evt 
* @param {FormData} formaData */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const marca = getString(
      formData, "marca").trim();
    const modelo = getString(
      formData, "modelo").trim();
    const lkcompra = getString(
        formData, "lkcompra").trim();

    /**
     * @type {
        import("./tipos.js").
                Tenis} */
    const modeloo = {
      marca,modelo,lkcompra
    };
    await daoTenis.
      add(modeloo);
    muestraTenis();
  } catch (e) {
    muestraError(e);
  }
}

/** 
   * @param {Event} evt */
 async function guarda(evt) {
  const formData =
    new FormData(forma);
  const id = getString(
    formData, "modelo").trim();
  await guardaUsuario(evt,
    formData, id);
}
