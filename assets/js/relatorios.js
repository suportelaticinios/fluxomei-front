const url = URLAPI + "relatorio/";

const btnGerarRelatorio = document.getElementById('btnGerarRelatorio');
const loading = document.getElementById('loadingScreen');

// EXPORTAÇÃO
const btnExportPdf = document.getElementById('exportPdf');
const btnExportCsv = document.getElementById('exportCsv');

btnGerarRelatorio.addEventListener('click', gerarRelatorio);
btnExportPdf.addEventListener('click', () => exportarRelatorio('pdf'));
// btnExportCsv.addEventListener('click', () => exportarRelatorio('csv'));

const selectTipoRelatorio = document.getElementById('tipo-relatorio');
const filtroConta = document.getElementById('filtro-conta');
const selectConta = document.getElementById('conta');
const filtrosAvancado = document.getElementById('filtros-avancados');

selectTipoRelatorio.addEventListener('change', () =>
{
    // limpar indicadores e tabela
    document.getElementById('indicadores').classList.add('hidden');
    document.getElementById('previa-relatorios').classList.add('hidden');

    if (selectTipoRelatorio.value === 'fluxo_caixa')
    {
        filtroConta.classList.remove('hidden');
        filtrosAvancado.classList.remove('hidden');

        carregarContas();
        carregarGrupoDeCategorias();
    } else {
        filtroConta.classList.add('hidden');
        filtrosAvancado.classList.add('hidden');
        document.getElementById('conta').value = '';
    }
});

/**
 * LIMPAR INDICARORES AO MUDAR DE CONTA
 */
selectConta.addEventListener('change', () => 
{
    // limpar indicadores e tabela
    document.getElementById('indicadores').classList.add('hidden');
    document.getElementById('previa-relatorios').classList.add('hidden');
})


let filtrosAtuais = {};

/**
 * GERA PREVIEW DO RELATÓRIO
 */
function gerarRelatorio()
{
    const tipo = document.getElementById('tipo-relatorio').value;
    const dataInicial = document.getElementById('data-inicial').value;
    const dataFinal = document.getElementById('data-final').value;
    const tipoMov = document.getElementById('tipo-movimentacao').value;
    const grupoCategoria = document.getElementById('grupo-categoria').value;

    if (!tipo || !dataInicial || !dataFinal) {
        toast('Atenção', 'Preencha o tipo de relatório e o período.', '⚠️');
        return;
    }

    filtrosAtuais = {
        tipo,
        dataInicial,
        dataFinal,
        tipoMov,
        grupoCategoria
    };

    // fluxo de caixa exige conta
    if (tipo === 'fluxo_caixa') {
        const idConta = document.getElementById('conta').value;

        if (!idConta) {
            toast('Atenção', 'Selecione uma conta para o fluxo de caixa.', '⚠️');
            loading.classList.add('hidden');
            return;
        }

        filtrosAtuais.idConta = idConta;
    }

    loading.classList.remove('hidden');

    fetch(url + 'preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filtrosAtuais)
    })
    .then(res => res.json())
    .then(data => {
        montarIndicadores(data.indicadores);
        montarTabela(tipo, data.linhas);
        document.getElementById('previa-relatorios').classList.remove('hidden');
    })
    .catch(err => {
        console.error(err);
        toast('Erro', 'Não foi possível gerar o relatório.', '❌');
    })
    .finally(() => loading.classList.add('hidden'));
}

/**
 * EXPORTA RELATÓRIO
 */
function exportarRelatorio(formato)
{
    if (!filtrosAtuais.tipo) {
        toast('Atenção', 'Gere o relatório antes de exportar.', '⚠️');
        return;
    }

    loading.classList.remove('hidden');

    fetch(url + `exportar/${formato}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filtrosAtuais)
    })
    .then(res => res.blob())
    .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, "_blank");
    })
    .catch(err => {
        console.error(err);
        toast('Erro', 'Erro ao exportar relatório.', '❌');
    })
    .finally(() => loading.classList.add('hidden'));
}

/**
 * BUSCAR CONTAS DO USUÁRIO
 */
function carregarContas() {
    fetch(URLAPI + 'conta/listar', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(contas => {
        const selectConta = document.getElementById('conta');
        selectConta.innerHTML = '<option value="">Selecione a conta</option>';

        contas.forEach(c => {
            console.log(c);
            selectConta.innerHTML += `
                <option value="${c.ID_CONTA}">
                    ${c.NUMERO_CONTA} - ${moeda(c.SALDO_ATUAL)}
                </option>
            `;
        });
    })
    .catch(err => {
        console.error(err);
        toast('Erro', 'Erro ao carregar contas.', '❌');
    });
}

/**
 * BUSCAR GRUPO DE CATEGORIAS
 */
function carregarGrupoDeCategorias() {
    fetch(URLAPI + 'categoria/grupos', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(contas => {
        const selectGrupoCategoria = document.getElementById('grupo-categoria');
        selectGrupoCategoria.innerHTML = '<option value="">Todas</option>';

        contas.forEach(c => {
            console.log(c);
            selectGrupoCategoria.innerHTML += `
                <option value="${c.ID_GRUPOS}">
                    ${c.NOME}
                </option>
            `;
        });
    })
    .catch(err => {
        console.error(err);
        toast('Erro', 'Erro ao carregar contas.', '❌');
    });
}


/**
 * INDICADORES
 */
function montarIndicadores(ind) {
    document.getElementById('indicadores').classList.remove('hidden');

    document.getElementById('total-entradas').innerText = moeda(ind.entradas);
    document.getElementById('total-saidas').innerText = moeda(ind.saidas);

    const resultado = document.getElementById('resultado');
    resultado.innerText = moeda(ind.resultado);
    resultado.classList.toggle('text-green-600', ind.resultado >= 0);
    resultado.classList.toggle('text-red-600', ind.resultado < 0);

    document.getElementById('label-resultado').innerText =
        filtrosAtuais.tipo === 'fluxo_caixa' ? 'Saldo Final' : 'Resultado';
}

/**
 * TABELA DINÂMICA
 */
function montarTabela(tipo, linhas) {
    const head = document.getElementById('previewHead');
    const body = document.getElementById('previewTable');

    head.innerHTML = '';
    body.innerHTML = '';

    if (tipo === 'balanco') {
        head.innerHTML = `
            <tr>
                <th class="pb-2">Categoria</th>
                <th class="pb-2 text-right">Total</th>
            </tr>
        `;

        linhas.forEach(l => {
            body.innerHTML += `
                <tr class="border-b">
                    <td class="py-2">${l.categoria}</td>
                    <td class="py-2 text-right ${l.total >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${moeda(l.total)}
                    </td>
                </tr>
            `;
        });
    }

    if (tipo === 'fluxo_caixa') {
        head.innerHTML = `
            <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th class="text-right">Valor</th>
                <th class="text-right">Saldo</th>
            </tr>
        `;

        linhas.forEach(l => {
            body.innerHTML += `
                <tr class="border-b">
                    <td>${l.data}</td>
                    <td>${l.descricao}</td>
                    <td class="text-right ${l.valor >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${moeda(l.valor)}
                    </td>
                    <td class="text-right font-semibold">
                        ${moeda(l.saldo)}
                    </td>
                </tr>
            `;
        });
    }
}

/**
 * UTIL
 */
function moeda(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function toast(titulo, msg, icon = '✔️') {
    document.getElementById('toastTitle').innerText = titulo;
    document.getElementById('toastMessage').innerText = msg;
    document.getElementById('toastIcon').innerText = icon;
    document.getElementById('toast').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('toast').classList.add('hidden');
    }, 3000);
}
