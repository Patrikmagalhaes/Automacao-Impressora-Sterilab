

document.addEventListener("DOMContentLoaded", function () {
    // Faz uma solicitação ao Flask para obter a lista de impressoras
    fetch("/selecionar_impressora")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Atualiza dinamicamente a lista de impressoras no seu elemento de seleção
                var impressorasSelect = document.getElementById("impressorasSelect");
                impressorasSelect.innerHTML = "";
                data.impressoras.forEach(function (impressora) {
                    var option = document.createElement("option");
                    option.value = impressora;
                    option.text = impressora;
                    impressorasSelect.appendChild(option);
                });
            } else {
                console.error("Erro ao obter a lista de impressoras: " + data.message);
            }
        })
        .catch(error => {
            console.error("Erro ao fazer a solicitação para obter a lista de impressoras.", error);
        });
});

// Adiciona um ouvinte de evento ao formulário com o ID "agendar". 
// Quando o formulário é submetido, a função anônima é chamada.
document.getElementById("impressaoForm").addEventListener("submit", function (e) {
    // Obtém uma referência ao formulário com o ID "impressaoForm".
    e.preventDefault()
    const form = document.getElementById("impressaoForm");
    const impressora = document.getElementById("impressorasSelect")
    // Extrai os valores dos campos do formulário.


    // Faz uma requisição POST para a rota "/" do servidor.
    // A requisição inclui os dados do formulário no corpo da requisição, formatados como JSON.
    fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            diaSemana: form.diaSemana.value,
            hora: form.hora.value,
            minuto: form.minuto.value,
            copias: form.copias.value,
            caminhoPasta: form.caminhoPasta.value,
            impressora: impressora.value
        }),
    })
        // Espera pela resposta do servidor e converte a resposta em JSON.
        .then(response => response.json())
        // Lida com os dados JSON da resposta.
        .then(data => {
           const dados = data[1]["diaSemana"]
           console.log(dados)
        })
        // Captura qualquer erro que possa ocorrer durante a requisição POST ou ao lidar com a resposta.
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
});
