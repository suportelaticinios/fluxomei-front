<?php require_once './pages/header.php';?>
<title>Contas - FluxoMEI</title>
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
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h2 class="text-lg text-center md:text-right font-semibold mb-4">Contas</h2>
                <div class="space-x-2">
                    <button data-titulo="Nova Conta" data-modo="criar" id="openModalBtn" class="bg-emerald-800 openModalBtn text-white px-4 py-2 rounded hover:bg-emerald-700">Nova conta</button>
                    <button id="btnExportarContas" class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Exportar CSV</button>
                </div>
            </div>
      
            <!-- Filtros -->
            <div class="flex flex-col md:flex-row md:flex-wrap gap-4 mb-4">
              <div>
                  <label class="block text-sm text-gray-600 mb-1">Selecione o campo</label>
                  <select name="" id="coluna" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
                    <option value="banco">Banco</option>
                    <option value="agencia">Agencia</option>
                    <option value="conta">Conta</option>
                  </select>
                </div>
                <div class="flex-1 min-w-[200px]">
                  <label class="block text-sm text-gray-600 mb-1">Pesquisar</label>
                  <input id="pesquisarConta" type="text" placeholder="Buscar por nº da conta, banco..." class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700">
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
                  </tbody>
                </table>
            </div>
        </div>
  </main>

  <!-- Modal -->
  <div id="entryModal" class="hidden fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50 p-4">
    <form id="formConta" class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <!-- Cabeçalho do modal -->
      <div class="flex justify-between items-center border-b border-gray-200 p-4">
        <h3 id="titulo-modal" class="text-lg font-semibold text-emerald-700"></h3>
        <span id="closeModalBtn" class="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer">&times;</span>
      </div>

      <!-- Corpo do modal -->
      <div class="p-4 space-y-4"> 
        <div>
            <label class="block text-sm text-gray-600 mb-1">Banco</label>
            <select id="idBanco" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
                <option>Selecione uma banco</option>                
            </select>
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Agência</label>
          <input id="agencia" type="text" placeholder="Ex: 0119-6" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Nº da Conta</label>
          <input id="conta" type="text" placeholder="Ex: 568745-6" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Saldo Inicial (R$)</label>
          <input id="saldoInicial" type="text" step="0.01" placeholder="0,00" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Saldo Atual (R$)</label>
          <input id="saldoAtual" type="text" step="0.01" placeholder="0,00" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>
      </div>

      <!-- Rodapé do modal -->
      <div class="flex justify-end border-t border-gray-300 p-4 space-x-2">
        <a id="cancelBtn" class="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Cancelar</a>
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

  <script src="<?=URL?>assets/js/jquery.js"></script>
  <script src="<?=URL?>assets/js/jquerymask.js"></script>

  <script src="<?=URL?>assets/js/script.js"></script>
  <script src="<?=URL?>assets/js/contas.js"></script>
<?php require_once './pages/footer.php';?>