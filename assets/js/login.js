const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    fazerLogin();
})

async function fazerLogin ()
{
    document.getElementById("loadingScreen").classList.remove("hidden"); // exibindo load de carregamento

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const resposta = await fetch(URLAPI + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email, senha})
    });

    const data = await resposta.json();

    document.getElementById("loadingScreen").classList.add("hidden"); // escondendo loading de carregamento

    if (resposta.ok && data.token)
    {
        // salvar o token no navegador
        localStorage.setItem("token", data.token);

        // redirecionar para área protegida
        window.location.href = "home.php";
        return;
    } else {
        // console.log(data);
        showToast("error", "Erro!", data.message);
        return;
    }
} 