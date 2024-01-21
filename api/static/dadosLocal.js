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
        const minuto = objetos[indiceObjeto]["minuto"]
        const caminhoPasta = objetos[indiceObjeto]["caminhoPasta"]
        const impressora = objetos[indiceObjeto]["impressora"]


        criarElementos(diaSemana, hora, minuto, caminhoPasta, impressora, objetos, indiceObjeto)
    }

    function criarElementos(diaSemana, hora, minuto, caminhoPasta, impressora, objetos, indiceObjeto) {
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

        const botaoExcluir = document.createElement('button')
        const idButton = toString(indiceObjeto)
        botaoExcluir.id = idButton
        botaoExcluir.textContent = 'Excluir'

        ulElement.appendChild(botaoExcluir)

        excluirItem(objetos, indiceObjeto, botaoExcluir, ulElement)
        //removerTarefaFinalizada(diaSemana, hora, minuto)

    }

   /* function removerTarefaFinalizada(diaSemana, hora, minuto) {

        const semanaString = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

        for (i = 0; i <= semanaString.length; i++) {

            if (semanaString[i] == diaSemana) {
                diaSemana = i
            }
        }

        const tempoAtual = new Date()
        const hoje = tempoAtual.getDay()
        const horaAtual = tempoAtual.getHours()
        const minutoAtual = tempoAtual.getMinutes()
        
        console.log("hora atual:", hora, minutoAtual)

        if (hoje == diaSemana && horaAtual >= hora && minutoAtual >= minuto) {
            console.log("(_._)")
        }

    }*/

    function excluirItem(objetos, indiceObjeto, botaoExcluir, ulElement) {
        botaoExcluir.addEventListener('click', () => {
            localStorage.removeItem(objetos[indiceObjeto]['nomeTarefa'])
            listElement.removeChild(ulElement)

            let statusFalse = objetos[indiceObjeto]['status']
            statusFalse = false
            const nomeTarefa = objetos[indiceObjeto]['nomeTarefa']

            cancelarTarefa(nomeTarefa, statusFalse)
        })
    }

    function cancelarTarefa(nomeTarefa, statusFalse) {
        fetch('/excluirTarefa', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ nomeTarefa, statusFalse })
        }
        )
    }
})

