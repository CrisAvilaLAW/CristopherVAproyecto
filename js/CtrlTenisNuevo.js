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

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const marca = getString(
      formData, "marca").trim();
    const modelo = getString(
      formData, "modelo").trim();
    /**
     * @type {
        import("./tipos.js").
                Tenis} */
    const modeloo = {
      marca,modelo
    };
    await daoTenis.
      add(modeloo);
     const avatar =
      formData.get("avatar");
    await subeStorage(modelo, avatar);
    muestraTenis();
  } catch (e) {
    muestraError(e);
  }
}
