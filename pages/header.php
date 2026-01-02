<?php require_once('./config.php')?>
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="<?=URL?>assets/css/output.css" rel="stylesheet">
  <script src="<?=URL?>assets/js/config.js"></script>
  <script src="<?=URL?>assets/js/auth.js"></script>
  <script src="https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js"></script>
</head>
<body class="bg-gray-50">

<!-- WRAPPER -->
<div class="min-h-screen flex">

    <!-- SIDEBAR -->
    <aside id="sidebar"
        class="w-64 bg-white shadow-md fixed md:static inset-y-0 left-0 z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300">

        <!-- TOPO MENU -->
        <div class="p-6 border-b border-gray-300"> 
          <div class="text-2xl font-bold text-emerald-600">FluxoMEI</div>
          <div class="text-sm text-gray-500">Gestão Financeira</div>
        </div>

        <!-- MENU -->
        <nav class="p-4 space-y-1">
          <a href="<?=URL?>home" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Home</a>
          <a href="<?=URL?>contas" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Contas</a>
          <a href="<?=URL?>entradas" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Entradas</a>
          <a href="<?=URL?>despesas" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Despesas</a>
          <a href="<?=URL?>transferencias" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Transferencias</a>
          <a href="<?=URL?>relatorios" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Relatórios</a>
          <a href="<?=URL?>configuracoes" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Configurações</a>
          <a href="#" id="logout" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700 mt-6">Sair</a>
        </nav>
    </aside>

    <!-- ÁREA PRINCIPAL -->
    <div class="flex-1 w-full flex flex-col min-h-screen">

        <!-- TOPO -->
        <header class="bg-emerald-700 text-white w-full box-border p-4 flex justify-between items-center shadow-sm">

          <!-- Botão Mobile -->
          <button id="btnMenu" class="md:hidden p-2 bg-emerald-600 rounded">
            ☰
          </button>

          <div class="text-lg font-semibold">Área do Usuário</div>
          <div class="text-sm">Usuário: <span id="user-name">Fulano</span></div>
        </header>