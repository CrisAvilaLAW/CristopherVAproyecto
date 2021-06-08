import {
    getAuth
  } from "../lib/fabricaa.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    tieneRol
  } from "./seguridad.js";
  import {
    guardaUsuario
  } from "./teniss.js";
  
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
  
  /** 
   * @param {Event} evt */
  async function guarda(evt) {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const marca = getString(
        formData, "marca").trim();
    const modelo = getString(
        formData, "modelo").trim();
    const lkcompra = getString(
          formData, "lkcompra").trim();
    const id = getString(
      formData, "modelo").trim();
    
    const modeloo = {
    marca,modelo,lkcompra
    };
    await daoTenis.
    add(modeloo);

    await guardaUsuario(evt,
      formData, id);
  }
  