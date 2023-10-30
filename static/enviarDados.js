// Adiciona um ouvinte de evento ao formulário com o ID "agendar". 
// Quando o formulário é submetido, a função anônima é chamada.
document.getElementById("agendar").addEventListener("submit", function() {
    // Obtém uma referência ao formulário com o ID "impressaoForm".
    const form = document.getElementById("impressaoForm");
    // Extrai os valores dos campos do formulário.
    const diaSemana = form.diaSemana.value;
    const hora = form.hora.value;
    const minuto = form.minuto.value;
    const copias = form.copias.value;
    const caminhoPasta = form.caminhoPasta.value;

    // Faz uma requisição POST para a rota "/" do servidor.
    // A requisição inclui os dados do formulário no corpo da requisição, formatados como JSON.
    fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diaSemana, hora, minuto, copias, caminhoPasta }),
    })
    // Espera pela resposta do servidor e converte a resposta em JSON.
    .then(response => response.json())
    // Lida com os dados JSON da resposta.
    .then(data => {
        console.log("ssssssssssssssss")
        const mensagem = `Impressão agendada para ${diaSemana} às ${hora}:${minuto}`;
        alert(mensagem);
    })
    // Captura qualquer erro que possa ocorrer durante a requisição POST ou ao lidar com a resposta.
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        alert("Erro ao enviar os dados")
    });
});
