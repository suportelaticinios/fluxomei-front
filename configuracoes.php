<?php require_once './pages/header.php'; ?>
<title>Configurações - FluxoMEI</title>

<!-- LOADING -->
<div id="loadingScreen" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] hidden">
    <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-emerald-700 font-medium">Carregando...</p>
    </div>
</div>

<main class="p-6" id="page-content">
    <div class="bg-white p-6 rounded-2xl shadow-sm w-full">

        <h2 class="text-lg font-semibold mb-4">⚙️ Configurações do Usuário</h2>

        <!-- ABAS -->
        <div class="border-b border-gray-200 mb-4 flex space-x-4">
            <button class="tab-btn py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-emerald-600 hover:border-emerald-600"
                data-tab="assinatura">Assinatura</button>

            <button class="tab-btn py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600"
                data-tab="faturas">Faturas</button>

            <button class="tab-btn py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-yellow-600 hover:border-yellow-600"
                data-tab="conta">Conta</button>
        </div>

        <!-- ================= ASSINATURA ================= -->
        <div id="assinatura" class="tab-content">

            <!-- Plano atual -->
            <div class="border border-gray-200 rounded-xl p-5 mb-4">
                <h3 class="text-lg font-medium text-gray-700 mb-3">📦 Plano Atual</h3>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <p class="text-gray-500">Plano</p>
                        <p class="font-semibold" data-plano-nome></p>
                    </div>

                    <div>
                        <p class="text-gray-500">Valor</p>
                        <p class="font-semibold" data-plano-valor></p>
                    </div>

                    <div>
                        <p class="text-gray-500">Status</p>
                        <span data-plano-status
                        class="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">                            
                        </span>
                    </div>

                    <div>
                        <p class="text-gray-500">Próxima cobrança</p>
                        <p class="font-semibold" data-plano-proxima></p>
                    </div>
                </div>
            </div>

            <!-- SEM CARTÃO -->
            <div id="sem-cartao" class="hidden border border-gray-200 rounded-xl p-5 mb-4">
                <p class="text-sm text-gray-600 mb-3">
                    Nenhuma forma de pagamento cadastrada.
                </p>

                <button 
                data-modal-open
                data-modal-title="Adicionar Cartão"
                data-modal-template="tpl-cartao"
                class="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-emerald-700">
                    ➕ Inserir cartão
                </button>
            </div>

            <!-- COM CARTÃO -->
            <div id="com-cartao" class="hidden flex items-center justify-between flex-wrap gap-4 border border-gray-200 rounded-xl p-5 mb-4">
                <div class="text-sm text-gray-600">
                    Visa •••• 4242 <br>
                    <span class="text-xs text-gray-400">Validade 08/2027</span>
                </div>

                <div class="flex gap-2">
                    <button class="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">
                    Alterar cartão
                    </button>

                    <button class="px-4 py-2 text-sm rounded-lg border text-red-600 hover:bg-red-50">
                    Remover
                    </button>
                </div>
            </div>

            <!-- Ações -->
            <div class="border border-gray-200 rounded-xl p-5">
                <h3 class="text-lg font-medium text-gray-700 mb-3">⚡ Ações</h3>

                <div class="flex flex-wrap gap-3">
                    <button class="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-emerald-700">
                        Trocar plano
                    </button>

                    <button class="bg-red-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-red-700">
                        Cancelar assinatura
                    </button>
                </div>
            </div>
        </div>

        <!-- ================= FATURAS ================= -->
        <div id="faturas" class="tab-content hidden">
            <h2 class="text-lg font-medium text-gray-700 mb-3">Últimas Faturas</h2>

            <div class="overflow-x-auto">
                <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden" id="tabela-cobrancas">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">#</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Data</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Valor</th>
                            <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                            <th class="px-4 py-2 text-center text-sm font-semibold text-gray-600 border-b">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <!-- JS -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- ================= CONTA ================= -->
        <div id="conta" class="tab-content hidden">
            <h2 class="text-lg font-medium text-gray-700 mb-3">Informações da Conta</h2>

            <form class="space-y-4 max-w-xl" id="formContato">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                    <input id="nome" type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input id="telefone" type="text"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
                    <input id="senha" type="password"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div class="pt-2">
                    <button class="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                        💾 Salvar alterações
                    </button>
                </div>
            </form>
        </div>

    </div>
</main>

<!-- TOAST -->
<div id="toast" class="fixed top-6 right-6 z-[9999] hidden">
  <div id="toastBox" class="bg-white shadow-lg border-l-4 p-4 rounded-lg min-w-[250px] flex items-start gap-3 animate-fadeIn">
    <span id="toastIcon" class="text-xl">✔️</span>
    <div>
      <p id="toastTitle" class="font-semibold"></p>
      <p id="toastMessage" class="text-sm text-gray-700"></p>
    </div>
  </div>
</div>

<!-- TEMPLATE: CARTÃO -->
<template id="tpl-cartao">
  <form id="formCartao" class="space-y-3">
    <select name="plano_pretendido" id="plano_pretendido" 
    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <option value="">Escolha um plano</option>
    </select>

    <div class="flex gap-2">
        <input type="text" id="card_name" placeholder="Nome no cartão" 
        class="input w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>

        <input type="text" id="card_number" placeholder="Número do cartão" 
        class="input w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>    

    <div class="flex gap-2">
      <input type="text" id="card_expiry" placeholder="MM/AA" 
      class="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">

      <input type="number" id="card_cvv" placeholder="CVV" 
      class="input w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <div class="flex hidden justify-end border border-gray-300 p-2 rounded-lg" id="infoPlano">
        <span id="valorPlano" class="text-emerald-600 font-bold">R$ 29,90</span>
    </div>

    <div class="flex justify-end gap-2 pt-4">
      <button type="button" data-modal-close class="btn-secondary">Cancelar</button>
      <button type="submit" class="btn-primary">Salvar</button>
    </div>
  </form>
</template>


<script src="<?=URL?>assets/js/jquery.js"></script>
<script src="<?=URL?>assets/js/jquerymask.js"></script>
<script src="<?=URL?>assets/js/script.js"></script>
<script src="<?=URL?>assets/js/configuracao.js"></script>

<script>
    const tabButtons  = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function ativarTab(tabId) {
        // remove destaque de todas
        tabButtons.forEach(btn => {
        btn.classList.remove('text-blue-600', 'border-blue-600');
        });

        // esconde todos os conteúdos
        tabContents.forEach(content => {
        content.classList.add('hidden');
        });

        // destaca o botão ativo
        const btnAtivo = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (btnAtivo) {
        btnAtivo.classList.add('text-blue-600', 'border-blue-600');
        }

        // mostra o conteúdo ativo
        const conteudoAtivo = document.getElementById(tabId);
        if (conteudoAtivo) {
        conteudoAtivo.classList.remove('hidden');
        }
  }

  // clique nas abas
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      ativarTab(button.dataset.tab);
    });
  });

  // aba padrão ao carregar
  if (tabButtons.length > 0) {
    ativarTab(tabButtons[0].dataset.tab);
  }
</script>

<?php require_once './pages/footer.php'; ?>
