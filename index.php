<?php require_once('./config.php')?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <title>FluxoMEI - Gestão Financeira</title>

  <!-- Tailwind + Plugins -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          keyframes: {
            fadeIn: {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          },
          animation: {
            fadeIn: "fadeIn 0.6s ease-out forwards",
          },
        },
      },
      plugins: [
        tailwindcssTypography = function({ addBase }) {
          addBase({
            "h1, h2, h3, h4, p": {
              "@apply antialiased": {},
            },
          });
        }
      ]
    };
  </script>

  <style>
    body { background: #f5f7f6; }
  </style>
</head>

<body class="text-gray-800">

  <!-- NAV -->
  <nav class="w-full py-4 md:py-6 bg-white/70 backdrop-blur border-b border-gray-200">
    <div class="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6">

      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-emerald-600 rounded-sm">
            <img src="<?=URL?>assets/img/logo.png?>" alt="">
        </div>
        <h1 class="text-xl md:text-2xl font-semibold text-emerald-700">FluxoMEI</h1>
      </div>

      <!-- Menu -->
      <div class="hidden md:flex gap-2 text-gray-700 font-medium">
        <a href="<?=URL?>login?>" class="hover:bg-gray-300 px-3 py-2 bg-gray-200 rounded-md">Login</a>
        <a href="<?=URL?>cadastre-se?>" class="hover:bg-emerald-700 px-3 py-2 bg-emerald-600 text-white rounded-md">Cadastre-se</a>
      </div>

      <!-- Menu Mobile -->
      <button id="menuBtn" class="md:hidden text-2xl">&#9776;</button>
    </div>

    <!-- Mobile dropdown -->
    <div id="mobileMenu" class="hidden flex-col px-4 pb-4 space-y-2 text-gray-700 font-medium md:hidden">
      <a href="#" class="hover:bg-gray-300 px-3 py-2 bg-gray-200 rounded-md">Recursos</a>
      <a href="#" class="hover:bg-emerald-700 px-3 py-2 bg-emerald-600 text-white rounded-md">Preço</a>
    </div>
  </nav>

  <script>
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  </script>

  <!-- HERO -->
  <section class="w-full bg-emerald-600">

    <div class="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-FadeIn">

        <div class="flex order-2 flex-col md:order-1">

          <h2 class="text-3xl text-white md:text-5xl font-bold text-gray-800 leading-tight">
            Gestão financeira para MEIs e autônomos
          </h2>

          <p class="text-white text-base md:text-md mt-4">
            Simplifique a gestão das suas finanças com o <b>FluxoMEI</b>, um sistema para controle financeiro.
          </p>
          <p class="text-white text-base md:text-md mt-4">
            Tenha em mãos o controle de tudo o que entra e tudo o que sai em todas as suas contas
          </p>

          <a href="<?=URL?>cadastre-se" class="mt-6 self-start text-white text-center px-8 py-3 rounded-2xl text-lg shadow
          border border-white bg-emerald-600 hover:bg-white hover:text-emerald-600 ease-in-out duration-100">
            Comece agora grátis
          </a>
        </div>

        <div class="flex justify-center order-2 md:order-1">
          <img 
            src="<?=URL?>assets/img/relatorios.jpeg?>"
            class="rounded-lg shadow-lg border w-full max-w-2xl"
            alt="Sistema"
          />
        </div>
    </div>

  </section>

  <!-- COMO FUNCIONA -->
  <section class="max-w-6xl mx-auto px-4 md:px-6 py-14">

    <h3 class="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-10">Como funciona?</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- PASSO 1 -->
      <div class="bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn flex flex-col justify-start">
        <span class="flex w-12 h-12 rounded-full bg-emerald-600 text-white text-md font-bold justify-center items-center self-center">1</span>
        <h2 class="mt-2 text-lg font-bold">Faça login</h2>
        <p class="text-gray-600 mt-3">Crie uma conta e depois faço login na plataforma, caso já tenha uma, apenas efetue o login.</p>
      </div>

      <!-- PASSO 2 -->
      <div class="bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn flex flex-col justify-start">
        <span class="flex w-12 h-12 rounded-full bg-emerald-600 text-white text-md font-bold justify-center items-center self-center">2</span>
        <h2 class="mt-2 text-lg font-bold">Cadastre suas contas</h2>
        <p class="text-gray-600 mt-3">Após efetuar o login, cadastre suas contas financeiras com o saldo atual de cada uma,
          para uma precisão acertiva nos relatórios.</p>
      </div>

      <!-- PASSO 3 -->
      <div class="bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn flex flex-col justify-start">
        <span class="flex w-12 h-12 rounded-full bg-emerald-600 text-white text-md font-bold justify-center items-center self-center">3</span>
        <h2 class="mt-2 text-lg font-bold">Resgistre suas movimentações</h2>
        <p class="text-gray-600 mt-3">Registre todas as entradas e despesas na plataforma, classificando-as por categoria.</p>
      </div>

      <!-- PASSO 4 -->
      <div class="bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn flex flex-col justify-start">
        <span class="flex w-12 h-12 rounded-full bg-emerald-600 text-white text-md font-bold justify-center items-center self-center">4</span>
        <h2 class="mt-2 text-lg font-bold">Gere ralatórios</h2>
        <p class="text-gray-600 mt-3">Após esses passos é só gerar os relatórios disponíveis no sistema e analisar a sua saúde financeira.</p>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    <div class="flex justify-center order-2 md:order-1">
      <img 
        src="<?=URL?>assets/img/dashboard.jpeg?>"
        class="rounded-lg shadow w-full max-w-lg"
        alt="Dashboard"
      />
    </div>

    <div class="order-1 md:order-2">
      <h3 class="text-2xl md:text-3xl font-bold mb-5 text-gray-800">Todas as ferramentas que você precisa</h3>

      <ul class="space-y-4 text-gray-700 text-base md:text-lg">
        <li class="flex items-center gap-3">
          <span class="w-6 h-6 p-1 bg-emerald-600 rounded-full flex justify-center items-center text-white">
            <i class="fa-solid fa-check"></i>
          </span>
          Controle de receitas e despesas
        </li>

        <li class="flex items-center gap-3">
          <span class="w-6 h-6 p-1 bg-emerald-600 rounded-full flex justify-center items-center text-white">
            <i class="fa-solid fa-check"></i>
          </span>
          Relatórios por contas financeiras
        </li>

        <li class="flex items-center gap-3">
          <span class="w-6 h-6 p-1 bg-emerald-600 rounded-full flex justify-center items-center text-white">
            <i class="fa-solid fa-check"></i>
          </span>
          Balanço de toda a movimentação mensal/anual
        </li>

        <li class="flex items-center gap-3">
          <span class="w-6 h-6 p-1 bg-emerald-600 rounded-full flex justify-center items-center text-white">
            <i class="fa-solid fa-check"></i>
          </span>
          Exportação de dados em CSV ou PDF
        </li>
      </ul>
    </div>

  </section>

  <!-- PLANOS -->
  <section class="max-w-6xl mx-auto px-4 md:px-6 py-14">
    
    <h3 class="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-10">
      Planos
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">

      <!-- Card -->
      <div class="bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn">
        <h4 class="text-xl font-semibold">Gratuíto</h4>
        <p class="text-4xl font-bold mt-2">R$0<span class="text-lg text-gray-600">/mês</span></p>
        <p class="text-gray-600 mt-3">5 Entradas</p>
        <p class="text-gray-600">5 Despesas</p>
        <p class="text-gray-600 text-sm">Recursos básicos</p>
        <button class="mt-6 bg-emerald-600 text-white px-6 py-2 w-full rounded-lg hover:bg-emerald-700">Escolher</button>
      </div>

      <div class="bg-white p-8 rounded-xl shadow-lg text-center animate-fadeIn">
        <h4 class="text-xl font-semibold">Pro</h4>
        <p class="text-4xl font-bold mt-2">R$40<span class="text-lg text-gray-600">/mês</span></p>
        <p class="text-gray-600 mt-3">5 usuários</p>
        <p class="text-gray-600 text-sm">Todos os recursos</p>
        <button class="mt-6 bg-emerald-600 text-white px-6 py-2 w-full rounded-lg hover:bg-emerald-700">Escolher</button>
      </div>

    </div>
  </section>

  <!-- TESTEMUNHOS -->
  <section class="max-w-6xl mx-auto px-4 md:px-6 py-16">
    
    <h3 class="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-12">
      O que nossos usuários dizem
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      <div class="bg-white p-8 rounded-xl shadow animate-fadeIn">
        <p class="text-gray-700">
          “O FluxoMEI facilita minha vida. Consigo controlar minhas finanças de forma simples e rápida.”
        </p>

        <div class="flex items-center gap-3 mt-5">
          <div class="w-12 h-12 rounded-full bg-gray-300"></div>
          <div>
            <p class="font-semibold">Larissa Pereira</p>
            <p class="text-gray-500 text-sm">Microempreendedora</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-xl shadow animate-fadeIn">
        <p class="text-gray-700">
          “O sistema é muito fácil de usar e me ajuda a organizar minhas finanças com precisão.”
        </p>

        <div class="flex items-center gap-3 mt-5">
          <div class="w-12 h-12 rounded-full bg-gray-300"></div>
          <div>
            <p class="font-semibold">João Silva</p>
            <p class="text-gray-500 text-sm">Autônomo</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- FOOTER -->
  <footer class="py-10 text-center text-gray-500">
    © 2025 FluxoMEI — Todos os direitos reservados.
  </footer>

</body>
</html>
