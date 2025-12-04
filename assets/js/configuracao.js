const url =`${URLAPI}configuracao/`;
var tbCobrancas = document.getElementById('tabela-cobrancas').querySelector('tbody');
buscarCobrancas();

// buscar todas as entradas do usuário
function buscarCobrancas (filtros = {})
{
    // remove filtros vazios
    const params = new URLSearchParams();

    for (const chave in filtros) {
        if (filtros[chave] !== "" && filtros[chave] !== null && filtros[chave] !== undefined) {
            params.append(chave, filtros[chave]);
        }
    }

    const urlFinal = url + "buscar?" + params.toString();

    // faz uma requisição a api para gerar relatório mensal
    fetch(urlFinal, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}` // token no header
        },
        body: JSON.stringify() // só enviar body em POST/PUT/PATCH
    })
    .then(response => {
        if (!response.ok)
        {
            // logout();
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // converte o retorno para JSON
    })
    .then(data => {
        // console.log("Sucesso: ", data);
        montarTabela(data.response.data);
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// montar a tabela de contas
function montarTabela (dados)
{
    tbCobrancas.innerHTML = '';  
    

    for (let d = 0; d < dados.length; d++)
    {
        let span = '';
        
        switch (dados[d]['status']) {
            case "RECEIVED":
                span = '<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Pago</span>';
                break;
            case "PENDING":
                span = '<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pendente</span>';
                break;
            case "REFUND_REQUESTED":
                span = '<span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Estorno Solicitado</span>';
                break;
            case "REFUNDED":
                span = '<span class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">Estornado</span>';
                break;
            case "VENCED":
                span = '<span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Vencido</span>';
                break;
            case "CANCELED":
                span = '<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Cancelado</span>';
                break;
        
            default:
                break;
        }
        tbCobrancas.innerHTML += '<tr class="hover:bg-gray-50">'+
                                    '<td class="px-4 py-2 text-sm text-gray-700">'+ dados[d]['id'] +'</td>'+
                                    '<td class="px-4 py-2 text-sm text-gray-700">'+ dataFormatadaBR(dados[d]['originalDueDate']) +'</td>'+
                                    '<td class="px-4 py-2 text-sm text-gray-700">R$ '+ toBR(dados[d]['value']) +'</td>'+
                                    '<td class="px-4 py-2 text-sm">'+
                                        span +
                                    '</td>'+
                                    '<td class="px-4 py-2 text-center space-x-2">'+
                                        '<a href="'+ dados[d]['invoiceUrl'] +'" target="_blank" class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">Ver detalhes</a>'+
                                        '<a href="'+ dados[d]['bankSlipUrl'] +'" target="_blank" class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Baixar PDF</a>'+
                                    '</td>'+
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
function dataFormatadaBR(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}