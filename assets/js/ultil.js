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
