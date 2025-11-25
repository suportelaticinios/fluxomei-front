var url = URLAPI + "relatorio/";
const btnGerarRelatorioMensal = document.getElementById('btnRelatorioMensal');
const btnGerarRelatorioAnual = document.getElementById('btnRelatorioAnual');
const btnGerarRelatorioBalanco = document.getElementById('btnRelatorioBalanco');

btnGerarRelatorioMensal.addEventListener('click', function ()
{
    let data = document.querySelector('#mes-balanco').value;
    data = data.split('-');
    let ano = data[0];
    let mes = data[1];

    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(url + `mensal?ano=${ano}&mes=${mes}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.blob())   // <<< PDF BINÁRIO AQUI
    .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");  // <<< ABRE O PDF
    })
    .catch(error => {
        console.log("ERRO PDF:", error);
    })
    .finally(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
    });
})

btnGerarRelatorioAnual.addEventListener('click', function ()
{
    let data = document.querySelector('#mes-balanco').value;
    data = data.split('-');
    let ano = data[0];
    let mes = data[1];

    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(url + `anual?ano=${ano}&mes=${mes}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.blob())   // <<< PDF BINÁRIO AQUI
    .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");  // <<< ABRE O PDF
    })
    .catch(error => {
        console.log("ERRO PDF:", error);
    })
    .finally(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
    });
})

btnGerarRelatorioBalanco.addEventListener('click', function () 
{
    let data = document.querySelector('#mes-balanco').value;
    data = data.split('-');
    let ano = data[0];
    let mes = data[1];

    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(url + `balanco?ano=${ano}&mes=${mes}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.blob())   // <<< PDF BINÁRIO AQUI
    .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");  // <<< ABRE O PDF
    })
    .catch(error => {
        console.log("ERRO PDF:", error);
    })
    .finally(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
    });
});
