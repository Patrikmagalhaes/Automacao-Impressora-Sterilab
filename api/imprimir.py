import win32print
import os
from flask import Flask, request, render_template, jsonify
import threading 
from functions import agendar_impressao

app = Flask(__name__)

impressoesAgendadas = []

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
    
if __name__ == "__main__":
    app.run(debug = True)
