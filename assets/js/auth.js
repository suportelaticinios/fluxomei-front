const token = localStorage.getItem("token");

verificarAutenticacao();

async function verificarAutenticacao() {
    if (!token) {
        limparSessao();
        window.location.href = URLBASE + "login";
        return;
    }

    try {
        const res = await fetch(`${URLAPI}/auth/validate`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // 🔴 Token inválido
        if (res.status === 401) {
            limparSessao();
            window.location.href = URLBASE + "login";
            return;
        }

        const data = await res.json();

        window.USER = data;

        // 🔒 Trial ou plano vencido → libera SOMENTE configuração
        if (res.status === 403) {
            if (data.code === 'TRIAL_EXPIRED' || data.code === 'PLAN_EXPIRED') {
                if (!window.location.pathname.includes('configuracoes')) {
                    window.location.href = URLBASE + "configuracoes";
                }
                return;
            }
        }

        // 🟡 Está em trial → mostra aviso
        if (data.acesso?.status === 'TRIAL') {
            window.__TRIAL_INFO__ = data.acesso;
        }

    } catch (e) {
        // limparSessao();
        // window.location.href = URLBASE + "login.php";
        // console.log(e);
    }
}

function limparSessao() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
}

/**
 * TRIAL DE TESTE
 */
 function exibirAvisoTrial(dias) {
    if (document.getElementById('trial-banner')) return;

    if (!document.body) {
        console.warn('Body ainda não disponível');
        return;
    }

    const banner = document.createElement('div');
    banner.id = 'trial-banner';
    banner.innerHTML = `
        <div style="
            background:#FEF3C7;
            border:1px solid #F59E0B;
            color:#92400E;
            padding:12px;
            text-align:center;
            font-weight:500;
        ">
            🚀 Você está em período de teste.
            Restam <strong>${dias}</strong> dias.
            <a href="${URLBASE}configuracoes" style="margin-left:8px;text-decoration:underline;">
                Fazer upgrade agora
            </a>
        </div>
    `;

    // ✅ SEMPRE funciona
    document.body.prepend(banner);
}


// CARREGA A MENSAGEM DE UPGRADE
document.addEventListener('DOMContentLoaded', () => {
    if (window.__TRIAL_INFO__) {
        exibirAvisoTrial(window.__TRIAL_INFO__.dias_restantes);
    }
});