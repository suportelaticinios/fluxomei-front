<?php require_once './pages/header.php';?>
  <title>Entradas - FluxoMEI</title>

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
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold mb-4">Entradas</h2>
                <div class="space-x-2">
                    <button data-titulo="Nova Entrada" data-modo="criar" id="openModalBtn" class="bg-emerald-800 openModalBtn text-white px-4 py-2 rounded hover:bg-emerald-700">Nova entrada</button>
                    <button id="btnExportarEntradas" class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Exportar CSV</button>
                </div>
            </div>
      
            <!-- Filtros -->
            <div class="flex flex-wrap gap-4 mb-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Selecione o campo</label>
                  <select name="" id="coluna" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                    <option value="banco">Banco</option>
                    <option value="conta">Conta</option>
                    <option value="categoria">Categoria</option>
                    <option value="descricao">Descrição</option>
                  </select>
                </div>
                <div class="flex-1 min-w-[200px]">
                  <label class="block text-sm text-gray-600 mb-1">Pesquisar</label>
                  <input id="pesquisarEntrada" type="text" placeholder="Buscar..." class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Data inicial</label>
                  <input id="dataInicial" type="date" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Data final</label>
                  <input id="dataFinal" type="date" class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                </div>
            </div>
      
            <!-- Tabela -->
            <div class="overflow-x-auto">
                <table class="w-full text-left border border-gray-200" id="tabela-entradas">
                  <thead class="bg-emerald-800 text-white">
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
                      <td class="px-4 py-2">Conta PJ</td>
                      <td class="px-4 py-2">Prestação de Serviços</td>
                      <td class="px-4 py-2">Venda A</td>
                      <td class="px-4 py-2 text-emerald-700 font-semibold">R$ 35,00</td>
                      <td class="px-4 py-2"><a href="#" class="text-emerald-700 hover:underline">Editar</a></td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-2">2</td>
                      <td class="px-4 py-2">10/11/2025</td>
                      <td class="px-4 py-2">Inter</td>
                      <td class="px-4 py-2">Conta Corrente</td>
                      <td class="px-4 py-2">Aplicações Resgatadas</td>
                      <td class="px-4 py-2">Resgate</td>
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
    <form class="bg-white rounded-lg shadow-lg w-full max-w-lg" id="formEntrada">
      <!-- Cabeçalho do modal -->
      <div class="flex justify-between items-center border-b border-gray-200 p-4">
        <h3 id="titulo-modal" class="text-lg font-semibold text-emerald-700">Nova entrada</h3>
        <span id="closeModalBtn" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</span>
      </div>

      <!-- Corpo do modal -->
      <div class="p-4 space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Data</label>
          <input id="data" type="date" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>  
        <div>
            <label class="block text-sm text-gray-600 mb-1">Conta</label>
            <select id="conta" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
                <option>Selecione uma conta</option>                
            </select>
        </div>
        <div>
            <label class="block text-sm text-gray-600 mb-1">Categoria</label>
            <select id="categoria" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
                <option>Selecione uma categoria</option>                
            </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Descrição</label>
          <input id="descricao" type="text" placeholder="Ex: Venda A" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Valor (R$)</label>
          <input id="valor" type="text" step="0.01" placeholder="0,00" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
      </div>

      <!-- Rodapé do modal -->
      <div class="flex justify-end border-t border-gray-300 p-4 space-x-2">
        <button id="cancelBtn" class="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Cancelar</button>
        <button class="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800">Salvar</button>
      </div>
    </form>
  </div>

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

  <script src="assets/js/jquery.js"></script>
  <script src="assets/js/jquerymask.js"></script>
  <script src="assets/js/script.js"></script>
  <script src="assets/js/entradas.js"></script>

<?php require_once './pages/header.php';?>