<?php require_once('./config.php')?>
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="<?=URL?>assets/css/output.css" rel="stylesheet">
  <script src="<?=URL?>assets/js/auth.js"></script>
</head>
<body>
    <div class="min-h-screen flex bg-gray-50">
        <aside class="w-64 bg-white shadow-md">
            <!-- TOPO MENU -->
            <div class="p-6 border-b border-gray-300"> 
              <div class="text-2xl font-bold text-emerald-600">FluxoMEI</div>
              <div class="text-sm text-gray-500">Gestão Financeira</div>
            </div>
            <!-- MENU -->
            <nav class="p-4">
              <a href="<?=URL?>home" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Home</a>
              <a href="<?=URL?>contas" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Contas</a>
              <a href="<?=URL?>entradas" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Entradas</a>
              <a href="<?=URL?>despesas" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Despesas</a>
              <a href="<?=URL?>relatorios" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Relatórios</a>
              <a href="<?=URL?>configuracoes" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700">Configurações</a>
              <a href="#" id="logout" class="block py-2 px-3 rounded hover:bg-emerald-50 text-gray-700 mt-6">Sair</a>
            </nav>
        </aside>
        <div class="flex-1">
          <!-- TOPO DA ÁREA DE CONTEÚDO -->
          <header class="bg-emerald-700 text-white p-4 flex justify-between items-center shadow-sm">
            <div class="text-lg font-semibold">Área do Usuário</div>
            <div class="text-sm">Usuário: <span id="user-name">Fulano</span></div>
          </header>