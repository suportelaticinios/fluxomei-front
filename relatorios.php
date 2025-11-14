<?php require_once './pages/header.php';?>
  <title>Relatórios - FluxoMEI</title>
  <!-- CONTEÚDO -->
  <main class="p-6" id="page-content">
        <div class="bg-white p-6 rounded-2xl shadow-sm w-full">  
          <div class="bg-white p-6 rounded shadow">
            <h2 class="text-lg font-semibold mb-4">Relatórios</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

              <!-- relatório mensal -->
              <div class="p-4 border border-gray-300 rounded">
                <h3 class="font-medium mb-2">Relatório Mensal</h3>
                <p class="text-sm text-gray-500 mb-3">Escolha mês e ano para gerar o relatório mensal.</p>
                <div class="flex space-x-2">
                  <input type="month" class="border border-gray-300 p-2" id="mes-mensal">
                  <button id="btnRelatorioMensal" class="px-3 py-2 bg-emerald-600 text-white rounded">Gerar</button>
                </div>
              </div>

              <!-- relatório anual -->
              <div class="p-4 border border-gray-300 rounded">
                <h3 class="font-medium mb-2">Relatório Anual</h3>
                <p class="text-sm text-gray-500 mb-3">Escolha o ano para gerar o relatório anual.</p>
                <div class="flex space-x-2">
                  <input type="number" min="2000" max="2100" class="border border-gray-300 p-2" id="ano-anual" placeholder="2025">
                  <button id="btnRelatorioAnual" class="px-3 py-2 bg-emerald-600 text-white rounded">Gerar</button>
                </div>
              </div>

              <!-- relatório de balanço -->
              <div class="p-4 border border-gray-300 rounded">
                <h3 class="font-medium mb-2">Balanço</h3>
                <p class="text-sm text-gray-500 mb-3">Gera o balanço por período (mostra resumo por grupo e categorias).</p>
                <div class="flex space-x-2">
                  <input type="month" class="border border-gray-300 p-2" id="mes-balanco">
                  <button class="px-3 py-2 bg-emerald-600 text-white rounded">Gerar</button>
                </div>
              </div>
            </div>
            <!-- botões de exportação -->
            <div>
              <h3 class="font-medium mb-2">Exportar</h3>
              <p class="text-sm text-gray-500 mb-3">Exportar relatórios em PDF ou CSV.</p>
              <div class="space-x-2">
                <button class="px-3 py-2 bg-red-600 text-white rounded" title="Exportar PDF">
                  <svg class="size-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>
                </button>
                <button class="px-3 py-2 bg-emerald-700 rounded" title="Exportar CSV">
                  <svg class="size-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM296 444C271.7 444 252 463.7 252 488L252 568C252 592.3 271.7 612 296 612L312 612C336.3 612 356 592.3 356 568L356 560C356 549 347 540 336 540C325 540 316 549 316 560L316 568C316 570.2 314.2 572 312 572L296 572C293.8 572 292 570.2 292 568L292 488C292 485.8 293.8 484 296 484L312 484C314.2 484 316 485.8 316 488L316 496C316 507 325 516 336 516C347 516 356 507 356 496L356 488C356 463.7 336.3 444 312 444L296 444zM432 444C403.3 444 380 467.3 380 496C380 524.7 403.3 548 432 548C438.6 548 444 553.4 444 560C444 566.6 438.6 572 432 572L400 572C389 572 380 581 380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560C484 531.3 460.7 508 432 508C425.4 508 420 502.6 420 496C420 489.4 425.4 484 432 484L456 484C467 484 476 475 476 464C476 453 467 444 456 444L432 444zM528 444C517 444 508 453 508 464L508 495.6C508 531.1 518.5 565.9 538.2 595.4L543.3 603.1C547 608.7 553.3 612 559.9 612C566.5 612 572.8 608.7 576.5 603.1L581.6 595.4C601.3 565.8 611.8 531.1 611.8 495.6L611.8 464C611.8 453 602.8 444 591.8 444C580.8 444 571.8 453 571.8 464L571.8 495.6C571.8 515.2 567.7 534.5 559.8 552.3C551.9 534.5 547.8 515.2 547.8 495.6L547.8 464C547.8 453 538.8 444 527.8 444z"/></svg>
                </button>
              </div>
            </div>

            <!-- área de exibição dá prévia de dados -->
            <div class="mt-6 hidden" id="previa-relatorios">
              <h2 class="text-lg font-semibold text-gray-800 mb-3">Prévia do Relatório</h2>
              <div class="bg-white border rounded-lg p-4 shadow-sm">
                <table class="w-full text-sm text-left text-gray-600">
                  <thead class="text-gray-700 border-b">
                    <tr>
                      <th class="pb-2">Data</th>
                      <th class="pb-2">Categoria</th>
                      <th class="pb-2">Descrição</th>
                      <th class="pb-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody id="previewTable">
                    <tr>
                      <td class="py-2">05/11/2025</td>
                      <td>Venda</td>
                      <td>Serviço prestado</td>
                      <td class="text-right text-green-600 font-semibold">R$ 850,00</td>
                    </tr>
                    <tr>
                      <td class="py-2">10/11/2025</td>
                      <td>Despesa</td>
                      <td>Compra de material</td>
                      <td class="text-right text-red-600 font-semibold">-R$ 120,00</td>
                    </tr>
                  </tbody>
                </table>
                <div class="mt-3 text-right text-gray-800 font-semibold">
                  Total: <span id="previewTotal" class="text-green-600">R$ 730,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  </main>
  <script src="assets/js/relatorios.js"></script>
<?php require_once './pages/footer.php';?>