<?php require_once './pages/header.php';?>    
  <title>Home - FluxoMEI</title>
  <!-- CONTEÚDO -->
  <main class="p-6" id="page-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- entradas/despesas - ultimas movimentações -->
          <div class="col-span-2">
            <div class="bg-white p-6 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">Movimentações do Mês</h2>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="p-4 bg-emerald-50 rounded">
                  <div class="text-sm text-gray-500">Entradas (mês)</div>
                  <div class="text-2xl font-bold text-emerald-600">R$ 2.520,79 </div>
                </div>
                <div class="p-4 bg-red-50 rounded">
                  <div class="text-sm text-gray-500">Despesas (mês)</div>
                  <div class="text-2xl font-bold text-red-600">R$ 1.120,78</div>
                </div>
              </div>
              <h3 class="font-semibold mb-2">Últimas Movimentações</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-600">Entradas</h4>
                  <ul class="mt-2 space-y-2">
                    <li class="flex justify-between border-b py-2"><span>Mensalidade <small class="text-xs text-gray-500">01/11/2025</small></span><strong>R$ 1.000,00</strong></li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-600">Despesas</h4>
                  <ul class="mt-2 space-y-2">
                    <li class="flex justify-between border-b py-2"><span>Mensalidade <small class="text-xs text-gray-500">01/11/2025</small></span><strong>R$ 1.000,00</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- saldo e resumo -->
          <div>
            <div class="bg-white p-6 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">Saldo</h2>
              <div class="text-3xl font-bold text-emerald-600">R$ 1.000,00</div>
              <p class="text-sm text-gray-500 mt-2">Saldo disponível</p>
            </div>
            <div class="bg-white p-6 rounded shadow mt-6">
              <h2 class="text-lg font-semibold mb-4">Resumo Rápido</h2>
              <div class="text-sm text-gray-600">Entradas: R$ 1.000,00</div>
              <div class="text-sm text-gray-600">Despesas: R$ 2.000,00</div>
            </div>
          </div>
        </div>
  </main>    
<?php require_once './pages/footer.php';?>