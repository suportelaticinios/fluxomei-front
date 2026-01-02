var tbTransferencias = document
    .getElementById('tabela-transferencias')
    .querySelector('tbody');

var listaTransferencias = [];
const url = `${URLAPI}transferencia/`;

const formTransferencia = document.getElementById('formTransferencia');
const selectContaOrigem  = document.getElementById('conta_origem');
const selectContaDestino = document.getElementById('conta_destino');
const selectCategoria    = document.getElementById('categoria');
const pesquisarTransferencia = document.getElementById('pesquisarTransferencia');

var modo = 'criar';
var idTransferencia = null;

// INIT
buscarTransferencias();
buscarContas();
buscarCategorias();

// máscara
$('#valor').mask('0.000.000,00', { reverse: true });

/* =========================
   EVENTOS
========================= */

// abrir edição
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".excluirTransferencia");

    if (!btn) return;

    if (!confirm('Deseja realmente excluir esta transferência?')) return;

    excluirTransferencia(btn.dataset.id);
});

// pesquisar
pesquisarTransferencia.addEventListener("keyup", function () {
    buscarTransferencias({
        data_inicio: document.getElementById("dataInicial").value,
        data_fim: document.getElementById("dataFinal").value,
        pesquisa: pesquisarTransferencia.value
    });
});

// submit
formTransferencia.addEventListener('submit', function (e) {
    e.preventDefault();

    registrarTransferencia({
        conta_origem_id: selectContaOrigem.value,
        conta_destino_id: selectContaDestino.value,
        categoria_id: selectCategoria.value,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        data_transferencia: document.getElementById('data').value
    });
});

/* =========================
   API
========================= */

function buscarTransferencias(filtros = {}) {
    const params = new URLSearchParams();

    for (const chave in filtros) {
        if (filtros[chave]) {
            params.append(chave, filtros[chave]);
        }
    }

    fetch(url + 'listar?' + params.toString(), {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(r => r.json())
    .then(data => {
        montarTabela(data);
        listaTransferencias = data;
    })
    .catch(err => console.log(err));
}

function registrarTransferencia(data) {
    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(url + 'cadastrar', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async r => {
        if (!r.ok) {
            const erro = await r.json();
            throw new Error(erro.message);
        }
        return r.json();
    })
    .then(res => {
        showToast("success", "Sucesso", "Transferência registrada com sucesso");
        formTransferencia.reset();
        buscarTransferencias();
        buscarContas();
    })
    .catch(err => {
        showToast("error", "Atenção", err.message);
    })
    .finally(() => {
        document.getElementById("loadingScreen").classList.add("hidden");
    });
}

function excluirTransferencia(id) {
    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch(url + `excluir/${id}`, {
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
    .then(() => {
        showToast("success", "Sucesso", "Transferência excluída");
        buscarTransferencias();
        buscarContas();
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

function buscarContas() {
    fetch(`${URLAPI}conta/listar`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(r => r.json())
    .then(contas => {
        selectContaOrigem.innerHTML = '<option value="">Conta origem</option>';
        selectContaDestino.innerHTML = '<option value="">Conta destino</option>';

        contas.forEach(conta => {
            const text = `${conta.AGENCIA} - ${conta.NUMERO_CONTA} - ${toBR(conta.SALDO_ATUAL)}`;

            const opt1 = new Option(text, conta.ID_CONTA);
            const opt2 = new Option(text, conta.ID_CONTA);

            selectContaOrigem.add(opt1);
            selectContaDestino.add(opt2);
        });
    });
}

function buscarCategorias() {
    fetch(`${URLAPI}categoria/listar?tipo=TRANSFERENCIA`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(r => r.json())
    .then(categorias => {
        categorias.forEach(cat => {
            const opt = new Option(cat.NOME, cat.ID_CATEGORIA);
            selectCategoria.add(opt);
        });
    });
}

function montarTabela(dados) {
    tbTransferencias.innerHTML = '';

    dados.forEach(t => {
        tbTransferencias.innerHTML += `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-2">${t.id}</td>
                <td class="px-4 py-2">${dataFormatadaBR(t.DATA)}</td>
                <td class="px-4 py-2">${t.CONTA_ORIGEM}</td>
                <td class="px-4 py-2">${t.CONTA_DESTINO}</td>
                <td class="px-4 py-2">${t.CATEGORIA}</td>
                <td class="px-4 py-2">${t.DESCRICAO || ''}</td>
                <td class="px-4 py-2 font-semibold">${toBR(t.valor)}</td>
                <td class="px-4 py-2">
                    <a href="#" 
                       data-id="${t.id}" 
                       class="text-red-600 hover:underline excluirTransferencia">
                       Excluir
                    </a>
                </td>
            </tr>
        `;
    });
}

/* =========================
   HELPERS
========================= */

function toBR(valor) {
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
