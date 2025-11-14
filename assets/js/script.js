
// modal
const modal = document.getElementById("entryModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Abrir modal
openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});
// Fechar modal
function closeModal() {
    modal.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Fechar clicando fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
