<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./assets/css/output.css" rel="stylesheet">
  <title>Redefinir senha - FluxoMEI</title>
</head>
<body>
    <!-- LOADING -->
    <div id="loadingScreen" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] hidden">
        <div class="flex flex-col items-center">
            <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-emerald-700 font-medium">Atualizando senha...</p>
        </div>
    </div>

    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold text-emerald-600 mb-2">FluxoMEI</h1>
            <p class="text-gray-600 mb-4">Criar nova senha</p>

            <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded p-3 mb-5">
                <p class="mb-1">• Crie uma senha forte.</p>
                <p class="mb-1">• Use pelo menos 8 caracteres.</p>
                <p>• Não compartilhe sua senha com ninguém.</p>
            </div>

            <form id="formRedefinirSenha">
                <input type="hidden" id="token" value="<?php echo $_GET['token'] ?? ''; ?>">

                <label class="block text-sm font-medium text-gray-700">Nova senha</label>
                <input required type="password" id="senha" class="mt-1 mb-3 w-full border rounded p-2" placeholder="********">

                <label class="block text-sm font-medium text-gray-700">Confirmar nova senha</label>
                <input required type="password" id="confirmarSenha" class="mt-1 mb-4 w-full border rounded p-2" placeholder="********">

                <button type="submit" class="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition">Salvar nova senha</button>
            </form>

            <p class="text-sm text-gray-600 mt-6 text-center">
                <a href="login.php" class="text-emerald-600 font-semibold hover:underline">Voltar para o login</a>
            </p>
        </div>
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

    <script src="assets/js/config.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/redefinir-senha.js"></script>
</body>
</html>
