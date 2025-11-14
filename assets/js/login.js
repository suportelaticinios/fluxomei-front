const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    fazerLogin();
})

async function fazerLogin ()
{
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const resposta = await fetch('http://192.168.2.2:8082/api-fluxomei/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'User-Agent': "front-fluxomei"
        },
        body: JSON.stringify({email, senha})
    });

    const data = await resposta.json();

    if (resposta.ok && data.token)
    {
        // salvar o token no navegador
        localStorage.setItem("token", data.token);

        // redirecionar para área protegida
        window.location.href = "index.php";
        return;
    } else {
        console.log(data);
        alert(data.erro);
        return;
    }
} 