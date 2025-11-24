var url = URLAPI + "relatorio/";
const btnGerarRelatorioMensal = document.getElementById('btnRelatorioMensal');
const btnGerarRelatorioAnual = document.getElementById('btnRelatorioAnual');
const btnGerarRelatorioBalanco = document.getElementById('btnRelatorioBalanco');

btnGerarRelatorioMensal.addEventListener('click', function ()
{
    let data = document.querySelector('#mes-mensal').value;
    data = data.split('-');
    let ano = data[0];
    let mes = data[1];

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `mensal?mes=${mes}&ano=${ano}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}` // token no header
        },
        body: JSON.stringify() // só enviar body em POST/PUT/PATCH
    })
    .then(response => {
        if (!response.ok)
        {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // converte o retorno para JSON
    })
    .then(data => {
        console.log("Sucesso: ", data);
        document.querySelector("#previa-relatorios").classList.remove('hidden');
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })

})

btnGerarRelatorioAnual.addEventListener('click', function ()
{
    let data = document.querySelector('#ano-anual').value;
    data = data.split('-');
    let ano = data[0];
    let mes = data[1];

    // faz uma requisição a api para gerar relatório mensal
    fetch(url +  `anual?ano=${ano}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // token no header
        }
    })
    .then(response => {
        if (!response.ok)
        {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // converte o retorno para JSON
    })
    .then(data => {
        console.log("Sucesso: ", data);
        document.querySelector("#previa-relatorios").classList.remove('hidden');
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })

})

// btnGerarRelatorioBalanco.addEventListener('click', function ()
// {
//     let data = document.querySelector('#mes-balanco').value;
//     console.log(data)
//     data = data.split('-');
//     let ano = data[0];
//     let mes = data[1];

//     // faz uma requisição a api para gerar relatório mensal
//     fetch(url +  `balanco?ano=${ano}&mes=${mes}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}` // token no header
//         }
//     })
//     .then(response => {
//         if (!response.ok)
//         {
//             throw new Error(`Erro na requisição: ${response.status}`);
//         }
//         return response.json(); // converte o retorno para JSON
//     })
//     .then(data => {
//         console.log("Sucesso: ", data);
//         document.querySelector("#previa-relatorios").classList.remove('hidden');
//     })
//     .catch(error => {
//         console.log("Error: ", error.message);
//     })

// })

btnGerarRelatorioBalanco.addEventListener('click', function () {
    let data = document.querySelector('#mes-balanco').value;
    data = data.split('-');
    let ano = data[0];
    let mes = data[1];

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
    });
});
