import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
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
  subeStorage
} from "../lib/storage.js";

/** Conexión a la base de datos
 * de Firebase.
 *  @returns {
      import("./tiposFire").
      Firestore} */
export function getFirestore() {
  // @ts-ignore
  return firebase.firestore();
}

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
    const avatar =
      formaData.get("avatar");
    /**
     * @type {
        import("./tipos.js").
                Tenis} */
    const modeloo = {
      marca,modelo
    };
    await daoTenis.
      add(modeloo);
    await subeStorage(modelo, avatar);
    muestraTenis();
  } catch (e) {
    muestraError(e);
  }
}
