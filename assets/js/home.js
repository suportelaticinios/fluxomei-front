// Busca as informações do Home
carregarInfoHome();

async function carregarInfoHome () {
    const token = localStorage.getItem("token");
  
    try {
        const response = await fetch("http://192.168.2.2:8082/api-fluxomei/dashboard/mensal", {
            headers: {
            "Authorization": `Bearer ${token}`,
            "User-Agent": "front-fluxomei"
            }
        });
  
        if (!response.ok) {
            throw new Error("Erro ao buscar dados");
        }
  
        const dados = await response.json();
    
        montarGraficoMensal(dados.ultimos6Meses); // cria o gráfico de entradas
        montarGraficoEntradas(dados); // cria o gráfico de entradas

        //total de entradas e saidas
        document.getElementById('totalEntradas').innerHTML = toBR(dados.totalEntradas);
        document.getElementById('totalDespesas').innerHTML = toBR(dados.totalDespesas);
        document.getElementById('saldoAtual').innerHTML = toBR(dados.saldoAtual);

        // ultimas movimentações - Entradas e Despesas
        ultimasEntradas(dados.ultimasEntradas);
        ultimasDespesas(dados.ultimasDespesas);
    } 
    catch (erro) {
      console.error("Erro ao carregar gráfico:", erro);
    }
}
  
function montarGraficoMensal(dados)
{
    const ctx = document.getElementById("graficoMensal").getContext("2d");
    const meses = dados.map(item => item.mes);
    let entradas = dados.map(item => item.entradas);
    let despesas = dados.map(item => item.despesas);

    new Chart(ctx, {
        type: "bar",
        data: {
        labels: meses,
        datasets: [
            {
            label: "Entradas",
            data: entradas,
            backgroundColor: "rgba(16, 185, 129, 0.6)"
            },
            {
            label: "Despesas",
            data: despesas,
            backgroundColor: "rgba(239, 68, 68, 0.6)"
            }
        ]
        },
        options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
        }
    });    
}
function montarGraficoEntradas(dados)
{
    // ===============================
    // 2) Montar dados do gráfico
    // ===============================
    const dias = dados.graficoEntradas.map(item => item.dia);
    const valores = dados.graficoEntradas.map(item => item.valor);
    
    // ===============================
    // 3) Gráfico ApexCharts
    // ===============================
    const options = {
        chart: {
            type: "area",
            height: 250,
            toolbar: { show: false }
        },
        series: [{
            name: "Entradas",
            data: valores
        }],
        xaxis: {
            categories: dias,
            title: { text: "Dias do Mês" }
        },
        yaxis: {
            labels: { formatter: v => `R$ ${v.toFixed(2)}` }
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        fill: {
            opacity: 0.3
        },
        colors: ["#10b981"] // verde tailwind
    };

    var chart = new ApexCharts(document.querySelector("#graficoEntradas"),  options);

    chart.render();
}

function toBR (valor)
{
    valor = parseFloat(valor);
    
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
}

function ultimasEntradas(dados)
{
    let ul = document.getElementById('ultimasEntradas');
    console.log(dados);

    for (let d of dados)
    {
        ul.innerHTML += '<li class="flex justify-between border-b py-2">'+
                            '<span>'+ d.CATEGORIA+' '+
                            '<small class="text-xs text-gray-500 ml-1">'+ d.DATA +'</small>'+
                            '</span>'+
                            '<strong>'+ toBR(d.VALOR)+'</strong>'+
                        '</li>';
    }
}

function ultimasDespesas(dados)
{
    let ul = document.getElementById('ultimasDespesas');
    console.log(dados);

    for (let d of dados)
    {
        ul.innerHTML += '<li class="flex justify-between border-b py-2">'+
                            '<span>'+ d.CATEGORIA+' '+
                            '<small class="text-xs text-gray-500 ml-1">'+ d.DATA +'</small>'+
                            '</span>'+
                            '<strong>'+ toBR(d.VALOR)+'</strong>'+
                        '</li>';
    }
}

// --- ANIMAÇÃO AO CARREGAR ---
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".fade-up").forEach((el) => {
      setTimeout(() => el.classList.add("show"), 100);
    });
});