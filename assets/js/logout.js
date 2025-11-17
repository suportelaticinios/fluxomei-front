const btnLogout = document.getElementById("logout");

// função de logout global
function logout ()
{
    localStorage.removeItem("token");
    window.location.href = URLBASE + 'login.php';
}

btnLogout.addEventListener('click', function (){

    if (confirm("Deseja sair do sistema"))
    {
        logout();
    }
});