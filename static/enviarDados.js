document.getElementById("agendar").addEventListener("submit", function() {
    const form = document.getElementById("impressaoForm");
    const diaSemana = form.diaSemana.value;
    const hora = form.hora.value;
    const minuto = form.minuto.value;
    const copias = form.copias.value;
    const caminhoPasta = form.caminhoPasta.value;

   
    // Aqui você deve adaptar o código Python para receber essas informações e agendar a impressão.

    // Exemplo de como você pode enviar essas informações para o servidor:
    fetch("/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diaSemana, hora, minuto, copias, caminhoPasta }),
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com a resposta do servidor (se necessário)
        console.log("ssssssssssssssss")
        const mensagem = `Impressão agendada para ${diaSemana} às ${hora}:${minuto}`;
        alert(mensagem);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        alert("Erro ao enviar os dados")
    });
});

// Use AJAX para enviar os dados ao servidor
