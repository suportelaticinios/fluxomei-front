<?php require_once './pages/header.php';?>
<title>Configurações - FluxoMEI</title>
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
                    <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
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
                        <tr>
                            <td class="px-4 py-2 text-sm text-gray-700">#1258</td>
                            <td class="px-4 py-2 text-sm text-gray-700">10/11/2025</td>
                            <td class="px-4 py-2 text-sm text-gray-700">R$ 350,00</td>
                            <td class="px-4 py-2 text-sm">
                                <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Pago</span>
                            </td>
                            <td class="px-4 py-2 text-center space-x-2">
                                <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">Ver detalhes</button>
                                <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Baixar PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 text-sm text-gray-700">#1257</td>
                            <td class="px-4 py-2 text-sm text-gray-700">10/10/2025</td>
                            <td class="px-4 py-2 text-sm text-gray-700">R$ 350,00</td>
                            <td class="px-4 py-2 text-sm">
                                <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pendente</span>
                            </td>
                            <td class="px-4 py-2 text-center space-x-2">
                                <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">Ver detalhes</button>
                                <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Baixar PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 text-sm text-gray-700">#1256</td>
                            <td class="px-4 py-2 text-sm text-gray-700">10/09/2025</td>
                            <td class="px-4 py-2 text-sm text-gray-700">R$ 350,00</td>
                            <td class="px-4 py-2 text-sm">
                                <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Vencido</span>
                            </td>
                            <td class="px-4 py-2 text-center space-x-2">
                                <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">Ver detalhes</button>
                                <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Baixar PDF</button>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-4 py-2 text-sm text-gray-700">#1255</td>
                            <td class="px-4 py-2 text-sm text-gray-700">10/08/2025</td>
                            <td class="px-4 py-2 text-sm text-gray-700">R$ 350,00</td>
                            <td class="px-4 py-2 text-sm">
                                <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Cancelado</span>
                            </td>
                            <td class="px-4 py-2 text-center space-x-2">
                                <button class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-200 transition">Ver detalhes</button>
                                <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Baixar PDF</button>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        
            <!-- Aba Contatos -->
            <div id="contatos" class="tab-content hidden">
                <h2 class="text-lg font-medium text-gray-700 mb-3">Informações de Contato</h2>
    
                <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                    <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Seu nome completo">
                </div>
        
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input type="email" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="seuemail@exemplo.com">
                </div>
        
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(00) 00000-0000">
                </div>
        
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Alterar senha</label>
                    <input type="password" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nova senha">
                </div>
        
                <div class="pt-2">
                    <button type="button" class="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    💾 Salvar alterações
                    </button>
                </div>
                </form>
            </div>  
        </div>
    </main>
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
  <script src="<?=URL?>assets/js/script.js"></script>
<?php require_once './pages/footer.php';?>