let dados = []

function salvarDados() {

    localStorage.setItem(dados.nomeTarefa, JSON.stringify(dados))
    dados = []
console.log("salvarDados")
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("/selecionar_impressora")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
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

document.getElementById("impressaoForm").addEventListener("submit", function (e) {
    e.preventDefault()

    const form = document.getElementById("impressaoForm");
    const impressora = document.getElementById("impressorasSelect")

    dados =
    {
        diaSemana: form.diaSemana.value,
        hora: form.hora.value,
        minuto: form.minuto.value,
        copias: form.copias.value,
        caminhoPasta: form.caminhoPasta.value,
        impressora: impressora.value,
        nomeTarefa: form.nomeTarefa.value,
        status: true
    }

    fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            dados
        ),
    }).then(response => response.json())
        .then(data => {salvarDados()})
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
        });
});
