const token = localStorage.getItem("token");

if (!token)
{
    // se não tiver token volta para o login
    window.location.href = "http://192.168.2.2:8082/fluxomei-front/login.html";
}
