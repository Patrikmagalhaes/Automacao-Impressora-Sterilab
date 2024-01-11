let arrayObejetos = []
let listElement = document.getElementById('lista')


document.addEventListener("DOMContentLoaded", () => {
   for (let chave of Object.keys(localStorage)) {
      let valor = JSON.parse(localStorage.getItem(chave))
      arrayObejetos.push(valor)
   }

   for (i = 0; i < arrayObejetos.length; i++) {
      extrairDados(arrayObejetos, i)
   }

   function extrairDados(objetos, indiceObjeto) {

      const diaSemana = objetos[indiceObjeto]["diaSemana"]
      const hora = objetos[indiceObjeto]["hora"]
      const caminhoPasta = objetos[indiceObjeto]["caminhoPasta"]
      const impressora = objetos[indiceObjeto]["impressora"]

      criarElementos(diaSemana, hora, caminhoPasta, impressora)
   }

   function criarElementos(diaSemana, hora, caminhoPasta, impressora) {
      let ulElement = document.createElement('ul')
      listElement.appendChild(ulElement)

      const liDiaSemana = document.createElement('li')
      const liHora = document.createElement('li')
      const liCaminhoPasta = document.createElement('li')
      const liImpressora = document.createElement('li')

      ulElement.appendChild(liDiaSemana)
      ulElement.appendChild(liHora)
      ulElement.appendChild(liCaminhoPasta)
      ulElement.appendChild(liImpressora)

      liDiaSemana.textContent = diaSemana
      liHora.textContent = hora
      liCaminhoPasta.textContent = caminhoPasta
      liImpressora.textContent = impressora
   }

})

