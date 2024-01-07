document.addEventListener("DOMContentLoaded", ()=>{
    const valores = localStorage.getItem("impressoes")
    const arrayObjeto = JSON.parse(valores)
    document.getElementById("test").textContent = arrayObjeto[0]["diaSemana"]
})