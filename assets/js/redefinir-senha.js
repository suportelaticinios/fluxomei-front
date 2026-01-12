const formRedefinirSenha = document.getElementById('formRedefinirSenha');

/**
 * 
 * EVENTOS
 *  
 */
formRedefinirSenha.addEventListener('submit', function (e) {
    e.preventDefault();

    redefinirSenha()
})

/**
 * 
 * API
 *  
 */
async function redefinirSenha() {
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmarSenha').value;
    const token = document.getElementById('token').value;

    if (senha !== confirmar) {
        showToast("error", "Erro!", 'As senhas não conferem.');
        return;
    }
    document.getElementById('loadingScreen').classList.remove('hidden');

    const resposta = await fetch(URLAPI + '/auth/redefinirSenha', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({senha, confirmar, token})
    });

    const data = await resposta.json();

    document.getElementById('loadingScreen').classList.add('hidden');

    if (resposta.ok)
    {
        // redirecionar para área protegida
        showToast("success", "Sucesso!", data.message);
        return;
    } else {
        console.log(data);
        showToast("error", "Erro!", data.erro);
        return;
    }
}