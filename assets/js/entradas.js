var tbEntradas = document.getElementById('tabela-entradas').querySelector('tbody');
var listaEntradas = [];
const url =`${URLAPI}entrada/`;
const formEntrada = document.getElementById('formEntrada');
const selectContas = document.getElementById("conta");
const selectCategoria = document.getElementById("categoria");
const pesquisarEntrada = document.getElementById("pesquisarEntrada");
const btnExportarEntradas = document.getElementById("btnExportarEntradas");

var modo = 'criar';
var idEntrada = null;

buscarEntradas();
bucarContas();
buscarCategorias();

// mascaras
$('#valor').mask('0.000.000,00', {reverse: true});

// evento para buscar os dados da entrada a ser editada
document.addEventListener("click", function(e) {
    const btn = e.target.closest(".editarEntrada");

    if (!btn) return;

    modo = btn.dataset.modo;

    idEntrada = btn.dataset.id;

    buscarEntradaId(idEntrada);
})

// evento de buscar entradas pela digitação
pesquisarEntrada.addEventListener("keyup", function (e) {
    buscarEntradas({
        data_inicial: document.getElementById("dataInicial").value,
        data_final: document.getElementById("dataFinal").value,
        coluna: document.getElementById("coluna").value,
        pesquisa: pesquisarEntrada.value
    })
})

btnExportarEntradas.addEventListener('click', function (e) {
    exportExcel(listaEntradas, 'entradas.xls');
})

// evento do form de entrada
formEntrada.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // vericiando se a operação é de inserção ou alteração
    if (modo === 'criar')
    {
        registrarEntrada({
            'id_conta': document.getElementById('conta').value,
            'id_categoria': document.getElementById('categoria').value,
            'descricao': document.getElementById('descricao').value,
            'valor': document.getElementById('valor').value,
            'data': document.getElementById('data').value
        })
    } else if (modo == 'editar')
    {
        editarEntrada({
            'id_entrada': idEntrada,
            'id_conta': document.getElementById('conta').value,
            'id_categoria': document.getElementById('categoria').value,
            'descricao': document.getElementById('descricao').value,
            'valor': document.getElementById('valor').value,
            'data': document.getElementById('data').value
        })
    }
})

// buscar todas as entradas do usuário
function buscarEntradas (filtros = {})
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
        listaEntradas = data;
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// buscar entrada por id
function buscarEntradaId (id)
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

// buscar todas as contas do usuário
function bucarContas()
{
    // faz uma requisição a api para gerar relatório mensal
    fetch(`${URLAPI}conta/listar`, {
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
        const contas = data;

        contas.forEach (conta => {
            const option = document.createElement("option");

            option.value = conta.ID_CONTA;
            option.textContent = `${conta.AGENCIA} - ${conta.NUMERO_CONTA} - ${toBR(conta.SALDO_ATUAL)}` ;

            selectContas.appendChild(option);
        })

        // POPULAR SELECT
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// buscar TODAS AS CATEGORIAS
function buscarCategorias()
{
    // faz uma requisição a api para gerar relatório mensal
    fetch(`${URLAPI}categoria/listar?tipo=ENTRADA`, {
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
        const categorias = data;

        categorias.forEach (item => {
            const option = document.createElement("option");

            option.value = item.ID_CATEGORIA;
            option.textContent =  item.NOME;

            selectCategoria.appendChild(option);
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
    tbEntradas.innerHTML = '';    

    for (let d = 0; d < dados.length; d++)
    {
        tbEntradas.innerHTML += '<tr class="hover:bg-gray-50">'+
                                '<td class="px-4 py-2">'+ dados[d].ID_ENTRADA +'</td>'+
                                '<td class="px-4 py-2">'+ dataFormatadaBR(dados[d].DATA) +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].BANCO +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].NUMERO_CONTA +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].CATEGORIA +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].DESCRICAO +'</td>'+
                                '<td class="px-4 py-2">'+ toBR(dados[d].VALOR) +'</td>'+
                                '<td class="px-4 py-2">'+
                                    '<a href="#" data-id="'+ dados[d].ID_ENTRADA +'" data-titulo="Editar Entrada" data-modo="editar" class="text-emerald-700 hover:underline openModalBtn editarEntrada">Editar</a>'+
                                '</td>'+
                            '</tr>';
    }
}

// registrar uma nova entrada
function registrarEntrada (data)
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
        formEntrada.reset();
        buscarEntradas();
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

// editar uma entrada
function editarEntrada (data)
{
    document.getElementById("loadingScreen").classList.remove("hidden");

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `editar/${data.id_entrada}`, {
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
        buscarEntradas();
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

// preencher o formulárioe com os dados
function preencherForm (dados)
{
    document.getElementById('data').value = dados.DATA;
    document.getElementById('conta').value = dados.FK_ENTRADA_CONTA;
    document.getElementById('categoria').value = dados.FK_ENTRADA_CATEGORIA;
    document.getElementById('descricao').value = dados.DESCRICAO;
    document.getElementById('valor').value = toBR(dados.VALOR);
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