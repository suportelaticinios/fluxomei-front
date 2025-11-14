var tbContas = document.getElementById('tabela-contas').querySelector('tbody');
const url = "http://192.168.2.2:8082/api-fluxomei/conta/";
const data = [
    {
        'ID_CONTA': 1,
        'CRIADO_EM': '2025-11-03',
        'BANCO': 'NUBANK',
        'AGENCIA': '1416',
        'NUMERO_CONTA': '142536',
        'SALDO_INICIAL': 20.000,
        'SALDO_ATUAL': 35.00
    },
    {
        'ID_CONTA': 2,
        'CRIADO_EM': '2025-11-03',
        'BANCO': 'NUBANK',
        'AGENCIA': '1416',
        'NUMERO_CONTA': '142536',
        'SALDO_INICIAL': 20.000,
        'SALDO_ATUAL': 35.00
    }
];

buscarContas();

montarTabela(data);

function buscarContas ()
{
    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `listar`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}` // token no header
        },
        body: JSON.stringify() // só enviar body em POST/PUT/PATCH
    })
    .then(response => {
        if (!response.ok)
        {
            logout();
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // converte o retorno para JSON
    })
    .then(data => {
        console.log("Sucesso: ", data);
        montarTabela(data);
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

function montarTabela (dados)
{
    tbContas.innerHTML = '';    

    for (let d = 0; d < dados.length; d++)
    {
        tbContas.innerHTML += '<tr class="hover:bg-gray-50">'+
                                '<td class="px-4 py-2">'+ dados[d].ID_CONTA +'</td>'+
                                '<td class="px-4 py-2">'+ dataFormatadaBR(dados[d].CRIADO_EM) +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].BANCO +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].AGENCIA +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].NUMERO_CONTA +'</td>'+
                                '<td class="px-4 py-2">'+ toBR(dados[d].SALDO_INICIAL) +'</td>'+
                                '<td class="px-4 py-2">'+ toBR(dados[d].SALDO_ATUAL) +'</td>'+
                                '<td class="px-4 py-2"><a href="#" class="text-emerald-700 hover:underline">Editar</a></td>'+
                            '</tr>';
    }
}

function toBR (valor)
{
    valor = parseFloat(valor);
    
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
}
function dataFormatadaBR (data)
{
    let date = new Date(data);

    return date.toLocaleDateString();
}