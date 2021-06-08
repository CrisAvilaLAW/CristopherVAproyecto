import {
    getFirestore
  } from "../lib/fabricaa.js";
  import {
    subeStorage
  } from "../lib/storagee.js";
  import {
    cod, getForánea, muestraError
  } from "../lib/util.js";
  import {
    muestraUsuarios
  } from "./navegacion.js";
  
 
  
  const firestore = getFirestore();
  const daoRol = firestore.
    collection("Rol");
  const daoTenis = firestore.
    collection("Tenis");
  const daoUsuario = firestore.
    collection("Usuario");
  
  
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
      muestraTenis();
    } catch (e) {
      muestraError(e);
    }
  }  