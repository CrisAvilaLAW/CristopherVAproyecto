import {
    getFirestore
  } from "../lib/fabricaa.js";
  import {
    subeStorage
  } from "../lib/storagee.js";
  import {
    muestraError
  } from "../lib/util.js";
  
 
  
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
    const marca = 
      formData.get("marca");
    const modelo = 
      formData.get("modelo");
    const lkcompra = 
      formData.get("lkcompra");
    
      const modeloo = {
      marca,modelo,lkcompra
      };
      await daoTenis.
      add(modeloo);
    
    const avatar =
      formData.get("avatar");
      await subeStorage(id, avatar);
      muestraTenis();
    } catch (e) {
      muestraError(e);
    }
  }  




    