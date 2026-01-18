const url =`${URLAPI}configuracao/`;
var cpf_cnpj = null;
var email = null;
const formContato = document.getElementById('formContato');
var tbCobrancas = document.getElementById('tabela-cobrancas').querySelector('tbody');

// buscarCobrancas();

// máscara do campo de telefone
$('#telefone').mask('(00) 00000-0000');
$('#card_expiry').mask('00/00');

/**
 * EVENTOS
 */

formContato.addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById("loadingScreen").classList.remove("hidden");
    
    atualizar({
      'id_plano': document.getElementById('idPlano').value,
      'nome': document.getElementById('nome').value,
      'telefone': document.getElementById('telefone').value,
      'senha': document.getElementById('senha').value,
      'cpf_cnpj': cpf_cnpj,
      'email': email
    })
})

document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'formCartao') return;

  e.preventDefault();

  // lógica de cartão aqui
  salvarCartao({
    'nome_cartao': document.getElementById('card_name').value,
    'numero_cartao': document.getElementById('card_number').value,
    'vencimento_cartao': document.getElementById('card_expiry').value,
    'cvv_cartao': document.getElementById('card_cvv').value
  })
});


/**
 * API
 */

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
        setarCampos(data.dadosUsuario);
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// atualizar informações do usuário
function atualizar(dados) {
    let token = localStorage.getItem('token');

    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(URLAPI + '/usuario/editar/', {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(async response => {
        if (!response.ok) {
            const erro = await response.json();

            if (response.status === 401) {
                showToast("error", "Não autorizado", erro.message || "Token inválido ou expirado.");
            }

            throw new Error(erro.message || "Erro desconhecido");
        }

        return response.json();
    })
    .then(data => {
        showToast("success", "Sucesso", data.message);
    })
    .catch(error => {
        console.log("Error: ", error.message);
        showToast("error", "Atenção", error.message);
    })
    .finally(() => {
        // só aqui o loading some — DEPOIS de TUDO terminar
        document.getElementById("loadingScreen").classList.add("hidden");
    });
}

// salvar cartão
function salvarCartao (dados)
{
     let token = localStorage.getItem('token');

    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(URLAPI + '/configuracao/salvarCartao/', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(async response => {
        if (!response.ok) {
            const erro = await response.json();

            if (response.status === 401) {
                showToast("error", "Não autorizado", erro.message || "Token inválido ou expirado.");
            }

            if (response.status === 400) {
                console.log(erro.data.errors[0]);
                showToast("error", "Atenção", erro.data.errors[0].description);
            }

            throw new Error(erro.data.errors[0].description || "Erro desconhecido");
        }

        return response.json();
    })
    .then(data => {
        showToast("success", "Sucesso", data.message);
    })
    .catch(error => {
        console.log("Error: ", error.message);
        showToast("error", "Atenção", error.message);
    })
    .finally(() => {
        // só aqui o loading some — DEPOIS de TUDO terminar
        document.getElementById("loadingScreen").classList.add("hidden");
    });
}

// carregar informações da assinatura
async function carregarAssinatura() {
    const token = localStorage.getItem('token');

    const res = await fetch(URLAPI + '/configuracao/assinaturaStatus', {
        headers: {
        "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        showToast("error", "Erro", "Não foi possível carregar a assinatura");
        return;
    }

    const data = await res.json();

    preencherPlano(data);
    renderPagamento(data.cartao);
}



/** 
 * HELPERS
*/
// montar a tabela de faturas
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

function setarCampos (dados)
{
    document.getElementById("nome").value = dados.NOME;
    document.getElementById("telefone").value = dados.TELEFONE;
    cpf_cnpj = dados.CPF_CNPJ
    email = dados.EMAIL
}

// mostrar inserir ou alterar cartão
function renderPagamento(cartao) {
    const semCartao = document.getElementById('sem-cartao');
    const comCartao = document.getElementById('com-cartao');

    semCartao.classList.add('hidden');
    comCartao.classList.add('hidden');

    if (!cartao || !cartao.has_card) {
        semCartao.classList.remove('hidden');
        return;
    }

    comCartao.classList.remove('hidden');

    comCartao.querySelector('.text-sm').innerHTML = `
        ${cartao.brand} •••• ${cartao.last4} <br>
        <span class="text-xs text-gray-400">Validade ${cartao.expiry}</span>
    `;
}

// capturando evendo disparado pelo auth.js carregado no header
document.addEventListener('DOMContentLoaded', () => {
  if (!window.USER) return;

  const acesso = window.USER.acesso;

  renderPagamento(acesso);
  carregarAssinatura();
  return;
});

// preenche o bloco plano atual
function preencherPlano(data) {
    document.querySelector('#assinatura [data-plano-nome]').innerText = data.plano.nome;
    document.querySelector('#assinatura [data-plano-valor]').innerText =
        `R$ ${toBR(data.plano.valor)} / ${data.plano.periodicidade}`;

    const statusEl = document.querySelector('#assinatura [data-plano-status]');
    statusEl.innerText = data.assinatura.status === 'ATIVA' ? 'Ativo' : 'Inativo';

    document.querySelector('#assinatura [data-plano-proxima]')
        .innerText = dataFormatadaBR(data.assinatura.next_due_date);
}