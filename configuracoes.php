<?php require_once './pages/header.php';?>
<title>Configurações - FluxoMEI</title>
    <!-- LOADING -->
    <div id="loadingScreen" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] hidden">
        <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-emerald-700 font-medium">Carregando...</p>
        </div>
    </div>

    <!-- CONTEÚDO -->
    <main class="p-6" id="page-content">
        <div class="bg-white p-6 rounded-2xl shadow-sm w-full">
            <h2 class="text-lg font-semibold mb-4">⚙️ Configurações do Usuário</h2>
        
            <!-- Abas -->
            <div class="border-b border-gray-200 mb-4 flex space-x-4">
              <button class="tab-btn py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600" data-tab="faturas">Faturas</button>
              <button class="tab-btn py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-emerald-600 hover:border-emerald-600" data-tab="contatos">Contatos</button>
            </div>
        
            <!-- Conteúdos -->
            <div id="faturas" class="tab-content">
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
                        </tbody>
                    </table>
                </div>
            </div>
        
            <!-- Aba Contatos -->
            <div id="contatos" class="tab-content hidden">
                <h2 class="text-lg font-medium text-gray-700 mb-3">Informações de Contato</h2>
    
                <form class="space-y-4" id="formContato">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                        <select name="idPlano" id="idPlano" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="1">Grátis</option>
                            <option value="2">Plano Pro</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                        <input id="nome" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Seu nome completo">
                    </div>
        
                    <!-- <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input type="email" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seuemail@exemplo.com">
                    </div> -->
        
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                        <input id="telefone" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(00) 00000-0000">
                    </div>
        
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Alterar senha</label>
                        <input id="senha" type="password" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nova senha">
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

  <script>
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            const target = button.dataset.tab;
            console.log(target)
            // remove estado ativo de todas as abas
            tabButtons.forEach(btn => btn.classList.remove('text-blue-600', 'border-blue-600'));
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // ativa a aba selecionada
            button.classList.add('text-blue-600', 'border-blue-600');
            document.getElementById(target).classList.remove('hidden');
        });
    });

    // Define a aba padrão (Faturas)
    tabButtons[0].classList.add('text-blue-600', 'border-blue-600');

  </script>
  <script src="<?=URL?>assets/js/jquery.js"></script>
  <script src="<?=URL?>assets/js/jquerymask.js"></script>
  <script src="<?=URL?>assets/js/script.js"></script>
  <script src="<?=URL?>assets/js/configuracao.js"></script>
<?php require_once './pages/footer.php';?>
