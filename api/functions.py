import os
import win32api
from datetime import datetime, timedelta
import time
from globals import impressoesAgendadas

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
