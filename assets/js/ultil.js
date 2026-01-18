const modalBase = document.getElementById('modal-base');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-modal-open]');
  if (!btn) return;

  openModal({
    title: btn.dataset.modalTitle,
    templateId: btn.dataset.modalTemplate
  });

  // pequeno delay pra garantir que o DOM foi inserido
  setTimeout(() => {
      $('#card_expiry').mask('00/00');
      $('#card_number').mask('0000 0000 0000 0000', {reverse: false});
      $('#card_cvv').mask('000');
  }, 50);

  // carregar planos
  buscarPlanos();

  // ao selecionar um plano
  const plano_pretendido = document.getElementById('plano_pretendido')
  plano_pretendido.addEventListener('change', function (e) {
    // Pega a option selecionada
    const selectedOption = plano_pretendido.options[plano_pretendido.selectedIndex];
    const preco = selectedOption.dataset.preco;

    document.getElementById('valorPlano').innerHTML = toBR(preco);
    document.getElementById('infoPlano').classList.remove('hidden');
  })
});

function openModal({ title, templateId }) {
    modalTitle.innerText = title;

    const template = document.getElementById(templateId);
    modalContent.innerHTML = '';
    modalContent.appendChild(template.content.cloneNode(true));

    modalOverlay.classList.remove('hidden');
    modalBase.classList.remove('hidden');
    modalBase.classList.add('flex');

    // trava scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    modalBase.classList.add('hidden');
    modalBase.classList.remove('flex');

    // libera scroll
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

document.addEventListener('click', (e) => {
  if (e.target.dataset.modalClose !== undefined) {
    closeModal();
  }
});

// buscar todos os bancos cadastrados no sistema
function buscarPlanos ()
{
    // faz uma requisição a api para gerar relatório mensal
    fetch(`${URLAPI}plano/listar`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}` // token no header
        },
        body: JSON.stringify() // só enviar body em POST/PUT/PATCH
    })
    .then(response => {
        if (!response.ok)
        {
            // logout();
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json(); // converte o retorno para JSON
    })
    .then(data => {
        const planos = data;

        planos.forEach (plano => {
            const option = document.createElement("option");

            option.value = plano.ID_PLANO;
            option.textContent = plano.NOME;
            option.dataset.preco = plano.PRECO

            document.getElementById('plano_pretendido').appendChild(option);
        })

        // POPULAR SELECT
    })
    .catch(error => {
        console.log("Error: ", error.message);
    })
}
function toBR (valor)
{
    valor = parseFloat(valor);
    
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
}
