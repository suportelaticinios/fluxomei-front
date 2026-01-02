<?php require_once './pages/header.php'; ?>
<title>Relatórios - FluxoMEI</title>

<!-- LOADING -->
<div id="loadingScreen" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] hidden">
  <div class="flex flex-col items-center">
    <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    <p class="mt-4 text-emerald-700 font-medium">Carregando...</p>
  </div>
</div>

<main class="p-6" id="page-content">
  <div class="bg-white p-6 rounded-2xl shadow-sm w-full">
    <div class="bg-white p-6 rounded shadow">

      <h2 class="text-lg font-semibold mb-6">Relatórios Financeiros</h2>

      <!-- FILTROS PRINCIPAIS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div class="md:col-span-4">
          <label class="text-sm font-medium text-gray-700">Tipo de Relatório</label>
          <select id="tipo-relatorio" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
            <option value="">Selecione</option>
            <option value="balanco">Balanço</option>
            <option value="fluxo_caixa">Fluxo de Caixa</option>
          </select>
        </div>

        <div class="col-span-2">
          <label class="text-sm font-medium text-gray-700">Data Inicial</label>
          <input type="date" id="data-inicial" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>

        <div class="col-span-2">
          <label class="text-sm font-medium text-gray-700">Data Final</label>
          <input type="date" id="data-final" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-700">
        </div>

        <div class="flex items-end col-span-4">
          <button id="btnGerarRelatorio"
                  class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded">
            Gerar Relatório
          </button>
        </div>

      </div>

      <!-- FILTROS AVANÇADOS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div>
          <label class="text-sm font-medium text-gray-700">Tipo de Movimentação</label>
          <select id="tipo-movimentacao" class="w-full border rounded p-2 mt-1">
            <option value="">Todas</option>
            <option value="entrada">Entradas</option>
            <option value="saida">Saídas</option>
          </select>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Categoria</label>
          <select id="categoria" class="w-full border rounded p-2 mt-1">
            <option value="">Todas</option>
            <!-- categorias dinâmicas -->
          </select>
        </div>

      </div>

      <!-- INDICADORES -->
      <div id="indicadores" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 hidden">

        <div class="bg-gray-50 p-4 rounded border">
          <p class="text-sm text-gray-500">Entradas</p>
          <p class="text-xl font-semibold text-green-600" id="total-entradas">R$ 0,00</p>
        </div>

        <div class="bg-gray-50 p-4 rounded border">
          <p class="text-sm text-gray-500">Saídas</p>
          <p class="text-xl font-semibold text-red-600" id="total-saidas">R$ 0,00</p>
        </div>

        <div class="bg-gray-50 p-4 rounded border">
          <p class="text-sm text-gray-500" id="label-resultado">Resultado</p>
          <p class="text-xl font-semibold" id="resultado">R$ 0,00</p>
        </div>

      </div>

      <!-- PRÉVIA DO RELATÓRIO -->
      <div id="previa-relatorios" class="hidden">
        <h2 class="text-lg font-semibold text-gray-800 mb-3">Prévia do Relatório</h2>

        <div class="bg-white border rounded-lg p-4 shadow-sm overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-600">
            <thead class="text-gray-700 border-b" id="previewHead">
              <!-- Cabeçalho dinâmico -->
            </thead>
            <tbody id="previewTable">
              <!-- Dados dinâmicos -->
            </tbody>
          </table>
        </div>

        <!-- EXPORTAÇÃO -->
        <div class="flex gap-2 mt-4" id="acoes-exportacao">
          <button id="exportPdf" class="px-4 py-2 bg-red-600 text-white rounded">
            Exportar PDF
          </button>
          <button id="exportCsv" class="px-4 py-2 bg-emerald-700 text-white rounded">
            Exportar CSV
          </button>
        </div>
      </div>

    </div>
  </div>
</main>

<!-- TOAST -->
<div id="toast" class="fixed top-6 right-6 z-[9999] hidden">
  <div class="bg-white shadow-lg border-l-4 p-4 rounded-lg min-w-[250px] flex items-start gap-3">
    <span id="toastIcon" class="text-xl">✔️</span>
    <div>
      <p id="toastTitle" class="font-semibold"></p>
      <p id="toastMessage" class="text-sm text-gray-700"></p>
    </div>
  </div>
</div>

<script src="assets/js/script.js"></script>
<script src="assets/js/relatorios.js"></script>
<?php require_once './pages/footer.php'; ?>
