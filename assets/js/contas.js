var tbContas = document.getElementById('tabela-contas').querySelector('tbody');
var modo = 'criar';
var idConta = null;
var listaContas = [];
const url =`${URLAPI}conta/`;
const formConta = document.getElementById('formConta');
const select = document.getElementById("idBanco");
const pesquisarConta = document.getElementById("pesquisarConta");
const btnExportarContas = document.getElementById("btnExportarContas");

// buscas iniciais
buscarContas();
buscarBancos();

// mascaras
$('#saldoInicial').mask('0.000.000,00', {reverse: true});
$('#saldoAtual').mask('0.000.000,00', {reverse: true});
$('#agencia').mask('0000-0');



/* ====================================
    EVENTOS
 ========================================*/

document.addEventListener("click", function(e) {
    const btn = e.target.closest(".editarConta");

    if (!btn) return;

    modo = btn.dataset.modo;

    idConta = btn.dataset.id;

    buscarContaId(idConta);
})

pesquisarConta.addEventListener("keyup", function (e) {
    buscarContas({
        coluna: document.getElementById("coluna").value,
        pesquisa: pesquisarConta.value
    })
})

btnExportarContas.addEventListener("click", function (e) {
    exportExcel(listaContas, "contas.xlsx");
})

formConta.addEventListener('submit', function (e) {
    e.preventDefault();

    // vericiando se a operação é de inserção ou alteração
    if (modo === 'criar')
    {
        cadastrarConta({
            'id_banco': document.getElementById('idBanco').value,
            'agencia': document.getElementById('agencia').value,
            'numero_conta': document.getElementById('conta').value,
            'saldo_inicial': document.getElementById('saldoInicial').value,
            'saldo_atual': document.getElementById('saldoAtual').value
        })
    } else if (modo == 'editar')
    {
        editarConta({
            'id_conta': idConta,
            'id_banco': document.getElementById('idBanco').value,
            'agencia': document.getElementById('agencia').value,
            'numero_conta': document.getElementById('conta').value,
            'saldo_inicial': document.getElementById('saldoInicial').value,
            'saldo_atual': document.getElementById('saldoAtual').value
        })
    }
    
})

// excluir conta
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".excluirConta");

    if (!btn) return;

    if (!confirm('Deseja realmente excluir esta conta?')) return;

    excluirConta(btn.dataset.id);
});



/* =========================
   API
========================= */

// buscar todas as contas do usuário
function buscarContas (filtros = {})
{
    // remove filtros vazios
    const params = new URLSearchParams();

    for (const chave in filtros) {
        if (filtros[chave] !== "" && filtros[chave] !== null && filtros[chave] !== undefined) {
            params.append(chave, filtros[chave]);
        }
    }

    const urlFinal = url + "listar?" + params.toString();

    // faz uma requisição a api para gerar relatório mensal
    fetch(urlFinal, {
        method: 'GET',
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
        montarTabela(data);
        listaContas = data;
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// buscar conta por id
function buscarContaId (id)
{
    document.getElementById("loadingScreen").classList.remove("hidden");

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `buscar/${id}`, {
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
        // console.log("Sucesso: ", data);
        preencherForm(data)
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
    .finally(() => {
        // só aqui o loading some — DEPOIS de TUDO terminar
        document.getElementById("loadingScreen").classList.add("hidden");
    });
}

// cadastrar uma conta
function cadastrarConta (data)
{
    document.getElementById("loadingScreen").classList.remove("hidden");

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `cadastrar`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`, // token no header
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data) // só enviar body em POST/PUT/PATCH
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
        formConta.reset();
        buscarContas();
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

// editar uma conta
function editarConta (data)
{
    document.getElementById("loadingScreen").classList.remove("hidden");

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `editar/${data.id_conta}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`, // token no header
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data) // só enviar body em POST/PUT/PATCH
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
        buscarContas();
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

function excluirConta(id) {
    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(url + `deletar/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(async r => {
        if (!r.ok) {
            const erro = await r.json();
            throw new Error(erro.message);
        }
        return r.json();
    })
    .then( data => {
        showToast("success", "Sucesso", data.message);
        buscarContas();
        buscarBancos();
    })
    .catch(err => {
        showToast("error", "Erro", err.message);
    })
    .finally(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
    });
}


/* =========================
   AUXILIARES
========================= */

// buscar todos os bancos cadastrados no sistema
function buscarBancos ()
{
    // faz uma requisição a api para gerar relatório mensal
    fetch(`${URLAPI}banco/listar`, {
        method: 'GET',
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
        const bancos = data;

        bancos.forEach (banco => {
            const option = document.createElement("option");

            option.value = banco.ID_BANCO;
            option.textContent = banco.NOME;

            select.appendChild(option);
        })

        // POPULAR SELECT
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// montar a tabela de contas
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
                                '<td class="px-4 py-2">'+
                                    '<a href="#" data-id="'+ dados[d].ID_CONTA +'" data-titulo="Editar Conta" data-modo="editar" class="text-emerald-700 hover:underline openModalBtn editarConta">Editar</a>'+
                                    '<a href="#" data-id="'+ dados[d].ID_CONTA +'" data-titulo="Excluir Conta" class="text-red-600 ml-2 hover:underline excluirConta">Excluir</a>'+
                                '</td>'+
                            '</tr>';
    }
}

// preencher o formulárioe com os dados
function preencherForm (dados)
{
    document.getElementById('idBanco').value = dados.FK_CONTA_BANCO;
    document.getElementById('agencia').value = dados.AGENCIA;
    document.getElementById('conta').value = dados.NUMERO_CONTA;
    document.getElementById('saldoInicial').value = toBR(dados.SALDO_INICIAL);
    document.getElementById('saldoAtual').value = toBR(dados.SALDO_ATUAL);
}


/* =========================
   HELPERS
========================= */

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