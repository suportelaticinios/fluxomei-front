<?php
require_once './config.php';
$planoSelecionado = (!empty($_GET['plano'])) ? htmlspecialchars($_GET['plano']) : 1; // padrão: gratuito
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="<?=URL?>/assets/css/output.css" rel="stylesheet">
  <title>Cadastro - FluxoMEI</title>
</head>
<body>

  <!-- LOADING -->
  <div id="loadingScreen" class="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] hidden">
    <div class="flex flex-col items-center">
      <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-emerald-700 font-medium">Carregando...</p>
    </div>
  </div>

  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="<?=URL?>/assets/img/logo.png" alt="FluxoMEI" class="h-14 opacity-90">
      </div>

      <h1 class="text-2xl font-bold text-emerald-600 mb-2 text-center">Crie sua conta</h1>
      <p class="text-gray-600 mb-6 text-center">Gerencie seu financeiro com praticidade e segurança</p>

      <form id="formCadastro" class="space-y-4">

        <!-- Plano -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Plano</label>
          <select id="idPlano" class="mt-1 w-full border rounded p-2">
            <option value="1" <?= ($planoSelecionado == 1) ?'selected': ''?>>Plano Gratuíto</option>
            <option value="2" <?= ($planoSelecionado == 2) ?'selected': ''?>>Plano Pro</option>
          </select>
        </div>

        <!-- Tipo Pessoa -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de conta</label>
          <div class="flex gap-4 text-sm text-gray-700">
            <label class="flex items-center gap-2">
              <input type="radio" name="tipo" value="pf" checked> Pessoa Física
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" name="tipo" value="pj"> Pessoa Jurídica
            </label>
          </div>
        </div>

        <!-- CPF/CNPJ -->
        <div>
          <label class="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
          <input id="cpfCnpj" type="text" class="mt-1 w-full border rounded p-2" placeholder="Digite seu CPF ou CNPJ">
        </div>

        <!-- Nome -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Nome completo</label>
          <input id="nome" type="text" class="mt-1 w-full border rounded p-2" placeholder="Seu nome">
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input id="email" type="email" class="mt-1 w-full border rounded p-2" placeholder="email@exemplo.com">
        </div>

        <!-- Telefone -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Telefone</label>
          <input id="telefone" type="text" class="mt-1 w-full border rounded p-2" placeholder="(00) 00000-0000">
        </div>

        <!-- Senha -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Senha</label>
          <input id="senha" type="password" class="mt-1 w-full border rounded p-2" placeholder="********">
        </div>

        <button type="submit" class="w-full bg-emerald-600 text-white py-2 rounded font-medium hover:bg-emerald-700 transition">Cadastrar</button>
      </form>

      <p class="text-xs text-gray-500 mt-4 text-center">Ao se cadastrar, você concorda com nossos termos.</p>

      <p class="text-sm text-gray-600 mt-4 text-center">
        Já tem conta? <a href="login.html" class="text-emerald-600 font-semibold hover:underline">Entrar</a>
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

  <script src="<?=URL?>assets/js/jquery.js"></script>
  <script src="<?=URL?>assets/js/jquerymask.js"></script>
  <script src="<?=URL?>assets/js/script.js"></script>
  <script>
    // máscara do campo cpf/cnpj
    $('#cpfCnpj').mask('000.000.000-00');
    // máscara do campo de telefone
    $('#telefone').mask('(00) 00000-0000');
    
    const radios = document.querySelectorAll("input[name='tipo']");    
    const CPFCNPJ = document.getElementById('cpfCnpj');
    const formCadastro = document.getElementById('formCadastro');

    formCadastro.addEventListener('submit', function (e) {
        e.preventDefault();

        cadastrarSe({
          'id_plano': document.getElementById('idPlano').value,
          'nome': document.getElementById('nome').value,
          'cpf_cnpj': document.getElementById('cpfCnpj').value,
          'email': document.getElementById('email').value,
          'telefone': document.getElementById('telefone').value,
          'senha': document.getElementById('senha').value,
        })
    })

    function aplicarMascara ()
    {
        const tipo = document.querySelector("input[name='tipo']:checked");

        if (tipo == 'pf')
        {
            $('#cpfCnpj').mask('000.000.000-00');
        } else {
            $('#cpfCnpj').mask('00.000.000/0000-00');
        }
    }

    function cadastrarSe (dados)
    {
        let token = localStorage.getItem('token');

        document.getElementById("loadingScreen").classList.remove("hidden");

        fetch('http://192.168.2.2:8082/api-fluxomei/usuario/cadastrar', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': "application/json",
                'User-Agent': "front-fluxomei"
        },
        body: JSON.stringify({dados})
      })
      .then(async response => {

        if (!response.ok) {
          // aqui a API retornou erro
          const erro = await response.json(); // pega a mensagem retornada

          if (response.status === 401) {
            // console.log("Erro 401 => ", erro);
            showToast("error", "Não autorizado", erro.message || "Token inválido ou expirado.");
          }

          // se quiser, já retorna aqui:
          throw new Error(erro.message || "Erro desconhecido");
        }

        // deu certo
        return response.json();
      })
      .then(data => {
          console.log("Sucesso: ", data);
          document.querySelector("#previa-relatorios").classList.remove('hidden');
      })
      .catch(error => {
          console.log("Error: ", error.message);
      });
      document.getElementById("loadingScreen").classList.add("hidden");
    }

    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            CPFCNPJ.value = '';

            aplicarMascara();
        });
    });
  </script>
</body>
</html>
