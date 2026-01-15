document.addEventListener('DOMContentLoaded', carregarPlanos);

function carregarPlanos() {
    fetch(URLAPI + 'plano/listar')
        .then(r => r.json())
        .then(json => {
            console.log(json);

            renderizarPlanos(json);

        })
        .catch(err => console.error('Erro ao carregar planos:', err));
}

function renderizarPlanos(planos) {
    const grid = document.getElementById('planosGrid');
    grid.innerHTML = '';

    planos.forEach(plano => {
        const isRecomendado = Number(plano.RECOMENDADO) === 1;

        // Garante que recursos seja um array
        let recursos = plano.RECURSOS;
        if (typeof recursos === 'string') {
            try {
                recursos = JSON.parse(recursos);
            } catch {
                recursos = [];
            }
        }

        const card = document.createElement('div');
        card.className = `
            bg-white p-8 rounded-xl text-center animate-fadeIn
            ${isRecomendado
                ? 'relative shadow-xl border-2 border-emerald-500 scale-[1.02]'
                : 'shadow-lg'}
        `;

        const badge = isRecomendado
            ? `
              <span class="absolute -top-3 left-1/2 -translate-x-1/2
                           bg-emerald-600 text-white px-4 py-1
                           rounded-full text-sm shadow">
                Recomendado
              </span>
            `
            : '';

        const recursosHtml = recursos
            .map(r => `<p class="text-gray-600">${r}</p>`)
            .join('');

        card.innerHTML = `
            ${badge}

            <h4 class="text-xl font-semibold ${isRecomendado ? 'mt-2' : ''}">
                ${plano.NOME}
            </h4>

            <p class="text-4xl font-bold mt-2">
                R$${Number(plano.PRECO).toFixed(2).replace('.', ',')}
                <span class="text-lg text-gray-600">/${plano.PERIODO}</span>
            </p>

            <div class="mt-3">
                ${recursosHtml}
            </div>

            <button
              class="mt-6 bg-emerald-600 text-white px-6 py-2
                     w-full rounded-lg hover:bg-emerald-700"
            >
              <a class="block"
                 href="cadastre-se?plano=${plano.ID_PLANO}"
                 target="_blank"
                 rel="noopener noreferrer">
                 Escolher
              </a>
            </button>
        `;

        grid.appendChild(card);
    });
}
