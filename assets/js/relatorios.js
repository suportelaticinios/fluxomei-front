var url = "http://192.168.2.2:8082/api-fluxomei/relatorio/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6Im1vaXNlc3NpbHZhQGdtYWlsLmNvbSIsIm5vbWUiOiJNb2lzXHUwMGU5cyBNb3JlaXJhIEFyYVx1MDBmYWpvIiwiaWF0IjoxNzYyNzk2MTg4LCJleHAiOjE3NjI4MDMzODh9.QKujSAJVIst37PzsGM1-Bm4AtjmEUUCobxmNDupk4Yk";
const btnGerarRelatorioMensal = document.getElementById('btnRelatorioMensal');
const btnGerarRelatorioAnual = document.getElementById('btnRelatorioAnual');

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
