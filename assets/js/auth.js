const token = localStorage.getItem("token");
const URLBASE = "http://localhost/fluxomei-front/";
const URLAPI = "http://localhost/api-fluxomei/";

if (!token)
{
    // se não tiver token volta para o login
    window.location.href = URLBASE + "login.php";
}
