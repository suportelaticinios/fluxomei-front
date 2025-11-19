<?php require_once './pages/header.php';?>    
<title>Home - FluxoMEI</title>

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- ANIMAÇÕES CUSTOM -->
<style>
  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: all .6s ease;
  }
  .fade-up.show {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<!-- CONTEÚDO -->
<main class="p-6" id="page-content">

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

    <!-- ENTRADAS / DESPESAS / MOVIMENTAÇÕES -->
    <div class="col-span-2 fade-up">
      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-4">Movimentações do Mês</h2>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="p-4 bg-emerald-50 rounded-lg shadow-sm">
            <div class="text-sm text-gray-500">Entradas (mês)</div>
            <div class="text-2xl font-bold text-emerald-600" id="totalEntradas">R$ 2.520,79</div>
          </div>
          <div class="p-4 bg-red-50 rounded-lg shadow-sm">
            <div class="text-sm text-gray-500">Despesas (mês)</div>
            <div class="text-2xl font-bold text-red-600" id="totalDespesas">R$ 1.120,78</div>
          </div>
        </div>

        <h3 class="font-semibold mb-2">Últimas Movimentações</h3>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-medium text-gray-600">Entradas</h4>
            <ul class="mt-2 space-y-2" id="ultimasEntradas">
              <!-- <li class="flex justify-between border-b py-2">
                <span>Mensalidade 
                  <small class="text-xs text-gray-500 ml-1">01/11/2025</small>
                </span>
                <strong>R$ 1.000,00</strong>
              </li> -->
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-medium text-gray-600">Despesas</h4>
            <ul class="mt-2 space-y-2" id="ultimasDespesas">
              <!-- <li class="flex justify-between border-b py-2">
                <span>Mensalidade 
                  <small class="text-xs text-gray-500 ml-1">01/11/2025</small>
                </span>
                <strong>R$ 1.000,00</strong>
              </li> -->
            </ul>
          </div>
        </div>

      </div>
    </div>

    <!-- SALDO / RESUMO -->
    <div class="fade-up" style="transition-delay: .2s">
      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
        <h2 class="text-lg font-semibold mb-4">Saldo</h2>
        <div class="text-3xl font-bold text-emerald-600" id="saldoAtual">R$ 1.000,00</div>
        <p class="text-sm text-gray-500 mt-2">Saldo disponível</p>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition mt-6">
        <h2 class="text-lg font-semibold mb-4">Resumo Rápido</h2>
        <div class="text-sm text-gray-600">Entradas: R$ 1.000,00</div>
        <div class="text-sm text-gray-600">Despesas: R$ 2.000,00</div>
      </div>
    </div>

  </div>

  <!-- GRÁFICO -->
  <div class="bg-white p-6 rounded-xl shadow-lg mt-8 fade-up" style="transition-delay: .4s">
    <h2 class="text-lg font-semibold mb-4">Resumo dos últimos 6 meses</h2>
    <canvas id="graficoMensal" height="50"></canvas>
  </div>
  <!-- GRÁFICO - ENTRANDAS -->
  <div class="bg-white p-6 rounded-xl shadow-lg mt-8 fade-up" style="transition-delay: .4s">
    <h2 class="text-lg font-semibold mb-4">Entradas por dia</h2>
    <div id="graficoEntradas" height="140"></div>
  </div>

</main>
<script src="<?=URL?>assets/js/home.js"></script>

<?php require_once './pages/footer.php';?>
