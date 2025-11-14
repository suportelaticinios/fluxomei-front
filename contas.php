<?php require_once './pages/header.php';?>
  <!-- CONTEÚDO -->
  <main class="p-6" id="page-content">
        <div class="bg-white p-6 rounded-2xl shadow-sm w-full">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold mb-4">Contas</h2>
                <div class="space-x-2">
                    <button id="openModalBtn" class="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-700">Nova conta</button>
                    <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Exportar CSV</button>
                </div>
            </div>
      
            <!-- Filtros -->
            <div class="flex flex-wrap gap-4 mb-4">
                <div class="flex-1 min-w-[200px]">
                  <label class="block text-sm text-gray-600 mb-1">Pesquisar</label>
                  <input type="text" placeholder="Buscar por nº da conta, banco..." class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                </div>                
            </div>
      
            <!-- Tabela -->
            <div class="overflow-x-auto">
                <table class="w-full text-left border border-gray-200" id="tabela-contas">
                  <thead class="bg-emerald-800 text-white">
                    <tr>
                      <th class="px-4 py-2">ID</th>
                      <th class="px-4 py-2">Criado Em</th>
                      <th class="px-4 py-2">Banco</th>
                      <th class="px-4 py-2">Agência</th>
                      <th class="px-4 py-2">Nº da Conta</th>
                      <th class="px-4 py-2">Saldo Inicial</th>
                      <th class="px-4 py-2">Saldo Atual</th>
                      <th class="px-4 py-2">Ação</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-2">1</td>
                      <td class="px-4 py-2">03/11/2025</td>
                      <td class="px-4 py-2">Nubank</td>
                      <td class="px-4 py-2">1416</td>
                      <td class="px-4 py-2">142536</td>
                      <td class="px-4 py-2">R$ 20,00</td>
                      <td class="px-4 py-2 text-emerald-700 font-semibold">R$ 35,00</td>
                      <td class="px-4 py-2"><a href="#" class="text-emerald-700 hover:underline">Editar</a></td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-2">2</td>
                      <td class="px-4 py-2">10/11/2025</td>
                      <td class="px-4 py-2">Caixa Econômica</td>
                      <td class="px-4 py-2">0119</td>
                      <td class="px-4 py-2">142548</td>
                      <td class="px-4 py-2">R$ 10,00</td>
                      <td class="px-4 py-2 text-emerald-700 font-semibold">R$ 21,90</td>
                      <td class="px-4 py-2"><a href="#" class="text-emerald-700 hover:underline">Editar</a></td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
  </main>

  <!-- Modal -->
  <div id="entryModal" class="hidden fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <!-- Cabeçalho do modal -->
      <div class="flex justify-between items-center border-b border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-emerald-700">Nova Conta</h3>
        <button id="closeModalBtn" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
      </div>

      <!-- Corpo do modal -->
      <div class="p-4 space-y-4"> 
        <div>
            <label class="block text-sm text-gray-600 mb-1">Banco</label>
            <select class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
                <option>Selecione uma banco</option>
                <option>BANCO DO BRASIL</option>
                <option>CAIXA ECONÔMICA FEDERAL</option>
                <option>NU PAGAMENTOS S.A</option>
            </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Agência</label>
          <input type="text" placeholder="Ex: 0119-6" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Nº da Conta</label>
          <input type="text" placeholder="Ex: 568745-6" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Saldo Inicial (R$)</label>
          <input type="number" step="0.01" placeholder="0,00" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Saldo Atual (R$)</label>
          <input type="number" step="0.01" placeholder="0,00" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
      </div>

      <!-- Rodapé do modal -->
      <div class="flex justify-end border-t border-gray-300 p-4 space-x-2">
        <button id="cancelBtn" class="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Cancelar</button>
        <button class="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800">Salvar</button>
      </div>
    </div>
  </div>
  <script src="<?=URL?>assets/js/script.js"></script>
  <script src="<?=URL?>assets/js/contas.js"></script>
<?php require_once './pages/footer.php';?>