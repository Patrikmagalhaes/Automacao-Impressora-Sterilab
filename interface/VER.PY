import win32print
import win32api

# escolher qual impressora a gente vai querer usar
lista_impressoras = win32print.EnumPrinters(2)
for impressora in lista_impressoras:
	print(impressora)
