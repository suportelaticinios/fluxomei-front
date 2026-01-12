const formEsqueciSenha = document.getElementById('formEsqueciSenha');


/**
 * EVENTOS
 */
formEsqueciSenha.addEventListener('submit', function (e) {
    e.preventDefault();

    enviarRecuperacao();
})

async function enviarRecuperacao() {
    const email = document.getElementById('email').value;
    document.getElementById('loadingScreen').classList.remove('hidden');

    document.getElementById('loadingScreen').classList.remove('hidden');

    const resposta = await fetch(URLAPI + '/auth/esqueciSenha', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email})
    });

    const data = await resposta.json();

    document.getElementById('loadingScreen').classList.add('hidden');

    if (resposta.ok)
    {
        // redirecionar para área protegida
        showToast("success", "Sucesso!", data.message);
        document.getElementById('formEsqueciSenha').reset();
        return;
    } else {
        console.log(data);

        if (data.erro)
        {
            showToast("error", "Erro!", data.erro);
        } 

        if (data.message)
        {
            showToast("error", "Erro!", data.message);
        }
        return;
    }
}