const token = localStorage.getItem("token");
const URLBASE = "http://localhost/fluxomei-front/";

if (!token)
{
    // se não tiver token volta para o login
    window.location.href = URLBASE + "login.html";
}
