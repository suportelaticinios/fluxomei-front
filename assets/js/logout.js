const btnLogout = document.getElementById("logout");

// função de logout global
function logout ()
{
    localStorage.removeItem("token");
    window.location.href("http://192.168.2.2:8082/fluxomei-front/login.html");
}

btnLogout.addEventListener('click', function (){
    logout();
});