import {
  getAuth,
  getFirestore
} from "../lib/fabricaa.js";
import {
  urlStorage
} from "../lib/storagee.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const firestore = getFirestore();
const daoTenis = firestore.
  collection("Tenis");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    consulta();
  }
}

function consulta() {
  daoTenis.
    orderBy("marca")
    .onSnapshot(
      htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
    function htmlLista(snap) {
      let html = "";
      if (snap.size > 0) {
        snap.forEach(doc =>
          html += htmlFila(doc));
      } else {
        html += /* html */
          `<li class="vacio">
            -- No hay tenis
            registrados. --
          </li>`;
      }
      lista.innerHTML = html;
    }



/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
    function htmlFila(doc) {
      /**
       * @type {import("./tipos.js").
                      Tenis} */
      const data = doc.data();
      const img = cod(
        await urlStorage(doc.id));
      const marca = cod(data.marca);
      const modelo = cod(data.modelo);
      const lkcompra = cod(data.lkcompra);
      const parámetros =
        new URLSearchParams();
      parámetros.append("id", doc.id);
      return ( /* html */
        `<li>
          <a class="fila" href=
      "teni.html?${parámetros}">
            <span class="marco">
            <img src="${img}"
            alt="Falta el Avatar">
            </span>
            <strong class="primario">
              ${marca}
              ${modelo}
            </strong>
            <span
            class="secundario">
            ${lkcompra}
            </span>
          </a>
        </li>`);
    }


/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}