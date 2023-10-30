import time
from datetime import datetime, timedelta
import win32print
import win32api
import os
from flask import Flask, request, render_template, jsonify
print("opa")

app = Flask(__name__, template_folder='C:\\Users\\STERILAB - RECEPÇÃO\\OneDrive\\Documentos\\interface\\templates', static_url_path='/static')


def imprimir_arquivos(caminho, copias):
    lista_arquivos = os.listdir(caminho)

    # Selecionar a impressora padrão
    lista_impressoras = win32print.EnumPrinters(2)
    impressora = [8388608, 'EPSON L4160 Series,EPSON L4160 Series,', 'EPSON L4160 Series', '']
  

    # Imprimir cada arquivo a quantidade de vezes especificada
    for arquivo in lista_arquivos:
        for _ in range(copias):
            print(f'Imprimindo {arquivo} {copias} vezes')
            win32api.ShellExecute(0, "print", arquivo, None, caminho, 0)

def agendar_impressao(dia_semana, hora, minuto, copias, caminho):
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
            print(f'Agendamento: Imprimindo às {data_agendada}')
            imprimir_arquivos(caminho, copias)
            proxima_ocorrencia += timedelta(weeks=1)
            data_agendada = datetime.combine(proxima_ocorrencia.date(), datetime.strptime(f'{hora}:{minuto}', '%H:%M').time())
        
        time.sleep(1)   # Verificar a cada minuto se é hora de imprimir

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            dia_semana = request.form['diaSemana']
            hora_programada = request.form['hora']
            minuto_programado = request.form['minuto']
            copias = int(request.form['copias'])
            caminho_pasta = request.form['caminhoPasta']

            # Agendar a impressão com base nos dados do formulário
            agendar_impressao(dia_semana, hora_programada, minuto_programado, copias, caminho_pasta)
            
            return jsonify({'success': True, 'message': 'Impressão agendada com sucesso!'})

        except Exception as e:
            return jsonify({'success': False, 'message': str(e)})

    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
