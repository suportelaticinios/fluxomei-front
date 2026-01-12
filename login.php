<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./assets/css/output.css" rel="stylesheet">
  <title>Login - FluxoMEI</title>
</head>
<body>
    <!-- LOADING -->
    <div id="loadingScreen" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] hidden">
        <div class="flex flex-col items-center">
            <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p class="mt-4 text-emerald-700 font-medium">Carregando...</p>
        </div>
    </div>
    
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold text-emerald-600 mb-2">FluxoMEI</h1>
            <p class="text-gray-600 mb-6">Acesse sua conta</p>
            <form onsubmit="event.preventDefault(); window.location='home.html';">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input required type="email" id="email" class="mt-1 mb-3 w-full border rounded p-2" placeholder="seu.email@exemplo.com">
                <label class="block text-sm font-medium text-gray-700">Senha</label>
                <input required type="password" id="senha" class="mt-1 mb-4 w-full border rounded p-2" placeholder="********">
                <button id="btnLogin" type="submit" class="w-full bg-emerald-600 text-white py-2 rounded">Entrar</button>
            </form>
            <p class="text-sm text-gray-600 mt-4 text-center">
                Esqueceu sua senha? <a href="esqueci-minha-senha.php" class="text-emerald-600 font-semibold hover:underline">Clique aqui!</a>
            </p>
            <p class="text-sm text-gray-600 mt-4 text-center">
                Ainda não possui uma conta? <a href="cadastre-se.php" class="text-emerald-600 font-semibold hover:underline">Cadastre-se aqui!</a>
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
    <script src="assets/js/login.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>