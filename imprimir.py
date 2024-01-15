# Importando as bibliotecas necessárias
import time
from datetime import datetime, timedelta
import win32print
import win32api
import os
from flask import Flask, request, render_template, jsonify
import threading 

# Determine o caminho base dinamicamente como o diretório do script atual
base_path = os.path.abspath(os.path.dirname(__file__))
# Inicializando a aplicação Flask
app = Flask(__name__, template_folder=os.path.join(base_path, 'templates'), static_url_path='/static')
impressoesAgendadas = []
# Função para imprimir arquivos
def imprimir_arquivos(caminho, copias, impressora):

    lista_arquivos = os.listdir(caminho)
    for arquivo in lista_arquivos:
        for _ in range(int(copias)):
            print(f'Imprimindo {arquivo} {copias} vezes na impressora {impressora}')
            # Adiciona a impressora ao comando de impressão
            try:
                win32api.ShellExecute(0, "print", arquivo, None, caminho, 0)
            except Exception as erro:
                return print(erro)
            
def agendar_impressao(dia_semana, hora, minuto, copias, caminho, impressora, idTarefa):

    dias_da_semana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo']
    dia_numero = dias_da_semana.index(dia_semana.lower())
    hoje = datetime.now()
    hora_atual = hoje.replace(second=0, microsecond=0)
    delta_dias = (dia_numero - hoje.weekday() + 7) % 7
    proxima_ocorrencia = hoje + timedelta(days=delta_dias)
    data_agendada = datetime.combine(proxima_ocorrencia.date(), datetime.strptime(f'{hora}:{minuto}', '%H:%M').time())
    
    while True:
        agora = datetime.now()
        if agora >= data_agendada:
            for agendamento in impressoesAgendadas:
                if agendamento['nomeTarefa'] == idTarefa:
                    if agendamento['status'] == False:
                        return  print(f'impressao cancelada')
                    else:
                        print(f'Agendamento: Imprimindo às {data_agendada}')
                        imprimir_arquivos(caminho, copias, impressora)
                        proxima_ocorrencia += timedelta(weeks=1)
                        data_agendada = datetime.combine(proxima_ocorrencia.date(), datetime.strptime(f'{hora}:{minuto}', '%H:%M').time())
time.sleep(1) 

@app.route('/excluirTarefa', methods=['PUT'])
def alterarStatus():
    data = request.get_json()
    tarefa = data['nomeTarefa']
    for i, data in enumerate(impressoesAgendadas):
        if data['nomeTarefa'] == tarefa:
            impressoesAgendadas[i]['status'] = False
            print(data)
    return jsonify(True), 200

@app.route("/lista", methods=['GET'])
def lista():
    if request.method == 'GET':
        return render_template("lista.html")

@app.route("/selecionar_impressora", methods=['GET'])
def selecionar_impressora():
    try:
        # Lista as impressoras disponíveis
        lista_impressoras = win32print.EnumPrinters(2)
        # Retorna a lista de impressoras como JSON
        return jsonify({'impressoras': [printer[2] for printer in lista_impressoras], 'success': True})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})
# Rota para lidar com as requisições GET e POST para a página inicial
@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        
        data = request.get_json()
        dia_semana = data['diaSemana']
        hora = data['hora']
        minuto = data['minuto']
        copias = data['copias']
        caminho = data['caminhoPasta']
        impressora = data['impressora']
        status = data['status']
        idTarefa = data['nomeTarefa']
        impressoesAgendadas.append(data)
        thread = threading.Thread(target=agendar_impressao, args=(dia_semana, hora, minuto, copias,  caminho, impressora, idTarefa))
        thread.start()
        return jsonify(True), 200
    else:
        return render_template('index.html')
# Inicia a aplicação Flask se este script for o principal sendo executado
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug = True)
