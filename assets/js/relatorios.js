const url = URLAPI + "relatorio/";

const btnGerarRelatorio = document.getElementById('btnGerarRelatorio');
const loading = document.getElementById('loadingScreen');

// EXPORTAÇÃO
const btnExportPdf = document.getElementById('exportPdf');
const btnExportCsv = document.getElementById('exportCsv');

btnGerarRelatorio.addEventListener('click', gerarRelatorio);
btnExportPdf.addEventListener('click', () => exportarRelatorio('pdf'));
btnExportCsv.addEventListener('click', () => exportarRelatorio('csv'));

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
    const categoria = document.getElementById('categoria').value;

    if (!tipo || !dataInicial || !dataFinal) {
        toast('Atenção', 'Preencha o tipo de relatório e o período.', '⚠️');
        return;
    }

    filtrosAtuais = {
        tipo,
        dataInicial,
        dataFinal,
        tipoMov,
        categoria
    };

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
                <th class="pb-2">Data</th>
                <th class="pb-2 text-right">Entradas</th>
                <th class="pb-2 text-right">Saídas</th>
                <th class="pb-2 text-right">Saldo do Dia</th>
                <th class="pb-2 text-right">Saldo Acumulado</th>
            </tr>
        `;

        linhas.forEach(l => {
            body.innerHTML += `
                <tr class="border-b">
                    <td class="py-2">${l.data}</td>
                    <td class="py-2 text-right text-green-600">${moeda(l.entradas)}</td>
                    <td class="py-2 text-right text-red-600">${moeda(l.saidas)}</td>
                    <td class="py-2 text-right">${moeda(l.saldo_dia)}</td>
                    <td class="py-2 text-right font-semibold">${moeda(l.saldo_acumulado)}</td>
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
