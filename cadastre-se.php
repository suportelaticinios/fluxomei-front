<?php require_once './config.php'?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="<?=URL?>/assets/css/output.css" rel="stylesheet">
  <title>Cadastro - FluxoMEI</title>
</head>
<body>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="<?=URL?>/assets/img/logo.png" alt="FluxoMEI" class="h-14 opacity-90">
      </div>

      <h1 class="text-2xl font-bold text-emerald-600 mb-2 text-center">Crie sua conta</h1>
      <p class="text-gray-600 mb-6 text-center">Gerencie seu financeiro com facilidade</p>

      <form id="formCadastro" onsubmit="event.preventDefault(); alert('Cadastro enviado!');" class="space-y-4">

        <!-- Plano -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Plano</label>
          <select id="idPlano" class="mt-1 w-full border rounded p-2">
            <option value="1">Plano Básico</option>
            <option value="2">Plano Pro</option>
            <option value="3">Plano Premium</option>
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

  <script src="<?=URL?>assets/js/jquery.js"></script>
  <script src="<?=URL?>assets/js/jquerymask.js"></script>
  <script>
    // máscara do campo cpf/cnpj
    const radios = document.querySelectorAll("input[name='tipo']");    
    const CPFCNPJ = document.getElementById('cpfCnpj');

    function aplicarMascara ()
    {
        const tipo = document.querySelector("input[name='tipo']:checked").value;

        if (tipo == 'pf')
        {
            $('#cpfCnpj').mask('000.000.000-00');
        } else {
            $('#cpfCnpj').mask('00.000.000/0000-00');
        }
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
