const token = localStorage.getItem("token");
verificarAutenticacao();

function verificarAutenticacao ()
{
    if (!token)
    {
        // se não tiver token volta para o login
        window.location.href = URLBASE + "login.php";
        return;
    }

    fetch(`${URLAPI}/auth/validate`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401)
        {
            localStorage.removeItem('token');
            window.location.href = URLBASE + "login.php";
        }
    })
    .catch(() => {
        localStorage.removeItem('token');
        window.location.href = "login.php";
    })
}
