import {
  getFirestore
} from "../lib/fabricaa.js";
import {
  subeStorage
} from "../lib/storagee.js";
import {
  muestraError
} from "../lib/util.js";
import {
  muestraTenis
} from "./navegacion.js";


const firestore = getFirestore();
const daoTenis = firestore.
  collection("Tenis");



/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
export async function
guardaTenis(evt, formData,
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


/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
 export async function
 actualizaTenis(evt, formData,
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
     doc(id).
    set(modeloo);
   
   const avatar =
     formData.get("avatar");
     await subeStorage(id, avatar);
     muestraTenis();
   } catch (e) {
     muestraError(e);
   }
 }  