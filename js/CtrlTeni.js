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

const daoTenis =
  getFirestore().
    collection("Tenis");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoTenis.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Tenis} */
      const data = doc.data();
      forma.marca.value =
        data.marca || "";
      forma.modelo.value =
        data.modelo || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraTenis();
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
      doc(id).
      set(modeloo);
    muestraTenis();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoTenis.
        doc(id).
        delete();
      muestraTenis();
    }
  } catch (e) {
    muestraError(e);
  }
}
