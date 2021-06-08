import {
    getFirestore
  } from "../lib/fabrica.js";
  import {
    subeStorage
  } from "../lib/storage.js";
  import {
    cod, getForánea, muestraError
  } from "../lib/util.js";
  import {
    muestraUsuarios
  } from "./navegacion.js";
  
  const SIN_TENIS = /* html */
    `<option value="">
      -- Sin Tenis favorito --
    </option>`;
  
  const firestore = getFirestore();
  const daoRol = firestore.
    collection("Rol");
  const daoTenis = firestore.
    collection("Tenis");

  
  /**
   * @param {
      HTMLSelectElement} select
   * @param {string} valor */
  export function
    selectTenis(select,
      valor) {
    valor = valor || "";
    daoTenis.
      orderBy("modelo").
      onSnapshot(
        snap => {
          let html = SIN_TENIS;
          snap.forEach(doc =>
            html += htmlTenis(
              doc, valor));
          select.innerHTML = html;
        },
        e => {
          muestraError(e);
          selectTenis(
            select, valor);
        }
      );
  }
  
  /**
   * @param {
    import("../lib/tiposFire.js").
    DocumentSnapshot} doc
   * @param {string} valor */
  function
    htmlTenis(doc, valor) {
    const selected =
      doc.id === valor ?
        "selected" : "";
    /**
     * @type {import("./tipos.js").
                    Tenis} */
    const data = doc.data();
    return (/* html */
      `<option
          value="${cod(doc.id)}"
          ${selected}>
        ${cod(data.modelo)}
      </option>`);
  }
  
 
  
  
  
  /**
   * @param {Event} evt
   * @param {FormData} formData
   * @param {string} id  */
  export async function
    guardaUsuario(evt, formData,
      id) {
    try {
      evt.preventDefault();
      const avatar =
        formData.get("avatar");
      await subeStorage(id, avatar);
      muestraUsuarios();
    } catch (e) {
      muestraError(e);
    }
  }
  