const btnLogout = document.getElementById("logout");
const user_name = localStorage.getItem("nome");

document.getElementById("user-name").innerHTML = user_name;

// função de logout global
function logout ()
{
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    window.location.href = URLBASE + 'login.php';
}

btnLogout.addEventListener('click', function (){

    if (confirm("Deseja sair do sistema"))
    {
        logout();
    }
});