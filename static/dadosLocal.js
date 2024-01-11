let arrayObejetos = []
let listElement = document.getElementById('lista')


document.addEventListener("DOMContentLoaded", () => {
   for (let chave of Object.keys(localStorage)) {
      let valor = JSON.parse(localStorage.getItem(chave))
      arrayObejetos.push(valor)
   }

   for (i = 0; i < arrayObejetos.length; i++) {
      exibirLista(arrayObejetos, i)
   }
   
   function exibirLista(objetos, indiceObjeto) {

      let ulElement = document.createElement('ul')
      listElement.appendChild(ulElement)
      const liElement = document.createElement('li')

      const diaSemana = objetos[indiceObjeto]["diaSemana"]
      const hora = objetos[indiceObjeto]["hora"]
      const caminhoPasta = objetos[indiceObjeto]["caminhoPasta"]
      const impressora = objetos[indiceObjeto]["impressora"]

      ulElement.appendChild(liElement)

      liElement.textContent = diaSemana
      liElement.textContent = diaSemana
    
   }
})

