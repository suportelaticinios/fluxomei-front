var tbDespesas = document.getElementById('tabela-despesas').querySelector('tbody');
var listaDespesas = [];
const url =`${URLAPI}despesa/`;
const formDespesa = document.getElementById('formDespesa');
const selectContas = document.getElementById("conta");
const selectCategoria = document.getElementById("categoria");
const pesquisarDespesa = document.getElementById("pesquisarDespesa");
const btnExportarDespesas = document.getElementById("btnExportarDespesas");

var modo = 'criar';
var idDespesa = null;

buscarDespesas();
bucarContas();
buscarCategorias();

// mascaras
$('#valor').mask('0.000.000,00', {reverse: true});

// evento para buscar os dados da entrada a ser editada
document.addEventListener("click", function(e) {
    const btn = e.target.closest(".editarDespesa");

    if (!btn) return;

    modo = btn.dataset.modo;

    idDespesa = btn.dataset.id;

    buscarDespesaId(idDespesa);
})

// evento de buscar entradas pela digitação
pesquisarDespesa.addEventListener("keyup", function (e) {
    buscarDespesas({
        data_inicial: document.getElementById("dataInicial").value,
        data_final: document.getElementById("dataFinal").value,
        coluna: document.getElementById("coluna").value,
        pesquisa: pesquisarDespesa.value
    })
})

btnExportarDespesas.addEventListener('click', function (e) {
    exportExcel(listaDespesas, 'despesas.xls');
})

// evento do form de despesa
formDespesa.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // vericiando se a operação é de inserção ou alteração
    if (modo === 'criar')
    {
        registrarDespesa({
            'id_conta': document.getElementById('conta').value,
            'id_categoria': document.getElementById('categoria').value,
            'descricao': document.getElementById('descricao').value,
            'valor': document.getElementById('valor').value,
            'data': document.getElementById('data').value
        })
    } else if (modo == 'editar')
    {
        editarDespesa({
            'id_despesa': idDespesa,
            'id_conta': document.getElementById('conta').value,
            'id_categoria': document.getElementById('categoria').value,
            'descricao': document.getElementById('descricao').value,
            'valor': document.getElementById('valor').value,
            'data': document.getElementById('data').value
        })
    }
})

// buscar todas as despesas do usuário
function buscarDespesas (filtros = {})
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
        listaDespesas = data;
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}

// buscar despesa por id
function buscarDespesaId (id)
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

        selectContas.innerHTML = "";

        const primeiroOption = document.createElement("option");
        primeiroOption.value = "";
        primeiroOption.textContent = "Selecione uma conta";

        selectContas.appendChild(primeiroOption);

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
    fetch(`${URLAPI}categoria/listar?tipo=SAIDA`, {
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
    tbDespesas.innerHTML = '';    

    for (let d = 0; d < dados.length; d++)
    {
        tbDespesas.innerHTML += '<tr class="hover:bg-gray-50">'+
                                '<td class="px-4 py-2">'+ dados[d].ID_DESPESA +'</td>'+
                                '<td class="px-4 py-2">'+ dataFormatadaBR(dados[d].DATA) +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].BANCO +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].NUMERO_CONTA +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].CATEGORIA +'</td>'+
                                '<td class="px-4 py-2">'+ dados[d].DESCRICAO +'</td>'+
                                '<td class="px-4 py-2">'+ toBR(dados[d].VALOR) +'</td>'+
                                '<td class="px-4 py-2">'+
                                    '<a href="#" data-id="'+ dados[d].ID_DESPESA +'" data-titulo="Editar Despesa" data-modo="editar" class="text-emerald-700 hover:underline openModalBtn editarDespesa">Editar</a>'+
                                '</td>'+
                            '</tr>';
    }
}

// registrar uma nova despesa
function registrarDespesa (data)
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
        formDespesa.reset();
        buscarDespesas();
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
function editarDespesa (data)
{
    document.getElementById("loadingScreen").classList.remove("hidden");

    // faz uma requisição a api para gerar relatório mensal
    fetch(url + `editar/${data.id_despesa}`, {
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
        bucarContas();
        buscarDespesas();        
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
    document.getElementById('conta').value = dados.FK_DESPESA_CONTA;
    document.getElementById('categoria').value = dados.FK_DESPESA_CATEGORIA;
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
function dataFormatadaBR(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}