let arrayObejetos = []
document.addEventListener("DOMContentLoaded", () => {

   for (let chave of Object.keys(localStorage)) {
      valor = JSON.parse(localStorage.getItem(chave))
      arrayObejetos.push(valor)
   }

   for (i = 0; i < arrayObejetos.length; i++) {
      console.log('teste', i,arrayObejetos[i]  )

   }

   function exibirLista(items) {
    console.log(items)
   }

})

