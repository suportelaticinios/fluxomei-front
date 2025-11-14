<?php require_once './pages/header.php';?>
  <title>Despesas - FluxoMEI</title>
  <!-- CONTEÚDO -->
  <main class="p-6" id="page-content">
        <div class="bg-white p-6 rounded-2xl shadow-sm w-full">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold mb-4">Despesas</h2>
                <div class="space-x-2">
                    <button id="openModalBtn" class="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600">Nova despesa</button>
                    <button class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Exportar CSV</button>
                </div>
            </div>
      
            <!-- Filtros -->
            <div class="flex flex-wrap gap-4 mb-4">
                <div class="flex-1 min-w-[200px]">
                  <label class="block text-sm text-gray-600 mb-1">Pesquisar</label>
                  <input type="text" placeholder="Buscar por descrição, banco, conta..." class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Data inicial</label>
                  <input type="date" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Data final</label>
                  <input type="date" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
                </div>
            </div>
      
            <!-- Tabela -->
            <div class="overflow-x-auto">
                <table class="w-full text-left border border-gray-200">
                  <thead class="bg-red-700 text-white">
                    <tr>
                      <th class="px-4 py-2">ID</th>
                      <th class="px-4 py-2">Data</th>
                      <th class="px-4 py-2">Banco</th>
                      <th class="px-4 py-2">Conta</th>
                      <th class="px-4 py-2">Categoria</th>
                      <th class="px-4 py-2">Descrição</th>
                      <th class="px-4 py-2">Valor</th>
                      <th class="px-4 py-2">Ação</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y">
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-2">1</td>
                      <td class="px-4 py-2">03/11/2025</td>
                      <td class="px-4 py-2">Nubank</td>
                      <td class="px-4 py-2">21584-3</td>
                      <td class="px-4 py-2">Ifood</td>
                      <td class="px-4 py-2">Compra de delivery</td>
                      <td class="px-4 py-2 text-red-700 font-semibold">R$ 35,00</td>
                      <td class="px-4 py-2"><a href="#" class="text-red-700 hover:underline">Editar</a></td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-2">2</td>
                      <td class="px-4 py-2">10/11/2025</td>
                      <td class="px-4 py-2">Inter</td>
                      <td class="px-4 py-2">85624-5</td>
                      <td class="px-4 py-2">Outras</td>
                      <td class="px-4 py-2">Compra de bolo no pote</td>
                      <td class="px-4 py-2 text-red-700 font-semibold">R$ 21,90</td>
                      <td class="px-4 py-2"><a href="#" class="text-red-700 hover:underline">Editar</a></td>
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
        <h3 class="text-lg font-semibold text-red-700">Nova despesa</h3>
        <button id="closeModalBtn" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
      </div>

      <!-- Corpo do modal -->
      <div class="p-4 space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Data</label>
          <input type="date" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
        </div>  
        <div>
            <label class="block text-sm text-gray-600 mb-1">Categoria</label>
            <select class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
                <option>Selecione uma conta</option>
                <option>52168-9</option>
                <option>41245-6</option>
                <option>78542-6</option>
                <option>58741-3</option>
            </select>
        </div>
        <div>
            <label class="block text-sm text-gray-600 mb-1">Categoria</label>
            <select class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
                <option>Selecione uma categoria</option>
                <option>Prestação de Serviços</option>
                <option>Aplicações Resgatadas</option>
                <option>Vendas</option>
                <option>Outros</option>
            </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Descrição</label>
          <input type="text" placeholder="Ex: Venda A" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Valor (R$)</label>
          <input type="number" step="0.01" placeholder="0,00" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-700">
        </div>
      </div>

      <!-- Rodapé do modal -->
      <div class="flex justify-end border-t border-gray-300 p-4 space-x-2">
        <button id="cancelBtn" class="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Cancelar</button>
        <button class="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800">Salvar</button>
      </div>
    </div>
  </div>
  <script src="assets/js/script.js"></script>

<?php require_once './pages/footer.php';?>