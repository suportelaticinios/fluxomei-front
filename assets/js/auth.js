const token = localStorage.getItem("token");
const URLBASE = "http://192.168.2.2:8082/fluxomei-front/";
const URLAPI = "http://192.168.2.2:8082/api-fluxomei/";

if (!token)
{
    // se não tiver token volta para o login
    window.location.href = URLBASE + "login.php";
}
