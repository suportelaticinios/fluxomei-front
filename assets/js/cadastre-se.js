
// máscara do campo cpf/cnpj
$('#cpfCnpj').mask('000.000.000-00');
// máscara do campo de telefone
$('#telefone').mask('(00) 00000-0000');

const radios = document.querySelectorAll("input[name='tipo']");    
const CPFCNPJ = document.getElementById('cpfCnpj');
const formCadastro = document.getElementById('formCadastro');

formCadastro.addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById("loadingScreen").classList.remove("hidden");
    
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

function cadastrarSe(dados) {
    let token = localStorage.getItem('token');

    document.getElementById("loadingScreen").classList.remove("hidden");

    fetch('https://api.smlaticinios.com.br/api-fluxomei/usuario/cadastrar', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': "application/json",
            'User-Agent': "front-fluxomei"
        },
        body: JSON.stringify({ dados })
    })
    .then(async response => {
        if (!response.ok) {
            const erro = await response.json();

            if (response.status === 401) {
                showToast("error", "Não autorizado", erro.message || "Token inválido ou expirado.");
            }

            throw new Error(erro.message || "Erro desconhecido");
        }

        return response.json();
    })
    .then(data => {
        showToast("success", "Sucesso", data.message);
        formCadastro.reset();
    })
    .catch(error => {
        console.log("Error: ", error.message);
        showToast("error", "Atenção", error.message);
    })
    .finally(() => {
        // só aqui o loading some — DEPOIS de TUDO terminar
        document.getElementById("loadingScreen").classList.add("hidden");
    });
}


radios.forEach(radio => {
    radio.addEventListener("change", () => {
        CPFCNPJ.value = '';
        aplicarMascara();
    });
});

$('#idPlano').on('change', function () {
    if ($(this).val() == 2) {
      $('#pagamentoCartao').removeClass('hidden');
      $('#enderecoCobranca').removeClass('hidden');
    } else {
      $('#pagamentoCartao').addClass('hidden');
      $('#enderecoCobranca').addClass('hidden');
    }
  });