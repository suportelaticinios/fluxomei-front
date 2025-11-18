
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

// toast
function showToast(type, title, message) {
  const toast = document.getElementById("toast");
  const toastBox = document.getElementById("toastBox");
  const toastIcon = document.getElementById("toastIcon");
  const toastTitle = document.getElementById("toastTitle");
  const toastMessage = document.getElementById("toastMessage");

  // Configura estilos por tipo
  switch(type) {
    case "success":
      toastBox.className = "bg-white shadow-lg border-l-4 border-emerald-600 p-4 rounded-lg min-w-[250px] flex items-start gap-3 animate-fadeIn";
      toastIcon.textContent = "✔️";
      break;

    case "error":
      toastBox.className = "bg-white shadow-lg border-l-4 border-red-600 p-4 rounded-lg min-w-[250px] flex items-start gap-3 animate-fadeIn";
      toastIcon.textContent = "⚠️";
      break;

    case "info":
      toastBox.className = "bg-white shadow-lg border-l-4 border-blue-600 p-4 rounded-lg min-w-[250px] flex items-start gap-3 animate-fadeIn";
      toastIcon.textContent = "ℹ️";
      break;
  }

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 5000);
}
