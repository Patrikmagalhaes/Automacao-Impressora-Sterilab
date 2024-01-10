import {dados} from "./enviarDados"

document.addEventListener("DOMContentLoaded", ()=>{
   let dadosLocal = localStorage.getItem(dados.nomeTarefa)
   console.log(dadosLocal)

})