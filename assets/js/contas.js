var tbContas = document.getElementById('tabela-contas').querySelector('tbody');
var modo = 'criar';
var idConta = null;
const url = "http://192.168.2.2:8082/api-fluxomei/conta/";
const formConta = document.getElementById('formConta');
const select = document.getElementById("idBanco");

document.addEventListener("click", function(e) {
    const btn = e.target.closest(".editarConta");

    if (!btn) return;

    modo = btn.dataset.modo;

    idConta = btn.dataset.id;

    buscarContaId(idConta);
})

// mascaras
$('#saldoInicial').mask('0.000.000,00', {reverse: true});
$('#saldoAtual').mask('0.000.000,00', {reverse: true});
$('#agencia').mask('0000-0');

// buscas iniciais
buscarContas();
buscarBancos();

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

// buscar todos os bancos cadastrados no sistema
function buscarBancos ()
{
    // faz uma requisição a api para gerar relatório mensal
    fetch('http://192.168.2.2:8082/api-fluxomei/banco/listar', {
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
        console.log("Sucesso: ", data);
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

// buscar todas as contas do usuário
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
            // logout();
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // converte o retorno para JSON
    })
    .then(data => {
        // console.log("Sucesso: ", data);
        montarTabela(data);
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
            'Content-Type': "application/json",
            'User-Agent': "front-fluxomei"
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

// cadastrar uma conta
function editarConta (data)
{
    document.getElementById("loadingScreen").classList.remove("hidden");

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `editar/${data.id_conta}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`, // token no header
            'Content-Type': "application/json",
            'User-Agent': "front-fluxomei"
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